import React from 'react'
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
    CDBIcon
  } from 'cdbreact';
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

  import { NavLink } from 'react-router-dom';
  import AU from "../images/website_logo_transparent.png";
  import "../CSS/dashboard_sidebar.css"

const Dashboard_sidebar = () => {
    
    return (
        <div className='side'  style={{ display: 'flex', height: 'max-content', overflow: 'scroll initial' }}>
        <CDBSidebar className="sidebar" textColor="#3C4858" backgroundColor="#FAFAFA">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a href="/dashboard" className="sidebar_logo text-decoration-none" style={{ color: 'inherit' }}>
                <span><img className="" src={AU}></img></span>
            </a>
          </CDBSidebarHeader>
  
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
            <NavLink exact to="/dashboard" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="sidebar"  icon="home">Home</CDBSidebarMenuItem>
              </NavLink>
            <NavLink exact to="/OwnProfile" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="sidebar"  icon="user">User Profile</CDBSidebarMenuItem>
              </NavLink>
             
             
             
              {/* <NavLink exact to="/analytics" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="sidebar"  icon="chart-line">Analytics</CDBSidebarMenuItem>
              </NavLink> */}
  
      

              <NavLink exact to="/feedback" activeClassName="activeClicked">
                <CDBSidebarMenuItem  className="sidebar"  icon="comment-alt">Feedback</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/about" target="_blank" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="sidebar"  icon="file-alt">Documentation</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/about" target="_blank" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="sidebar"  icon="exclamation-circle">About Us</CDBSidebarMenuItem>
              </NavLink>
             
             
              <NavLink exact to="/EditProfile" activeClassName="activeClicked">
                <CDBSidebarMenuItem  className="sidebar"  icon="cog">Settings</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/" target="_blank" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="sidebar"  icon="sign-out-alt">Logout</CDBSidebarMenuItem>
              </NavLink>
             
            </CDBSidebarMenu>
          </CDBSidebarContent>
  
              
        </CDBSidebar>
      </div>
    );
  };
  

export default Dashboard_sidebar;