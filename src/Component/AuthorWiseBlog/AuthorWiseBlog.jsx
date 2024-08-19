import React, { useEffect, useState } from "react";
import { api_url, endpoints } from "../../Api/Api";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../SideBarforHome/Sidebar";
import Home from "../Home/Home";
import StarPrinting from "../CommentRating/StarPrinting";

const AuthorWiseBlog = () => {
  let {authName}=useParams()
  let api_link = api_url + endpoints.blogdetails;
  console.log(authName,"AuthName");
  let [allblogs, setAllblogs] = useState([]);

  let getApi = () => {
    axios
      .get(api_link)
      .then((res) => {
        // console.log(res.data);
        setAllblogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getApi();
  }, []);

  let filterAuthorData = allblogs?.filter((value)=>value.authorName.toLowerCase()===authName.toLowerCase())
 console.log(filterAuthorData);
  
  return (
    <>
      <Container className="mt-0" >
        {/* <Home/> */}
        <Row>
          {filterAuthorData?.map((value, index) => (
            <Col key={index} md={3} className="m-5 mt-2 h-100">
              <Card style={{ width: "25rem", border:"none", height:"100%"}}>
                
                <img
                  src={value.imageBlog}
                  alt=""
                  className=" d-block  mt-1"
                  
                />
                <Card.Body>
                  <Card.Title>{value.header}</Card.Title>
                  <Card.Text>{value.short_des}
                    <p style={{fontSize:"14px", marginTop:"15px",color:"grey"}}>
                     By : {value.authorName
                      } <br />
                      {value.time}
                    </p>

                    <StarPrinting blogids = {value.id}/>
                  </Card.Text>

                  <Button variant="primary" as={Link} to={`/detailspage/${value.id}`}>Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {/* <Sidebar/> */}
      </Container>
    </>
  );
};

export default AuthorWiseBlog;
