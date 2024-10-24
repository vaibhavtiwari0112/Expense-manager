import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", expenses: 400, savings: 240, investments: 240 },
  { name: "Feb", expenses: 300, savings: 139, investments: 221 },
  { name: "Mar", expenses: 200, savings: 980, investments: 229 },
  { name: "Apr", expenses: 278, savings: 390, investments: 200 },
  { name: "May", expenses: 189, savings: 480, investments: 218 },
  { name: "Jun", expenses: 239, savings: 380, investments: 250 },
];

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-4">
      <h1 className="text-4xl font-bold text-white mb-6">Dashboard</h1>
      <ResponsiveContainer width="90%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="expenses" stroke="#ff7300" />
          <Line type="monotone" dataKey="savings" stroke="#387908" />
          <Line type="monotone" dataKey="investments" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;