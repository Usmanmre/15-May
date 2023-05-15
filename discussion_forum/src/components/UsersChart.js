import React from "react";
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const UsersChart = ({ data }) => {

  const countbyMonth ={};
  
  const teach = [];
  data.forEach((doc)=>{
    const {index, month, category}= doc;
    

  if (category==="Teacher"){
    if (countbyMonth[month]){
      countbyMonth[month].teachers+=1;
    } else(

      countbyMonth[month]= {month, teachers:1, students:0}
    )
     teach.push(doc)

  }

 else if (category==="Student"){
    if (countbyMonth[month]){
      countbyMonth[month].students+=1;
    } else{
      countbyMonth[month]={month, teachers:0, students:1}
    }
  }

})
const combinedData = Object.values(countbyMonth).map(({ month, teachers, students }) => ({
  month,
  Teachers: teachers,
  Students: students
}));


















  // const countByMonth = {};

  // const teacherData = [];
  // const studentData = [];

  // data.forEach((doc) => {
  //   const { index, month, category } = doc;
  //   if (category === "Teacher") {
  //     if (countByMonth[month]) {
  //       countByMonth[month].teachers += 1;
  //     } else {
  //       countByMonth[month] = { month, teachers: 1, students: 0 };
  //     }
  //     teacherData.push(doc);
  //   } else if (category === "Student") {
  //     if (countByMonth[month]) {
  //       countByMonth[month].students += 1;
  //     } else {
  //       countByMonth[month] = { month, teachers: 0, students: 1 };
  //     }
  //     studentData.push(doc);
  //   }
  // });



  // const combinedData = Object.values(countByMonth).map(({ month, teachers, students }) => ({
  //   month,
  //   Teacher: teachers,
  //   Students: students,
  // }));

  return (
    <ComposedChart width={800} height={400} data={combinedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Teachers" fill="#8884d8" name="Teachers" />
      <Bar dataKey="Students" fill="#82ca9d" name="Students" />
    </ComposedChart>
  );
};

export default UsersChart;
