import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { api_url, endpoints } from "../../Api/Api";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ChangePassword = () => {
    let navigate=useNavigate()
  let { changeid } = useParams();
  console.log(changeid);
  let [changepassword, setChangePassword] = useState({
    email: "",
    password: "",
  });
  let [blogDetailsCh, setblogDetailsCh] = useState();
  let api_link = api_url + endpoints.userdetails + `/${changeid}`;
  let getApi = () => {
    axios
      .get(api_link)
      .then((res) => {
        setblogDetailsCh(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    getApi();
  }, []);

  console.log("Field one", changepassword);
  console.log("Object one", blogDetailsCh);

  let onSubmitHandler = (e) => {
    e.preventDefault();

    let checkedValue = blogDetailsCh?.email === changepassword?.email;
    console.log(checkedValue);
    if (checkedValue) {

        let userData = {
           "id":blogDetailsCh?.id,
           "firstName":blogDetailsCh?.firstName,
           "lastName":blogDetailsCh?.lastName,
           "email":blogDetailsCh?.email,
           "password":changepassword?.password
        }
      axios
        .put(api_link,userData )
        .then((res) => {
          console.log(res);
          navigate("/")
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.error("User Email does no matched");
    }
  };
  return (
    <>
      <Container className="d-flex justify-content-center ">
        <Form
          className="w-50 p-5 mb-2"
          style={{ boxShadow: "5px 5px 15px 5px gray", borderRadius: "15px" }}
          onSubmit={onSubmitHandler}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={(e) => setChangePassword({...changepassword,email:e.target.value})}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setChangePassword({...changepassword,password:e.target.value})}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default ChangePassword;
