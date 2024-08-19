import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { api_url, endpoints } from "../../Api/Api";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const UserRegestration = ({ show, setShow,setUserlog }) => {
  let api_link = api_url + endpoints.userdetails;
  let navigate = useNavigate();
  // console.log(api_link);
  
  let [userRegis, setUserRegis] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const passwordPatten = RegExp(
    "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{4,12}$"
  );
  const gmailPatten = RegExp("^([a-z0-9.-]+)@([a-z]{5,12}).([a-z.]{2,20})$");
  let [userdetails, setuserdetails] = useState();
  let [errorData, setErrorData] = useState({
    errorMessage: "",
    successMessage: "",
  });

  const handleClose = () => setShow(false) || navigate("/") || setErrorData("")

  let getDetails = () => {
    axios
      .get(api_link)
      .then((res) => {
        // console.log(res.data);
        setuserdetails(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    getDetails();
  }, []);

  let onValueChangeHandler = (e) => {
    let { name, value } = e.target;
    let err = userRegis.error;
    switch (name) {
      case "firstName":
        if (value.length < 1) {
          err.firstName = "Value Required";
        } else {
          err.firstName = "";
        }
        break;
      case "lastName":
        if (value.length < 1) {
          err.lastName = "Value Required";
        } else {
          err.lastName = "";
        }
        break;
      case "email":
        if (value.length < 1) {
          err.email = "Value Required";
        }
        else if(!gmailPatten.test(value)){
          err.email = "Wrong pattern";
        } else {
          err.email = "";
        }
        break;
      case "password":
        if (value.length < 1) {
          err.password = "Value Required";
        }
        else if(!passwordPatten.test(value)){
          err.password = "Wrong pattern";
        } else {
          err.password = "";
        }
        break;

      default:
        break;
    }
    setUserRegis({ ...userRegis, [e.target.name]: e.target.value,error:err });
  };

  let onSubmitHandler = (e) => {
    e.preventDefault();
    let matchingData = userdetails?.find(
      (value) => value.email.toLowerCase() === userRegis?.email.toLowerCase()
    );

    //  console.log(matchingData);
    if (matchingData) {
      setErrorData({
        ...errorData,
        errorMessage: "Existing email can not be used",
      });
    } else if(!matchingData){
      axios
        .post(api_link, userRegis)
        .then((res) => {
          console.log(res);
          setErrorData({
            ...errorData,
            successMessage: "Successfully created",
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }else{
      setErrorData({
        ...errorData,
        errorMessage: "",successMessage:""
      });
    }
  };

  let redirectTOLoginHandler=()=>{
    navigate("/userloging")
    setShow(false)
    setUserlog(true)
  }

  // console.log(userRegis);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registration</Modal.Title>
        </Modal.Header>
        {errorData?.errorMessage ? (
          <p className="text-danger text-center">{errorData?.errorMessage}</p>
        ) : null}
        {errorData?.successMessage ? (
          <p className="text-success text-center">
            {errorData?.successMessage}
          </p>
        ) : null}
        <Modal.Body>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlfirstName"
            >
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                autoFocus
                name="firstName"
                onChange={onValueChangeHandler}
              />
            </Form.Group>
            {userRegis?.error.firstName&&userRegis?.error.firstName.length>1?<p className="text-danger">{userRegis?.error.firstName}</p>:null}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControllastName"
            >
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                autoFocus
                name="lastName"
                onChange={onValueChangeHandler}
              />
            </Form.Group>
            {userRegis?.error.lastName&&userRegis?.error.lastName.length>1?<p className="text-danger">{userRegis?.error.lastName}</p>:null}
            <Form.Group className="mb-3" controlId="exampleForm.Controlemail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
                autoFocus
                name="email"
                onChange={onValueChangeHandler}
              />
            </Form.Group>
            {userRegis?.error.email&&userRegis?.error.email.length>1?<p className="text-danger">{userRegis?.error.email}</p>:null}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.Controlpassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                autoFocus
                name="password"
                onChange={onValueChangeHandler}
              />
            </Form.Group>
            {userRegis?.error.password&&userRegis?.error.password.length>1?<p className="text-danger">{userRegis?.error.password}</p>:null}
            <Button variant="secondary" onClick={handleClose} className="m-3">
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        Already Registered ? <Button variant="outline-info" onClick={redirectTOLoginHandler}>Log In</Button>

        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserRegestration;
