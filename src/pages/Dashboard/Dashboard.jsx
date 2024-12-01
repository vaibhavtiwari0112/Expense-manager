import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TransactionTable from "./TransactionTable";
import LoadingComponent from "../../component/Loading";
import ErrorComponent from "../../component/Error";
import Tippy from "@tippyjs/react";
const Dashboard = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const status = useSelector(selectDashboardStatus);
  const error = useSelector(selectDashboardError);

  const [interval, setInterval] = useState("monthly");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("expenses");
  const [highlightedDates, setHighlightedDates] = useState(new Set());

  const currentYear = new Date().getFullYear();
  const colors = ["#ff6b6b", "#4db8ff", "#66ff66", "#ffc300", "#e040fb"];

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTransactions({ interval }));
      const datesWithTransactions = new Set(
        transactions.map((transaction) =>
          new Date(transaction.createdAt).toDateString()
        )
      );
      setHighlightedDates(datesWithTransactions);
    }
  }, [dispatch, status, interval]);

  useEffect(() => {
    const prepareData = () => {
      const data = Array.from(
        { length: interval === "monthly" ? 12 : 10 },
        (_, i) => ({
          name:
            interval === "monthly"
              ? new Date(0, i).toLocaleString("default", { month: "short" })
              : `${currentYear - 9 + i}`,
          expenses: 0,
          savings: 0,
          investments: 0,
        })
      );

      transactions.forEach((transaction) => {
        const transactionDate = new Date(transaction.createdAt);
        const index =
          interval === "monthly"
            ? transactionDate.getMonth()
            : transactionDate.getFullYear() - (currentYear - 9);

        if (index >= 0 && index < data.length) {
          const transactionType =
            transaction.type === "expense"
              ? "expenses"
              : transaction.type === "saving"
              ? "savings"
              : "investments";
          data[index][transactionType] += transaction.amount;
        }
      });

      if (interval === "monthly") {
        const pieData = data.map((d) => ({
          ...d,
          name: d.name,
        }));
        setFilteredData(pieData);
      } else {
        setFilteredData(data);
      }
    };

    prepareData();
  }, [transactions, interval, currentYear]);

  const formatCurrency = (value) => {
    if (value >= 10000000) return `${(value / 10000000).toFixed(1)} Cr`;
    if (value >= 100000) return `${(value / 100000).toFixed(1)} L`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)} K`;
    return value;
  };

  const handleDayRender = (date) => {
    const dayTransactions = transactions.filter(
      (transaction) =>
        new Date(transaction.createdAt).toDateString() === date.toDateString()
    );

    if (dayTransactions.length === 0) {
      return null;
    }
    const total = dayTransactions.reduce(
      (acc, transaction) => {
        acc[transaction.type] += transaction.amount;
        return acc;
      },
      { expense: 0, saving: 0, investment: 0 }
    );

    return (
      <Tippy
        content={
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-2 text-white shadow-lg text-sm">
            <div className="text-red-500">
              {`Expenses: ${formatCurrency(total.expense)}`}
            </div>
            <div className="text-green-500">
              {`Savings: ${formatCurrency(total.saving)}`}
            </div>
            <div className="text-yellow-500">
              {`Investments: ${formatCurrency(total.investment)}`}
            </div>
          </div>
        }
        placement="top"
      >
        <div className="p-1 rounded-full bg-indigo-500 text-white">
          {date.getDate()}
        </div>
      </Tippy>
    );
  };

  if (status === "loading") return <LoadingComponent />;
  if (status === "failed") return <ErrorComponent />;

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
      <aside className="w-64 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 text-white">
        <h2 className="text-2xl font-bold text-center">Dashboard</h2>
        <ul className="flex flex-col space-y-4 mt-4">
          {[
            "expenses",
            "savings",
            "investments",
            "overall",
            "transactions",
          ].map((tab) => (
            <li
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`hover:bg-white hover:bg-opacity-30 p-2 rounded cursor-pointer ${
                activeTab === tab ? "bg-white bg-opacity-30" : ""
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-4 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white">
            {activeTab.toUpperCase()}
          </h1>
          <select
            value={interval}
            onChange={(e) => {
              setInterval(e.target.value);
              if (e.target.value === "yearly") {
                dispatch(fetchTransactions({ interval: "yearly" }));
              }
            }}
            className="p-2 rounded bg-indigo-600 text-white"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {activeTab !== "transactions" && activeTab !== "overall" && (
          <>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 shadow-lg hover:shadow-2xl transition duration-300 mb-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#fff" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" tickFormatter={formatCurrency} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={activeTab}
                    stroke={colors[0]}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 shadow-lg hover:shadow-2xl transition duration-300 mb-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#fff" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" tickFormatter={formatCurrency} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey={activeTab} fill={colors[1]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeTab !== "transactions" && activeTab !== "overall" && (
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 shadow-lg mb-4">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              inline
              dayClassName={(date) =>
                transactions.some(
                  (t) =>
                    new Date(t.createdAt).toDateString() === date.toDateString()
                )
                  ? "highlight-day"
                  : undefined
              }
              renderDayContents={(day, date) => handleDayRender(date) || day}
            />
          </div>
        )}
        {activeTab === "overall" && (
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 shadow-lg hover:shadow-2xl transition duration-300 mb-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fff" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" tickFormatter={formatCurrency} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke={colors[2]}
                  strokeWidth={2}
                  name="Savings"
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke={colors[0]}
                  strokeWidth={2}
                  name="Expenses"
                />
                <Line
                  type="monotone"
                  dataKey="investments"
                  stroke={colors[1]}
                  strokeWidth={2}
                  name="Investments"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === "transactions" && <TransactionTable />}
      </main>
    </div>
  );
};

export default Dashboard;
