import React from "react";
import "../CSS/AdminDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

// import { CRow } from "react-bootstrap";
import Chart from "./Chart";
import UsersChart from "./UsersChart";
import AdminSidebar from "./AdminSidebar";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [queryCount, setQueryCount] = useState(0);
  const [pieData, setPieData] = useState([]);
  const [pieDataCategory, setpieDataCategory] = useState([]);
  const [pieReportdata, setpieReportdata] = useState([]);
  const [monthYearArray, setmonthYearArray] = useState([]);
  // const [newState, setNewState] = useState([]);
  const [newStatecategory, setnewStatecategory] = useState([]);

  const getUserscount = async () => {
    try {
      const response = await fetch("/usersCount");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setUserCount(data.data.length);
    } catch (error) {
      console.error("Error fetching users count:", error);
    }
  };

  //////////////////////////////////////////////// find query & user count  ////////////////////////////////

  const getQuerycount = async () => {
    try {
      const response = await fetch("/queryCount");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setQueryCount(data.data.length);

      let array = [
        { name: "user", value: userCount },
        { name: "Query", value: data.data.length },
      ];
      setPieData(array);

      // setPieData(pieData.push({query:data.data.length}))
    } catch (error) {
      console.error("Error fetching query count:", error);
    }
  };

  //////////////////////////////////////////////// find query category ////////////////////////////////

  const getQueryCategory = async () => {
    try {
      const response = await fetch("/showquery");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const dataArray = Object.values(data.data);

      let counttCpp = 0;
      let counttJava = 0;
      let counttPython = 0;
      let counttdotnet = 0;

      dataArray.forEach((docs) => {
        if (docs.QueryCategory === "C++") {
          counttCpp += 1;
        }
        if (docs.QueryCategory === "Java") {
          counttJava += 1;
        }
        if (docs.QueryCategory === "Python") {
          counttPython += 1;
        }
        if (docs.QueryCategory === "dotnet") {
          counttdotnet += 1;
        }
      });

      let array2 = [
        { name: "C++", value: counttCpp },
        { name: "Java", value: counttJava },
        { name: "Python", value: counttPython },
        { name: "Dotnet", value: counttdotnet },
      ];

      setpieDataCategory(array2);
      // console.log(`Found ${countt} documents with category "C++"`);
    } catch (error) {
      console.error("Error fetching query count:", error);
    }
  };

  //////////////////////////////////////////////// find report category ////////////////////////////////

  const getReportCategory = async () => {
    try {
      const response = await fetch("/findreport");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const dataArrayR = Object.values(data.data);

      // console.log("new====---------", dataArrayR)

      let counttOff = 0;
      let counttInap = 0;
      let counttAbus = 0;
      let counttBuly = 0;
      let counttIreleve = 0;
      let counttOther = 0;

      dataArrayR.forEach((docs) => {
        if (docs.Category === "offensive") {
          counttOff += 1;
        }
        if (docs.Category === "Inappropriate") {
          counttInap += 1;
        }
        if (docs.Category === "Abusive") {
          counttAbus += 1;
        }
        if (docs.Category === "Bullying") {
          counttBuly += 1;
        }
        if (docs.Category === "Irrelevant") {
          counttIreleve += 1;
        }
        if (docs.Category === "Other") {
          counttOther += 1;
        }
      });

      // console.log("new====---------myyy", counttOff);

      let array3 = [
        { name: "Offensive", value: counttOff },
        { name: "Inappropriate", value: counttInap },
        { name: "Abusive", value: counttAbus },
        { name: "Bullying", value: counttBuly },
        { name: "Irrelevant", value: counttIreleve },
        { name: "Other", value: counttOther },
      ];

      setpieReportdata(array3);
    } catch (error) {
      console.error("Error fetching query count:", error);
    }
  };

  //////////////////////////////////////////////// find users with date ////////////////////////////////

  const getUserswithdate = async () => {
    try {
      const response = await fetch("/finduserwithdate");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const monthYearArray = data.map((dateObject) => {
        const date = new Date(dateObject.Date);
        const month = date.toLocaleString("default", { month: "long" });
        // const year = date.getFullYear();
        return `${month} `;
      });

      
      // console.log("cat", monthYearArray);
      
      const formattedData = monthYearArray.map((month, index) => {
        return { index, month };
      });
      // console.log("zzzzz", formattedData)
      setmonthYearArray(formattedData);
        //   const filteredData = data.filter((cat) => cat.Month === month);
      // const categories = data.map((doc) => {
      //   return doc.Category;
      // });
      
      // Now the 'categories' array contains the 'Category' values from the 'data' array
      // console.log("data", formattedData);
      // console.log("cat", categories);

      
      // console.log("fitler" , cat);

      // const formattedData = monthYearArray.map((month, index) => {
      //   const category = data.Category[index]
    
      //   return {
      //     index,
      //     month,
      //     category
      //   };
      // });
      
      // console.log(formattedData);
      
      
      // console.log(formattedData);
      
      
      
      
      // console.log("filteredData", formattedData);
      
     
      // setnewStatecategory(categories);
      


    } catch (error) {

      console.error("Error fetching query count:", error);
    }
  };
 
  // const mergedArray = monthYearArray.concat(newStatecategory);

  // console.log("monthYearArray", monthYearArray)
  // console.log("newStatecategory", newStatecategory)

// console.log("newarray-----", mergedArray)


  useEffect(() => {
    getUserswithdate();
    
    getUserscount();
    getQuerycount();
    getQueryCategory();
    getReportCategory();
  }, []);

  return (
    <>
      <div className="admin-container">
        
        <AdminSidebar />

        {/**************************************** Dashboard  */}

        <div className="dashbooard-container">
        {/* <NavBar/> */}
          <div className="upfirst">
            <h2 id="statss">Statistics</h2>
            <div className="upper-portion">
              <div className="upper1">
                <div className="admin-upper-card">
                  <FontAwesomeIcon className="icon" icon={faUser} />

                  <div className="card-inside-content">{userCount}</div>
                  <div className="card-inside-head">Total Users</div>
                </div>
                <div className="admin-upper-card">
                  <FontAwesomeIcon className="icon" icon={faCircleQuestion} />

                  <div className="card-inside-content">{queryCount}</div>
                  <div className="card-inside-head">Total Queries</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lower1">
            <h3 className="graph-head"> Users Graph</h3>


            <UsersChart data={monthYearArray} />


            <div className="piecharts">
              <div className="graph1">
                <h3 className="graph-head">Category wise Queries</h3>
                <Chart data={pieDataCategory} />
              </div>
              <div className="graph1">
                <h3 className="graph-head"> Category wise Reports</h3>
                <Chart data={pieReportdata} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
