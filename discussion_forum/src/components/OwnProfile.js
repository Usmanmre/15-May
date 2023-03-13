import React from "react";
import { Container, Row, Col,Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faGripHorizontal } from "@fortawesome/free-solid-svg-icons";

import saqib from "../images/saqib.jpeg";
import "../CSS/OwnProfile.css"
import usman from "../images/usman.jpeg";
import hamad from "../images/hamad.jpeg";
import Dashboard_feed from "./Dashboard_feed";


const OwnProfile = ({workout}) => {
  return (
    <div>
        {/* <div class="container"> */}
    <div class="main-body">
    
          
          <div class="row gutters-sm">
            
            <div class="col-md-12">
            <Dashboard_feed key={workout._id} workout={workout} />
              



            </div>
          </div>

        </div>
    </div>

    // </div>   

  );
};

export default OwnProfile;