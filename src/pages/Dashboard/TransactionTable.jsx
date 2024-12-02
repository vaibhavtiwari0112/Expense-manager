import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "./Dashboard.actions";
import {
  selectTransactions,
  selectDashboardStatus,
  selectDashboardError,
} from "./Dashboard.selectors";
import { AgGridReact } from "ag-grid-react";
import LoadingComponent from "../../component/Loading";
import ErrorComponent from "../../component/Error";
import jsPDF from "jspdf";
import "jspdf-autotable";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const TransactionTable = ({ interval }) => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const status = useSelector(selectDashboardStatus);

  const [gridApi, setGridApi] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalInvestments, setTotalInvestments] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    if (interval) {
      dispatch(fetchTransactions({ interval, page: currentPage }));
    }
  }, [dispatch, interval, currentPage]);

  useEffect(() => {
    if (Array.isArray(transactions)) {
      let savings = 0;
      let investments = 0;
      let expenses = 0;

      transactions.forEach((transaction) => {
        if (transaction.type === "saving") {
          savings += transaction.amount;
        } else if (transaction.type === "investment") {
          investments += transaction.amount;
        } else if (transaction.type === "expense") {
          expenses += transaction.amount;
        }
      });

      setTotalSavings(savings);
      setTotalInvestments(investments);
      setTotalExpenses(expenses);
    }
  }, [transactions]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const onPaginationChanged = () => {
    if (gridApi) {
      const currentPage = gridApi.paginationGetCurrentPage() + 1;
      setCurrentPage(currentPage);
    }
  };

  const columnDefs = [
    {
      headerName: "Date",
      field: "createdAt",
      sortable: true,
      filter: true,
      cellRenderer: (data) => new Date(data.value).toLocaleDateString(),
      width: 150,
    },
    {
      headerName: "Description",
      field: "description",
      sortable: true,
      filter: true,
      width: 250,
    },
    {
      headerName: "Amount (₹)",
      field: "amount",
      sortable: true,
      filter: true,
      width: 150,
    },
    {
      headerName: "Type",
      field: "type",
      sortable: true,
      filter: true,
      width: 150,
      cellClass: (params) => {
        if (params.value === "saving") return "bg-green-100";
        if (params.value === "investment") return "bg-blue-100";
        return "bg-red-100";
      },
    },
  ];

  const calculateOverallProfitLossPercentage = () => {
    const profitLoss = totalSavings + totalInvestments - totalExpenses;
    const total = totalSavings + totalInvestments + totalExpenses;
    const percentage =
      total === 0 ? 0 : ((profitLoss / total) * 100).toFixed(2);
    return {
      percentage:
        percentage >= 0
          ? `${percentage}% Profit`
          : `${Math.abs(percentage)}% Loss`,
      isProfit: percentage >= 0,
    };
  };

  const calculateTabPortionPercentage = (tabAmount) => {
    const total = totalSavings + totalInvestments + totalExpenses;
    return total === 0 ? 0 : ((tabAmount / total) * 100).toFixed(2);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFillColor(75, 0, 130);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text("Expense Tracker - Transaction Report", pageWidth / 2, 20, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 14, 35);

    const { percentage, isProfit } = calculateOverallProfitLossPercentage();
    const profitLossText = isProfit
      ? `Overall Profit: ${percentage}`
      : `Overall Loss: ${percentage}`;

    doc.setFontSize(14);
    doc.setTextColor(
      isProfit ? 34 : 220,
      isProfit ? 139 : 20,
      isProfit ? 34 : 60
    );
    doc.text(profitLossText, 14, 45);

    const tableColumn = ["Date", "Description", "Amount (Rs.)", "Type"];
    const tableRows = transactions.map((transaction) => [
      new Date(transaction.createdAt).toLocaleDateString(),
      transaction.description,
      `Rs.${transaction.amount}`,
      transaction.type,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 60,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 5,
      },
      headStyles: {
        fillColor: [75, 0, 130],
        textColor: [255, 255, 255],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
      },
    });

    doc.save("Expense_Tracker_Report.pdf");
  };

  if (status === "loading") return <LoadingComponent />;
  if (status === "failed") return <ErrorComponent />;

  const { percentage, isProfit } = calculateOverallProfitLossPercentage();
  const filteredTransactions = transactions.map(
    ({ extraField, ...rest }) => rest
  );

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg p-6 text-white">
      <div className="mb-6">
        <p className="font-semibold text-green-200">
          Total Savings: ₹{totalSavings} (
          {calculateTabPortionPercentage(totalSavings)}% of total)
        </p>
        <p className="font-semibold text-blue-200">
          Total Investments: ₹{totalInvestments} (
          {calculateTabPortionPercentage(totalInvestments)}% of total)
        </p>
        <p className="font-semibold text-red-200">
          Total Expenses: ₹{totalExpenses} (
          {calculateTabPortionPercentage(totalExpenses)}% of total)
        </p>
        <p
          className={`font-semibold mt-4 ${
            isProfit ? "text-green-200" : "text-red-200"
          }`}
        >
          Overall Profit/Loss: {percentage}
        </p>
      </div>

      <button
        onClick={downloadPDF}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Download PDF
      </button>

      <div
        className="ag-theme-alpine"
        style={{
          height: "400px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <AgGridReact
          rowData={filteredTransactions}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
          onGridReady={onGridReady}
          onPaginationChanged={onPaginationChanged}
          domLayout="autoHeight"
          suppressColumnVirtualisation={true}
        />
      </div>
    </div>
  );
};

export default TransactionTable;
