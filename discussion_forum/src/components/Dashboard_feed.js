import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faGripHorizontal } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import { Navigate, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { v4 as uuid } from 'uuid';




import saqib from "../images/avatar.png";
import usman from "../images/usman.jpeg";
import hamad from "../images/hamad.jpeg";
import "../CSS/Dashboard_feed.css";
import Edit_Profile from "./Edit_Profile";

const Dashboard_feed = ({QueriesData}) => {
  const navigate = useNavigate();


   const [queryData, setQueryData] = useState({
     
      PostID: QueriesData?.PostID,
      Upvote: QueriesData?.Upvote,
      Devote: QueriesData?.Devote
    });
  
    let name,value;
    const handleInput =(e) => {    
      name = e.target.name;
      value = e.target.value;
  
      setQueryData({...queryData, [name]: value});
  
    };


  const postData = async (e) => {
    // <Edit_Profile key={QueriesData._id} QueriesData={QueriesData} />
    name = e.target.name;
    value = e.target.value;

    setQueryData({...queryData, [name]: value});
    
      e.preventDefault();
          const { PostID, Upvote, Devote} = queryData;

  const res = await fetch("/QueryUpvote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          PostID, Upvote, Devote
        })
      });
  
      if(res.status === 400 || !res) {
        window.alert("Invalid Data.");
        console.log("Invalid Data");
      }
      else{
        window.alert("Successfully Posted");
        console.log("Successfully Posted");
        // Navigate("/dashboard");
  
      }
  
  
  
    };
  
    const CommentClick = async (e) => {

          localStorage.setItem('PostID', JSON.stringify(QueriesData?.PostID));
          let id = JSON.parse(localStorage.getItem('PostID'));
          console.log(id + " ***********");
          navigate("/comment");

        };
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  // const unique_id = uuid();


  // const [queryData, setQueryData] = useState({
  //   UserID: JSON.parse(localStorage.getItem('Email')),
  //   PostID: uuid(),
  //   QueryCategory: "",
  //   QueryTitle: "",
  //   QueryDetails: "",
  //   QueryTags: "",
  // });

  // let name,value;
  // const handleInput =(e) => {    
  //   name = e.target.name;
  //   value = e.target.value;

  //   setQueryData({...queryData, [name]: value});

  // };

  // const postData = async (e) => {
    
  //   e.preventDefault();
   


  //   const { UserID, PostID, QueryCategory, QueryTitle, QueryDetails, QueryTags } = queryData;

  //   const res = await fetch("/Question", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       UserID,PostID,QueryCategory,QueryTitle,QueryDetails,QueryTags
  //     })
  //   });

  //   if(res.status === 400 || !res) {
  //     window.alert("Invalid Data.");
  //     console.log("Invalid Data");
  //   }
  //   else{
  //     window.alert("Successfully Posted");
  //     console.log("Successfully Posted");
  //     navigate("/dashboard");

  //   }



  // };

  return (
    // <Container className="Containerr">


/*{ <div className="full border border-white border-2 rounded-end shadow-lg mb-2">
        <div className="profile-div mb-1">
         
        <div className="headerrr circular--portrait d-flex flex-row mt-1 mb-1">
            <img src={saqib} alt="logo"  className="user-imagee mb-1 mt-1 ms-1"/>

            <div className="searchh">
            <form>
                    <input
                      type="text"
                      placeholder="What do You want to Ask or Share ?"
                      name="search"
                      className="ps-2"
                    />{" "}
                  </form>
                  </div>
                  <Button variant="outline-secondary" onClick={handleShow} className='nav_btnnnn' >Add Query</Button>{' '}
                  <Modal size="lg" centered show={show} onHide={handleClose} className="Modal" >
        <div >
          <h2 className="Title mt-3">Add Query</h2>
          <hr className="mt-3"></hr>
        </div>
        <Modal.Body>
          <Form>

          <div >
            <Form.Select size="sm" className="select" 
            name="QueryCategory"
             value={value}
              onChange={handleInput}>
      <option>Select Category</option>
      <option value="C++">C++</option>
      <option value="Java">Java</option>
      <option value="Python">Python</option>
      <option value="dotnet">dotnet</option>

    </Form.Select>
    </div>
         

            <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput1">
           <h3> Title </h3>

              <Form.Control
                type="text"
                className="input"
                placeholder="Start your Question with 'What', 'How', 'Why' etc."
                name= "QueryTitle"
                value={queryData.QueryTitle}
                onChange={handleInput}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              
             <h3>Details of your Problem</h3>
              <Form.Control as="textarea" rows={10} className="input" placeholder="Write the Description of your Question."
               name= "QueryDetails"
               value={queryData.QueryDetails}
               onChange={handleInput}
              />
            </Form.Group>



    <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
                           <h3>Tags </h3>

              
              <Form.Control as="textarea" rows={3} className="input" placeholder="Mentioned Tags"
               name= "QueryTags"
               value={queryData.QueryTags}
               onChange={handleInput}
              />
            </Form.Group>


          </Form>
        </Modal.Body>
        <div className="modal__button">
          <Button  className="btn" onClick={handleClose}>
            Close
          </Button>
          <Button className="btn"  onClick={postData}>
            Save Changes
          </Button>
        </div>
      </Modal>
</div>
         
          <div className="d-flex btn-opt">

          </div>
        </div>
       
        
      </div> }*/



      <div className="full ms-1 border border-white border-2 rounded-end shadow-lg mb-2">
        <div className="profile-div mb-1">
         
          <div className="headerr circular--portrait d-inline-block mt-1 mb-1">
            <img src={saqib} alt="logo"  className="user-image mb-1 mt-1 ms-1"/>
            <h4> {
              QueriesData?.UserName
            }</h4>
</div>
         
          <div className="d-inline-block btn-opt">
            <FontAwesomeIcon
              icon={faGripHorizontal}
              className="pe-2 pt-4 icon-font"
            />
          </div>
        </div>
        <div className="news ms-2">
          <p className="question-title mt-2">
           
            {
              QueriesData?.QueryTitle
            }
               <p className="category-title mt-1">
                
               <pre>Category:  {QueriesData?.QueryCategory}</pre>    
          
          
         </p>
          </p>

       
          <p className="question-details">
          {
              QueriesData?.QueryDetails
            }
          </p>
        </div>
        <div>
          <div className="icon-div">
            <Row>
              <Col className="col1  pb-1 pt-1" onClick={postData} name="Upvote" value={queryData.Upvote}>
                {" "}
                <p> Upvote ({QueriesData?.Upvote})</p>{" "}
                <FontAwesomeIcon icon={faThumbsUp} className="ps-1" />
              </Col>
              <Col className="col1 pb-1 pt-1" onClick={postData} name="Devote" value={queryData.Devote}>
                {" "}
                <p>Devote ({QueriesData?.Devote})</p>{" "}
                <FontAwesomeIcon icon={faThumbsDown} className="ps-1 " />
              </Col>
              <Col className="col1 pb-1 pt-1" onClick={CommentClick}>
                {" "}
                <p>Comment  </p>{" "}
                <FontAwesomeIcon icon={faCommentDots} className="ps-1 " />
              </Col>
              <Col className="col1 pt-1">
                <p>Share</p>
                <FontAwesomeIcon icon={faShare} className="ps-2" />{" "}
              </Col>
            </Row>
          </div>
        </div>
      </div>


      /*{ <div className="full border border-white border-2 rounded-end shadow-lg mb-2">
        <div className="profile-div mb-1">
         
          <div className="headerr circular--portrait d-inline-block mt-1 mb-1">
  <img src={hamad} alt="logo"  className="user-image mb-1 mt-1 ms-1"/>
  <h4>Hamad Ali</h4>
</div>
         
          <div className="d-inline-block btn-opt">
            <FontAwesomeIcon
              icon={faGripHorizontal}
              className="pe-2 pt-4 icon-font"
            />
          </div>
        </div>
        <div className="news ms-2">
          <p className="question-title mt-2">
            {" "}
            Why are doing AU DIscussion Forum as FYP project?
          </p>
          <p className="question-details">
            Culpa consequat minim proident magna ea ex magna pariatur. Aute
            commodo consectetur ad cupidatat mollit ad in minim. Eu excepteur
            labore qui sunt ipsum minim quis cupidatat incididunt. Do fugiat
            irure labore irure exercitation commodo aliquip excepteur duis
            exercitation sit eu ex exercitation.
          </p>
        </div>
        <div>
          <div className="icon-div">
            <Row>
              <Col className="col1  pb-1 pt-1">
                {" "}
                <p> Upvote </p>{" "}
                <FontAwesomeIcon icon={faThumbsUp} className="ps-1" />
              </Col>
              <Col className="col1 pb-1 pt-1">
                {" "}
                <p>Devote</p>{" "}
                <FontAwesomeIcon icon={faThumbsDown} className="ps-1 " />
              </Col>
              <Col className="col1 pb-1 pt-1">
                {" "}
                <p>Comment</p>{" "}
                <FontAwesomeIcon icon={faCommentDots} className="ps-1 " />
              </Col>
              <Col className="col1 pt-1">
                <p>Share</p>
                <FontAwesomeIcon icon={faShare} className="ps-2" />{" "}
              </Col>
            </Row>
          </div>
        </div>
      </div>


      <div className="full border border-white border-2 rounded-end shadow-lg mb-2">
        <div className="profile-div mb-1">
         
          <div className="headerr circular--portrait d-inline-block mt-1 mb-1">
  <img src={usman} alt="logo"  className="user-image mb-1 mt-1 ms-1"/>
  <h4>M.Usman Sajid</h4>
</div>
         
          <div className="d-inline-block btn-opt">
            <FontAwesomeIcon
              icon={faGripHorizontal}
              className="pe-2 pt-4 icon-font"
            />
          </div>
        </div>
        <div className="news ms-2">
          <p className="question-title mt-2">
            {" "}
            Why are doing AU DIscussion Forum as FYP project?
          </p>
          <p className="question-details">
            Culpa consequat minim proident magna ea ex magna pariatur. Aute
            commodo consectetur ad cupidatat mollit ad in minim. Eu excepteur
            labore qui sunt ipsum minim quis cupidatat incididunt. Do fugiat
            irure labore irure exercitation commodo aliquip excepteur duis
            exercitation sit eu ex exercitation.
          </p>
        </div>
        <div>
          <div className="icon-div">
            <Row>
              <Col className="col1  pb-1 pt-1">
                {" "}
                <p> Upvote </p>{" "}
                <FontAwesomeIcon icon={faThumbsUp} className="ps-1" />
              </Col>
              <Col className="col1 pb-1 pt-1">
                {" "}
                <p>Devote</p>{" "}
                <FontAwesomeIcon icon={faThumbsDown} className="ps-1 " />
              </Col>
              <Col className="col1 pb-1 pt-1">
                {" "}
                <p>Comment</p>{" "}
                <FontAwesomeIcon icon={faCommentDots} className="ps-1 " />
              </Col>
              <Col className="col1 pt-1">
                <p>Share</p>
                <FontAwesomeIcon icon={faShare} className="ps-2" />{" "}
              </Col>
            </Row>
          </div>
        </div>
      </div> }*/
    // </Container>
  );
};

export default Dashboard_feed;
