import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Dashboard_feed from './Dashboard_feed';
import { Container, Row, Col,Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faGripHorizontal } from "@fortawesome/free-solid-svg-icons";

import saqib from "../images/saqib.jpeg";
import "../CSS/Profile.css"
import usman from "../images/usman.jpeg";
import hamad from "../images/hamad.jpeg";


import OwnProfile from './OwnProfile';
import OwnPrac2 from './OwnPrac2';
import Edit_Profile from './Edit_Profile';
import Dashboard_sidebar from './dashboard_sidebar';

const OwnPrac = () => {
   const Navigate = useNavigate();
    const [userData, setUserData] = useState('');
    const [userDataa, setUserDataa] = useState('');

    

    const callAboutPage = async() => {

        try{
            const res= await fetch('/OwnQuestion',{
                method:"GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
                
            });
    
            const data = await res.json();
            console.log(data);
            setUserData(data);
    
            if(!res.status === 200 ){
                const error = new Error(res.error);
                throw error;
            }
        }
        catch(err){
            console.log(err);

        }
       

    }


    const callOwnQuestionn = async() => {

        try{
            const res= await fetch('/OwnQuestionn',{
                method:"GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
    
            });
    
            const data = await res.json();
            console.log(data);
            setUserDataa(data);
    
            if(!res.status === 200 ){
                const error = new Error(res.error);
                throw error;
            }
        }
        catch(err){
            console.log(err);
            Navigate('/login');

        }
       

    }

    useEffect(() => {
        callAboutPage();
        callOwnQuestionn();
    },[]);

  return (
      
         <div>
        <div class="containerr">
    <div class="main-bodyy">
    
          
          <div class="row gutters-sm">
          <div class="dashboard_sidebar col-md-2 col-lg-2 mb-3 ms-0 mt-1 ">
          <Dashboard_sidebar /> </div>
          <div class="profile_cards col-md-5 col-lg-3 mb-3 mt-1 ms-5">
    <div class="card  ">
      <div class="card-body">
        <div class="d-flex flex-column align-items-center text-center">
          <img alt="Admin" class="rounded-circle" width="150" src={saqib}/>
          <div class="mt-3">
            <h3 className='text-capitalize'>{userDataa?.name}</h3>
            <p class="text-secondary mb-1">Full Stack Developer</p>
            <p class="text-muted font-size-sm">E-9 Islamabad</p>
            <Button id="edit_profile_btn" type="submit" onClick={() => {Navigate('/EditProfile')}}>
                Edit Profile
              </Button>
                                    {/* <button class="btn btn-outline-primary">Message</button> */}
          </div>
        </div>
      </div>
    </div>
    <div class="card  mt-3">
      <ul class="list-group list-group-flush">
      <li class="CD list-group-item d-flex justify-content-between align-items-center flex-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
          <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>
      <span class="text-secondary">{userDataa?.Email}</span>
        </li>

        <li class="CD list-group-item d-flex justify-content-between align-items-center flex-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 512">
          <path d="M176 288c61.9 0 112-50.1 112-112s-50.1-112-112-112S64 114.1 64 176s50.1 112 112 112zM352 176c0 86.3-62.1 158.1-144 173.1V384h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H208v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V448H112c-17.7 0-32-14.3-32-32s14.3-32 32-32h32V349.1C62.1 334.1 0 262.3 0 176C0 78.8 78.8 0 176 0s176 78.8 176 176zM271.9 360.6c19.3-10.1 36.9-23.1 52.1-38.4c20 18.5 46.7 29.8 76.1 29.8c61.9 0 112-50.1 112-112s-50.1-112-112-112c-7.2 0-14.3 .7-21.1 2c-4.9-21.5-13-41.7-24-60.2C369.3 66 384.4 64 400 64c37 0 71.4 11.4 99.8 31l20.6-20.6L487 41c-6.9-6.9-8.9-17.2-5.2-26.2S494.3 0 504 0H616c13.3 0 24 10.7 24 24V136c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-33.4-33.4L545 140.2c19.5 28.4 31 62.7 31 99.8c0 97.2-78.8 176-176 176c-50.5 0-96-21.3-128.1-55.4z"/></svg>
          <span class="text-secondary">Male</span>

        </li>







        <li class="CD list-group-item d-flex justify-content-between align-items-center flex-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512">
     <path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z"/></svg>
      <span class="text-secondary">Student</span>

        </li>








        <li class="CD list-group-item d-flex  justify-content-between align-items-center flex-wrap">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe mr-0 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          {/* <span className="span">Website</span> */}

          <span class="text-secondary">https://AUDF.com</span>
        </li>

        <li class="CD list-group-item d-flex justify-content-between align-items-center flex-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
      <span class="text-secondary">https://Github.com/Saqi</span>
        </li>
        <li class="CD list-group-item d-flex justify-content-between align-items-center flex-wrap">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>

          <span class="text-secondary">@AUDF</span>
        </li>
        <li class="CD list-group-item d-flex justify-content-between align-items-center flex-wrap">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          <span class="text-secondary">www.instagram.com/AUDF</span>
        </li>
        
      </ul>
    </div>
  </div>     
            <div class="own_query col-md-6 col-lg-6 mt-1">
            {userData && userData.map((workout) => (
        <OwnProfile key={workout._id} workout={workout} />
      ))}              

                

            </div>
          </div>

        
    </div>

    </div>   
    {/* {userData.QueryCategory}
    <p>{userData.UserID}</p>
     <p>{userData.PostID}</p>
     <p>{userData.QueryCategory}</p>
     <p>{userData.QueryTitle}</p>
     <p>{userData.QueryDetails}</p>
     <p>{userData.QueryTags}</p> */}



     
    </div>
  )
}

export default OwnPrac