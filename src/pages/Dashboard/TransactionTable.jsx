
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "./Dashboard.actions";
import {
  selectTransactions,
  selectDashboardStatus,
  selectDashboardError,
} from "./Dashboard.selectors";
import ReactPaginate from "react-paginate";
import { isEmpty } from "lodash";
import LoadingComponent from "../../component/Loading";
import ErrorComponent from "../../component/Error";

const TransactionTable = ({ interval }) => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const status = useSelector(selectDashboardStatus);
  const error = useSelector(selectDashboardError);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
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

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-2xl">
      <div className="flex justify-between mb-6">
        <div>
          <p className="text-green-300 font-semibold">
            Total Savings: ₹{totalSavings} (
            {calculateTabPortionPercentage(totalSavings)}% of total)
          </p>
          <p className="text-blue-300 font-semibold">
            Total Investments: ₹{totalInvestments} (
            {calculateTabPortionPercentage(totalInvestments)}% of total)
          </p>
          <p className="text-red-300 font-semibold">
            Total Expenses: ₹{totalExpenses} (
            {calculateTabPortionPercentage(totalExpenses)}% of total)
          </p>
          <p
            className={`font-semibold mt-4 ${
              isProfit ? "text-green-300" : "text-red-300"
            }`}
          >
            Overall Profit/Loss: {percentage}
          </p>
        </div>
      </div>

      {!isEmpty(transactions) && (
        <div>
          <table className="w-full text-center border-collapse mb-4">
            <thead className="bg-indigo-300 rounded-lg">
              <tr>
                <th className="p-4 text-white">Date</th>
                <th className="p-4 text-white">Description</th>
                <th className="p-4 text-white">Amount</th>
                <th className="p-4 text-white">Type</th>
              </tr>
            </thead>
            <tbody>
              {displayedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className={`transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 ${
                    transaction.type === "expense"
                      ? "bg-red-100"
                      : transaction.type === "saving"
                      ? "bg-green-100"
                      : "bg-blue-100"
                  }`}
                >
                  <td className="p-4">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">{transaction.description}</td>
                  <td className="p-4">₹{transaction.amount}</td>
                  <td className="p-4 capitalize">{transaction.type}</td>
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
            containerClassName={"flex justify-center my-6"}
            pageClassName={"mx-1"}
            previousClassName={"mx-1"}
            nextClassName={"mx-1"}
            activeClassName={"bg-indigo-600 text-white rounded-full"}
            breakClassName={"mx-1"}
            className={"flex space-x-2"}
          />
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
