import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "./Dashboard.actions"; // Update to your fetch action
import {
  selectTransactions,
  selectDashboardStatus,
  selectDashboardError,
} from "./Dashboard.selectors"; // Update to your selectors
import ReactPaginate from "react-paginate";
import { isEmpty } from "lodash";

const TransactionTable = ({ interval }) => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const status = useSelector(selectDashboardStatus);
  const error = useSelector(selectDashboardError);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // You can change the number of items per page
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalInvestments, setTotalInvestments] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    if (interval) {
      dispatch(
        fetchTransactions({ page: currentPage + 1, itemsPerPage, interval })
      );
    }
  }, [dispatch, currentPage, interval]);

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

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const pageCount = Math.ceil(transactions.length / itemsPerPage);
  const displayedTransactions = transactions.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const calculateProfitLossPercentage = (total) => {
    const profitLoss = totalSavings + totalInvestments - totalExpenses;
    const percentage =
      total === 0 ? 0 : ((profitLoss / total) * 100).toFixed(2);
    return percentage >= 0
      ? `${percentage}% Profit`
      : `${Math.abs(percentage)}% Loss`;
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-bold text-center mb-4">Transaction Table</h3>
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-green-600 font-semibold">
            Total Savings: ${totalSavings} (
            {calculateProfitLossPercentage(totalSavings)})
          </p>
          <p className="text-blue-600 font-semibold">
            Total Investments: ${totalInvestments} (
            {calculateProfitLossPercentage(totalInvestments)})
          </p>
          <p className="text-red-600 font-semibold">
            Total Expenses: ${totalExpenses} (
            {calculateProfitLossPercentage(totalExpenses)})
          </p>
        </div>
      </div>
      {!isEmpty(transactions) && (
        <div>
          <table className="w-full text-center">
            <thead>
              <tr className="bg-indigo-200">
                <th className="p-2">Date</th>
                <th className="p-2">Description</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {displayedTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-indigo-100">
                  <td className="p-2">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2">{transaction.description}</td>
                  <td className="p-2">${transaction.amount}</td>
                  <td className="p-2">{transaction.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"flex justify-center my-4"}
            pageClassName={"mx-1"}
            previousClassName={"mx-1"}
            nextClassName={"mx-1"}
            activeClassName={"bg-indigo-600 text-white"}
            breakClassName={"mx-1"}
          />
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
