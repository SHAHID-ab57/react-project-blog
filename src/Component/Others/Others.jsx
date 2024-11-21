import React, { useEffect, useState } from "react";
import { api_url, endpoints } from "../../Api/Api";
import axios from "axios";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Others.css";

const Others = () => {
  const api_link = api_url + endpoints.blogdetails;
  const [otherBlogs, setOtherBlogs] = useState([]);

  const getApi = () => {
    axios
      .get(api_link)
      .then((res) => {
        setOtherBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  const filteredOthers = otherBlogs?.filter(
    (value) =>
      value.tags.toLowerCase() !== "advantage" &&
      value.tags.toLowerCase() !== "disadvantage"
  );

  return (
    <Container className="mt-4 others-container">
      <Row className="gy-4">
        {filteredOthers?.map((value, index) => (
          <Col key={index} md={6} lg={4}>
            <Card className="others-card h-100">
              <Card.Img
                variant="top"
                src={value.imageBlog}
                alt={value.header}
                className="others-card-img"
              />
              <Card.Body>
                <Card.Title className="others-card-title">
                  {value.header}
                </Card.Title>
                <Card.Text className="others-card-text">
                  {value.short_des.slice(0, 178)}....
                </Card.Text>
                <p className="others-card-meta">
                  By: {value.authorName} <br />
                  {value.time}
                </p>
                <Button
                  variant="primary"
                  as={Link}
                  to={`detailspage/${value.id}`}
                  className="mt-3"
                >
                  Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Others;
