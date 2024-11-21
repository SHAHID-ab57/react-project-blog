import React, { useEffect, useState } from "react";
import { api_url, endpoints } from "../../Api/Api";
import axios from "axios";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Advantage.css"; 
const Advantage = () => {
  const api_link = api_url + endpoints.blogdetails;
  const [advantageBlog, setAdvantageBlog] = useState([]);

  const getApi = () => {
    axios
      .get(api_link)
      .then((res) => {
        setAdvantageBlog(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  const filteredAdvantage = advantageBlog?.filter(
    (value) => value.tags.toLowerCase() === "advantage"
  );

  return (
    <Container className="mt-4 advantage-container">
      <Row className="gy-4">
        {filteredAdvantage?.map((value, index) => (
          <Col key={index} md={6} lg={4}>
            <Card className="advantage-card h-100">
              <Card.Img
                variant="top"
                src={value.imageBlog}
                alt={value.header}
                className="advantage-card-img"
              />
              <Card.Body>
                <Card.Title className="advantage-card-title">
                  {value.header}
                </Card.Title>
                <Card.Text className="advantage-card-text">
                  {value.short_des.slice(0, 178)}.....
                </Card.Text>
                <p className="advantage-card-meta">
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

export default Advantage;
