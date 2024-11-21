import React, { useEffect, useState } from "react";
import { api_url, endpoints } from "../../Api/Api";
import axios from "axios";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Disadvantage.css";

const Disadvantage = () => {
  const api_link = api_url + endpoints.blogdetails;
  const [disadvantageBlog, setDisadvantageBlog] = useState([]);

  const getApi = () => {
    axios
      .get(api_link)
      .then((res) => {
        setDisadvantageBlog(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  const filteredDisadvantage = disadvantageBlog?.filter(
    (value) => value.tags.toLowerCase() === "disadvantage"
  );

  return (
    <Container className="mt-4 disadvantage-container">
      <Row className="gy-4">
        {filteredDisadvantage?.map((value, index) => (
          <Col key={index} md={6} lg={4}>
            <Card className="disadvantage-card h-100">
              <Card.Img
                variant="top"
                src={value.imageBlog}
                alt={value.header}
                className="disadvantage-card-img"
              />
              <Card.Body>
                <Card.Title className="disadvantage-card-title">
                  {value.header}
                </Card.Title>
                <Card.Text className="disadvantage-card-text">
                  {value.short_des.slice(0, 178)}.....
                </Card.Text>
                <p className="disadvantage-card-meta">
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

export default Disadvantage;
