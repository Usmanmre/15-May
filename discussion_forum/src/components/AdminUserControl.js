import React, { useState, useEffect } from "react";
import { Key } from "react-bootstrap-icons";

const AdminUserControl = ({ email }) => {

  const [userList, setUserList] = useState([]);

  const getUsersList = async () => {
    try {
      const response = await fetch("/usersList", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      setUserList(data);
      suspendUser(email, email.isEnabled);

      // console.log("data......", data)
    } catch (error) {
      console.error("Error fetching users list:", error);
    }
  };

  const updateUserEnabledStatus = async (email, isEnabled) => {

    try {
      const params = new URLSearchParams();
      params.append("email", email);
      const response = await fetch(`/users?${params.toString()}`, {
        method: "PUT", 
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ isEnabled }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user status");
      }

        
      userList.map((user)=>{
        if (user.Email==email){
        
          if (user.isEnabled){
            return !user.isEnabled
          }
          else {
            return !user.isEnabled;
          }
        }
      })
  

      // setUserList((prevUserList) =>
      //   prevUserList.map((user) => {
      //     if (user.email === email) {
      //       return {
      //         ...user,
      //         isEnabled,
      //       };
      //     }
      //     return user;  
      //   })
      // );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const suspendUser = async (email, isEnabled) => {
    try {
      await updateUserEnabledStatus(email, isEnabled);
    } catch (error) {
      console.error("Error suspending user:", error);
    }
  };

  useEffect(() => {
    getUsersList(); 
    suspendUser(email, email.isEnabled);
  }, [email]);

  return <div></div>;
};

export default AdminUserControl;
