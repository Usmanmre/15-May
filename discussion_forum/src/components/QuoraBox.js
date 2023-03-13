import React,{useState} from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faGripHorizontal } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { v4 as uuid } from 'uuid';
import "../CSS/Dashboard_feed.css"
import { useCookies } from "react-cookie";
  


import saqib from "../images/avatar.png";
import usman from "../images/usman.jpeg";
import hamad from "../images/hamad.jpeg";

const QuoraBox = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const unique_id = uuid();
    const [cookies, setCookie] = useCookies();


  
    const [queryData, setQueryData] = useState({
      // UserID: JSON.parse(localStorage.getItem('Email')),
      // UserName: JSON.parse(localStorage.getItem('name')),
      UserID: cookies.Email,
      UserName: cookies.Name,
      PostID: uuid(),
      QueryCategory: "",
      QueryTitle: "",
      QueryDetails: "",
      QueryTags: "",
    });
  
    let name,value;
    const handleInput =(e) => {    
      name = e.target.name;
      value = e.target.value;
  
      setQueryData({...queryData, [name]: value});
  
    };
  
    const postData = async (e) => {
      
      e.preventDefault();
     
  
  
      const { UserID,UserName, PostID, QueryCategory, QueryTitle, QueryDetails, QueryTags } = queryData;
  
      const res = await fetch("/Question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          UserID,UserName,PostID,QueryCategory,QueryTitle,QueryDetails,QueryTags
        })
      });
  
      if(res.status === 400 || !res) {
        window.alert("Invalid Data.");
        console.log("Invalid Data");
      }
      else{
        window.alert("Successfully Posted");
        console.log("Successfully Posted");
        navigate("/dashboard");
  
      }
  
  
  
    };
  return (
    <Container className="Containerr">


    <div className="Quora_full border border-white border-1 rounded-end shadow-lg mb-2">
            <div className="profile-div mb-1">
             
            <div className="headerrr circular--portrait d-flex flex-row mt-1 mb-1">
                <img src={saqib} alt="logo"  className="user-imagee mb-1 mt-1 ms-1"/>
    
                <div className="searchh">
                <form>
                        <input 
                          type="text"
                          placeholder="What you want to Ask ?"
                          name="search"
                          className="ps-2 pe-2"
                        />{" "}
                      </form>
                      </div>
                      <Button variant="outline-secondary" onClick={handleShow} className='nav_btnnnn' >Add Query</Button>{' '}
                      <Modal size="lg" centered show={show} onHide={handleClose} className="Modall " >
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
           
            
          </div>
          </Container>
  )
}

export default QuoraBox