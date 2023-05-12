// import React from "react";
// import {
//   ComposedChart,
//   Line,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";

// const UsersChart = ({ data }) => {
//   let countDec = 0;
//   let countJan = 0;
//   let countFeb = 0;
//   let countMar = 0;
//   let countApr = 0;
//   let countMay = 0;
//   let countJune = 0;

//   data.forEach((docs) => {
//     const month = docs.month.trim(); // Trim whitespace from month value

//     if (month === "December") {
//       countDec += 1;
//     }

//     if (month === "January") {
//       countJan += 1;
//     }
//     if (month === "February") {
//       countFeb += 1;
//     }
//     if (month === "March") {
//       countMar += 1;
//     }
//     if (month === "April") {
//       countApr += 1;
//     }
//     if (month === "May") {
//       countMay += 1;
//     }
//     if (month === "June") {
//       countJune += 1;
//     }
//   });

//   const ddataa = [
//     { month: "Dec", registered: countDec },
//     { month: "Jan", registered: countJan },
//     { month: "Feb", registered: countFeb },
//     { month: "Mar", registered: countMar },
//     { month: "April", registered: countApr },
//     { month: "May", registered: countMay },
//   ];

//   return (
//     <ComposedChart width={800} height={400} data={ddataa}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="month" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Bar dataKey="Registered Users" fill="#8884d8" />
//       {/* <Line type="monotone" dataKey="active" stroke="#82ca9d" /> */}
//     </ComposedChart>
//   );
// };

// export default UsersChart;

import React from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const UsersChart = ({ data }) => {
  const countByMonth = {};

  data.forEach((doc) => {
    const { index, month } = doc;

    if (countByMonth[month]) {
      countByMonth[month] += 1;
    } else {
      countByMonth[month] = 1;
    }
  });

  const chartData = Object.entries(countByMonth).map(([month, count]) => ({
    month,
    registered: count,
  }));

  return (
    <ComposedChart width={800} height={400} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="registered" fill="#8884d8" name="Registered Users" />
    </ComposedChart>
  );
};

export default UsersChart;
