import React, { useState } from "react";
import "./header.css";
import {
  Navbar,
  Nav,
  Container,
  Form,
  Row,
  Col,
  Button,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UserRegestration from "../../Component/UserRegistration/UserRegestration";
import UserLogin from "../../Component/UserLogin/UserLogin";
import { FaSun, FaMoon } from "react-icons/fa";
import DashBoard from "../../Component/DashBoard/DashBoard";
import { useDispatch } from "react-redux";
import { sortBlogsBy } from "../../StorageRedux/BlogSlice";

const Header = ({ isDarkMode, DarkButtonHandler }) => {
  // console.log("isDarkMode",isDarkMode,"And Function",DarkButtonHandler);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [show, setShow] = useState(false);
  let handleregistrationShow = () => setShow(true);
  const [userlog, setUserlog] = React.useState(false);
  let handlelogin = () => setUserlog(true);
  const [showDashBoard, setShowDashBoard] = useState(false);
  const handleDashBoard = () =>
    setShowDashBoard(true) || navigate("/userdashboard");
  let [searchvalue, setsearchvalue] = useState("");
  let onchangeHandler = (e) => {
    setsearchvalue(e.target.value);
  };
  let onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log("Search Text", searchvalue);
    navigate(`/searchblogs/${searchvalue}`);
    setsearchvalue("")
  };

  let userName = sessionStorage.getItem("userName");
  // console.log(userName);
  // let onLogoutHandler = ()=>{
  //   sessionStorage.clear()
  //   navigate('/')
  // }

  // let sortHandler = (field, direction) => {
  //   dispatch(sortBlogsBy(field, direction));
  // };

  return (
    <>
      <Navbar
        expand="lg"
        className=""
        style={{
          backgroundColor: "#639eb0",
          color: "black",
          fontSize: "18px",
          margin: "0px",
        }}
      >
        <Container>
          {/* <Navbar.Brand as={Link} to=""  ><span><img src="/asset/Designer2.png" className='d-block ' style={{width:"50px"}} alt="" /></span></Navbar.Brand> */}
          <img
            src="/asset/Designer2.png"
            alt=""
            className=""
            style={{ height: "5%", width: "5%" }}
          />

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ">
              <Nav.Link id="headerText_color" as={Link} to="">
                Home
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/userregistration"
                onClick={handleregistrationShow}
                id="headerText_color"
              >
                Sign Up
              </Nav.Link>
              <UserRegestration
                show={show}
                setShow={setShow}
                setUserlog={setUserlog}
              />
              <Nav.Link
                as={Link}
                to="/userloging"
                onClick={handlelogin}
                id="headerText_color"
              >
                Sign In
              </Nav.Link>
              <UserLogin
                userlog={userlog}
                setUserlog={setUserlog}
                setShow={setShow}
              />

              <Nav.Link as={Link} to="/createblog" id="headerText_color">
                Write Blog
              </Nav.Link>
            </Nav>
            <Dropdown as={ButtonGroup}>
              <Button
                variant="info"
                style={{ color: "white", backgroundColor: "#639eb0" }}
                onClick={() => dispatch(sortBlogsBy({ field: 'reviews', direction: 'asc' }))}
              >
                Filter
              </Button>

              <Dropdown.Toggle
                split
                variant="info"
                style={{ color: "white", backgroundColor: "#639eb0" }}
                id="dropdown-split-basic"
              />

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => dispatch(sortBlogsBy({ field: 'reviews', direction: 'asc' }))}>
                  Reviews asc
                </Dropdown.Item>
                <Dropdown.Item onClick={() => dispatch(sortBlogsBy({ field: 'reviews', direction: 'desc' }))}>
                  Reviews Desc
                </Dropdown.Item>
                <Dropdown.Item onClick={() => dispatch(sortBlogsBy({ field: 'date', direction: 'asc' }))}>
                  Date asc
                </Dropdown.Item>
                <Dropdown.Item onClick={() =>  dispatch(sortBlogsBy({ field: 'date', direction: 'desc' }))}>
                  Date Desc
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button
              variant="outline-light"
              className="m-4"
              onClick={DarkButtonHandler}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </Button>
          </Navbar.Collapse>

          <Form onSubmit={onSubmitHandler}>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Author or Topic"
                  className=" mr-sm-2"
                  value={searchvalue}
                  onChange={onchangeHandler}
                />
              </Col>
              <Col xs="auto">
                <Button variant="outline-light" type="submit">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
          {userName ? (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="text-white ">
                <Button variant="outline-light" onClick={handleDashBoard}>
                  Welcome! {userName}
                </Button>
              </Navbar.Text>
              <DashBoard
                showDashBoard={showDashBoard}
                setShowDashBoard={setShowDashBoard}
              />
            </Navbar.Collapse>
          ) : null}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
