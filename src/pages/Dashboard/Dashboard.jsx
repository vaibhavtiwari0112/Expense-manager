// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "./Dashboard.actions";
import {
  selectTransactions,
  selectDashboardStatus,
  selectDashboardError,
} from "./Dashboard.selectors";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import TransactionTable from "./TransactionTable"; // Import the new component

const Dashboard = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const status = useSelector(selectDashboardStatus);
  const error = useSelector(selectDashboardError);

  const [interval, setInterval] = useState("monthly");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("expenses");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTransactions());
    }
  }, [dispatch, status]);
  useEffect(() => {
    if (!Array.isArray(transactions)) {
      console.error("Transactions data is not an array:", transactions);
      return;
    }

    const transformedData = transactions.reduce((acc, transaction) => {
      const dateKey =
        interval === "monthly"
          ? new Date(transaction.createdAt).toLocaleString("default", {
              month: "short",
            })
          : new Date(transaction.createdAt).getFullYear();

      const existingEntry = acc.find((item) => item.name === dateKey);

      if (!existingEntry) {
        acc.push({
          name: dateKey,
          expenses: transaction.type === "expense" ? transaction.amount : 0,
          savings: transaction.type === "saving" ? transaction.amount : 0,
          investments:
            transaction.type === "investment" ? transaction.amount : 0,
        });
      } else {
        if (transaction.type === "expense") {
          existingEntry.expenses += transaction.amount;
        } else if (transaction.type === "saving") {
          existingEntry.savings += transaction.amount;
        } else if (transaction.type === "investment") {
          existingEntry.investments += transaction.amount;
        }
      }
      return acc;
    }, []);

    setFilteredData(transformedData);
  }, [transactions, interval]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-800 text-white flex flex-col">
        <h2 className="text-2xl font-bold text-center p-4">Dashboard</h2>
        <ul className="flex flex-col space-y-4 p-4">
          <li
            onClick={() => setActiveTab("expenses")}
            className={`hover:bg-indigo-700 p-2 rounded cursor-pointer ${
              activeTab === "expenses" ? "bg-indigo-700" : ""
            }`}
          >
            Expenses
          </li>
          <li
            onClick={() => setActiveTab("savings")}
            className={`hover:bg-indigo-700 p-2 rounded cursor-pointer ${
              activeTab === "savings" ? "bg-indigo-700" : ""
            }`}
          >
            Savings
          </li>
          <li
            onClick={() => setActiveTab("investments")}
            className={`hover:bg-indigo-700 p-2 rounded cursor-pointer ${
              activeTab === "investments" ? "bg-indigo-700" : ""
            }`}
          >
            Investments
          </li>
          <li
            onClick={() => setActiveTab("transactions")}
            className={`hover:bg-indigo-700 p-2 rounded cursor-pointer ${
              activeTab === "transactions" ? "bg-indigo-700" : ""
            }`}
          >
            Transactions
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 p-4">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">
          {activeTab.toString().toUpperCase()}
        </h1>

        {activeTab !== "transactions" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
            {/* Line Chart Card */}
            <div className="bg-white rounded-lg shadow-lg p-4 transform transition duration-300 hover:scale-105">
              {/* <h3 className="text-lg font-bold text-center mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Chart
              </h3> */}
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey={activeTab} stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart Card */}
            <div className="bg-white rounded-lg shadow-lg p-4 transform transition duration-300 hover:scale-105">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey={activeTab} fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Radar Chart Card */}
            <div className="bg-white rounded-lg shadow-lg p-4 transform transition duration-300 hover:scale-105">
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={filteredData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis />
                  <Tooltip />
                  <Radar
                    dataKey={activeTab}
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Calendar with Tooltips */}
        {activeTab !== "transactions" && (
          <div className="flex justify-center mb-10">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileContent={({ date }) => {
                const transaction = transactions.find(
                  (t) =>
                    new Date(t.createdAt).toDateString() === date.toDateString()
                );
                return transaction ? (
                  <div
                    data-tip={`${transaction.type.toUpperCase()}: ${
                      transaction.amount
                    }`}
                    className="bg-red-500 text-white p-1 rounded-full"
                  >
                    {transaction.amount}
                    <ReactTooltip place="top" type="dark" effect="solid" />
                  </div>
                ) : null;
              }}
            />
          </div>
        )}
        {activeTab === "transactions" && (
          <TransactionTable transactions={transactions} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
