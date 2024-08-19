import React, { useEffect } from "react";
import { Col, Row, ListGroup,Card } from "react-bootstrap";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import { api_url, endpoints } from "../../Api/Api";
import axios from "axios";
import { FaCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";

const DashBoard = ({ setShowDashBoard, showDashBoard }) => {
  let navigate = useNavigate();
  const handleClose = () => setShowDashBoard(false) || navigate("/");
  let api_link = api_url + endpoints.userdetails;
  let api_link_blog = api_url+endpoints.blogdetails
  let api_link_comment = api_url + endpoints.reviews;
  let [profileData, setprofileData] = useState([]);
  let [commentDetails, setCommentDetails] = useState([]);
  let [blogDetails, setblogDetails] = useState([]);

  let getApi = () => {
    axios
      .get(api_link)
      .then((res) => {
        //  console.log(res.data);
        setprofileData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  let getCommentApi = () => {
    axios
      .get(api_link_comment)
      .then((res) => {
        setCommentDetails(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  let apiApiblog = ()=>{
    axios.get(api_link_blog)
    .then(res=>{
      setblogDetails(res.data)
    }).catch((err)=>{
console.error(err);
    })
  }
  useEffect(() => {
    getCommentApi();
    apiApiblog()
    getApi();
  }, [setprofileData,setCommentDetails,setblogDetails]);
  let emailID = sessionStorage.getItem("emailid");
  // console.log(emailID);

  let filterSingleUserProfile = profileData?.find(
    (item) => item.email === emailID
  );

  // console.log("Profile",profileData);
  // console.log("Single User",filterSingleUserProfile?.password.length);

  let passWordStars = [];
  let passwordLength = filterSingleUserProfile?.password.length;
  for (let i = 0; i < passwordLength; i++) {
    passWordStars.push("*");
  }
  // console.log(passWordStars);
  // console.log("Comment",commentDetails);
  // console.log("Blog",blogDetails);  

  let filterCommentbyUser = commentDetails?.filter(
    (value) => value.username === filterSingleUserProfile?.firstName
  );

  console.log(filterCommentbyUser);

  let onLogoutHandler = () => {
    sessionStorage.clear();
    navigate("/");
  };
  let changePasswordHandler=()=>setShowDashBoard(false)

  return (
    <>
      <Offcanvas show={showDashBoard} onHide={handleClose} placement={"end"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>User Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <h2 className="mx-3">Welcome! {filterSingleUserProfile?.firstName}</h2>
        <Offcanvas.Body>
          <ListGroup as="ul">
            <ListGroup.Item as="li" active>
              First Name : {filterSingleUserProfile?.firstName}
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Last Name : {filterSingleUserProfile?.lastName}
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Email Address : {filterSingleUserProfile?.email}
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Password : {<span>{passWordStars}</span>}
            </ListGroup.Item>
          </ListGroup>

          <Button variant="primary" className="mt-5" as={Link} to={`changepassword/${filterSingleUserProfile?.id}`} onClick={changePasswordHandler} >
            Change Password
          </Button>
          <Button
            variant="primary"
            className="mt-3 d-block"
            onClick={onLogoutHandler}
          >
            Logout
          </Button>

          <mark
            style={{ display: "block", marginTop: "50px", fontSize: "25px" }}
          >
            User Comments
          </mark>

          {
            filterCommentbyUser?.map((value)=>(
<Card className='mt-5' key={value.id}>
      <Card.Header>Comment No : {value.id}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {' '}
            <FaCommentDots/> {value.comment} 
            {' '}
          </p>
          <footer className="blockquote-footer">
            From  : <cite title="Source Title">{blogDetails?.map((item)=>(
              item.id=== value.blogid?item.header:null
            ))}</cite>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
            ))
          }
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default DashBoard;
