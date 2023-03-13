import "../CSS/Dashboard_Header.css";
import searc from "../images/searc.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import {
  Carousel,
  Container,
  Row,
  Col,
  Button,
  Nav,
  NavDropdown,
  Navbar,
  Figure,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { userContext } from "../App";

import AU from "../images/dashboard_web_logo.png";
import saqib from "../images/avatar.png";
import * as Icon from "react-bootstrap-icons";
import { useCookies } from "react-cookie";


const Dashboard_Header = () => {
  const { state, dispatch } = useContext(userContext);
    const [cookies, setCookie] = useCookies();

  // const name=JSON.parse(localStorage.getItem('name'));
    const name= cookies.Name;

  const Navigate = useNavigate();
  return (
    <Container>
      <div className="navbar_body">
        <Navbar id="large_screen_navbar" className="shadow" expand="lg">
          <Container className="d-flex align-items-center justify-content-center">
            <div class="header">
              <img src={AU} alt="logo" />
              <h3>AU Discussion Forum</h3>
            </div>

            {/* <div>

       
       <Figure >
          <Figure.Image
           width={60}
           height={60}
           alt="logo"
           src={AU} />
        </Figure>
      <h6 id="web_name_heading">  
          
        Discussion Forum</h6>
        
        </div> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {/* <RenderMenu /> */}
            <Navbar.Collapse class="navbar">
              <Nav className=" ms-auto gap-1">
                <div class="search">
                  <form>
                    <input
                      type="text"
                      placeholder="  Click here to Search"
                      name="search"
                      className="inp"
                    />{" "}
                  </form>
                </div>
                <img src={searc} className="search_img"></img>

                <Nav.Link
                  id="nav_itemm"
                  href="#link"
                  onClick={() => Navigate("/comment")}
                >
                  {name}
                </Nav.Link>
                <div className="headerrr circular--portrait d-inline-block mt-1 mb-1">
                  <img
                    src={saqib}
                    alt="logo"
                    className="user-imagee mb-1 mt-1 ms-1"
                  />
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>



        {/* display 2nd navbar for mobile and tablet screen */}

        <Navbar className="small_screen_navbar" bg="light" expand="lg">
      <Container fluid>
<Navbar.Brand href="#home"><div class="header">
  <img src={AU} alt="logo" />
  <h3>AU Discussion Forum</h3>
</div></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
        <Nav  className=" ms-auto gap-1">
          <Nav.Link id="nav_item"  onClick={() => Navigate("/")} >Home</Nav.Link>

          <Nav.Link id="nav_item"  onClick={() => Navigate("/OwnProfile")}  >UserProfile</Nav.Link>

          {/* <NavDropdown id="nav_item"  title="Dropdown">
            <NavDropdown.Item id="nav_item" href="#action/3.1" >Action</NavDropdown.Item>
            <NavDropdown.Item  id="nav_item" href="#action/3.2" >
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item id="nav_item" href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item id="nav_item" href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}

          <Nav.Link id="nav_item"  onClick={() => Navigate("/Contact")} >Feedback</Nav.Link>
          {/* <Nav.Link id="nav_item" href="#link" onClick={() => Navigate("/feedback")}>Feedback</Nav.Link> */}
          <Nav.Link id="nav_item" onClick={() => Navigate("/login")}>Search</Nav.Link>
          <Nav.Link id="nav_item" onClick={() => Navigate("/login")}>About Us</Nav.Link>
          <Nav.Link id="nav_item" onClick={() => Navigate("/login")}>Setting</Nav.Link>

          <Button variant="outline-secondary"  className='nav_btnn ms-4' onClick={() => Navigate("/signup")} >Logout</Button>{' '}

        </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
      </div>
    </Container>
  );
};

export default Dashboard_Header;
