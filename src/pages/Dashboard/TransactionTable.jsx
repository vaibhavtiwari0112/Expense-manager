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
          onPaginationChanged={onPaginationChanged} // Add pagination change handler
          domLayout="autoHeight"
          suppressColumnVirtualisation={true}
        />
      </div>
    </div>
  );
};

export default TransactionTable;
