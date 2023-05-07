import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", registered: 3 },
  { month: "Feb", registered: 6 },
  { month: "Mar", registered: 12 },
  { month: "Apr", registered: 6 },
  { month: "May", registered: 19 },
  { month: "June", registered: 23 },
];

const UsersChart = () => {
  return (
    <ComposedChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="registered" fill="#8884d8" />
      <Line type="monotone" dataKey="active" stroke="#82ca9d" />
    </ComposedChart>
  );
};

export default UsersChart;
