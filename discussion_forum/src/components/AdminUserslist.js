import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import "../CSS/AdminUserslist.css";
import avatar from "../images/usman.jpeg";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminUserControl from "./AdminUserControl";

const AdminUserslist = () => {
  let data;
  const [userList, setuserList] = useState([]);
  const [selectedUseremail, setselectedUseremail] = useState();
  const [search, setsearch] = useState("");
  const [isSuspended, setIsSuspended] = useState(false);
  const [isAdminusercontrol, setisAdminusercontrol] = useState(false);

  const getUserslist = async () => {
    try {
      const response = await fetch("/usersList", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      data = await response.json();
      setuserList(data);
    } catch (error) {
      console.error("Error fetching users list:", error);
    }
  };

  // const handleSuspension = () => {
  //   // Prevent suspension if user ndis already suspended
  //   if (isSuspended) {
  //     return;
  //   }

  //   // Set isSuspended to true
  //   setIsSuspended(true);

  //   // Remove suspension after 10 minutes
  //   setTimeout(() => {
  //     setIsSuspended(false);
  //   }, 1 * 60 * 1000); // 10 minutes in milliseconds
  // };



  const getuserID = (email) => {
    setisAdminusercontrol(true);
    setselectedUseremail(email);

  };

  useEffect(() => {
    getUserslist();
  }, []);

  return (
    <div className="adminn-container">
      <div className="feed-side-bar-div">
        <AdminSidebar />
      </div>
      <div className="userslist-container">
        <h2 id="stats">Users List</h2>
        <div className="search-bar-admin-panel-user">
          <div class="mid-sec">
            {/* <Form>
              <Form.control input class="search-bar" type="text" placeholder="Search"  onchange={(e)=> setsearch(e.target.value)} />
            </Form> */}
            <input
              class="search-bar"
              type="text"
              placeholder="Search"
              onChange={(e) => setsearch(e.target.value)}
            />
          </div>
        </div>
        <div className="admin-panel-users-list-header">
          <div className="admin-panel-users-list-header-options">Name</div>
          <div className="admin-panel-users-list-header-options">Email</div>
          <div className="admin-panel-users-list-header-options">Category</div>
          <div className="admin-panel-users-list-header-options">Status</div>

        </div>

        {/* {console.log(search)} */}
        {isAdminusercontrol && <AdminUserControl email={selectedUseremail} />}

        {userList
  .filter((user) => {
    const emailCategory = user.Email.split("@")[0];

    if (search.trim() === "") {
      return true; // Display all users when search is empty
    }

    return (
      emailCategory === search.toLowerCase() ||
      user.Email.toLowerCase() === search.toLowerCase()
    );
  })
  .map((user) => (
    <div className="grid1" key={user.id}>
      <div className="grid-item">
        <div className="display-userlist-option" id="name">
          {user.name}
        </div>
        <div className="display-userlist-option" id="name">
          {user.Email}
        </div>
        <div className="display-userlist-option" id="name">
          {user.Category}
        </div>
        <button
          className="display-userlist-option"
          id="status"
          onClick={() => {
            getuserID(user.Email);
          }}
        >
          Active
        </button>
      </div>
    </div>
  ))}

      </div>
    </div>
  );
};

export default AdminUserslist;
