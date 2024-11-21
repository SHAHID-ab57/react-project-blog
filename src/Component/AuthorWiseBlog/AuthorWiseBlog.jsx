import React, { useEffect, useState } from "react";
import { api_url, endpoints } from "../../Api/Api";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import StarPrinting from "../CommentRating/StarPrinting";
import "./AuthorWiseBlog.css";

const AuthorWiseBlog = () => {
  const { authName } = useParams();
  const api_link = api_url + endpoints.blogdetails;
  const [allBlogs, setAllBlogs] = useState([]);

  const getApi = () => {
    axios
      .get(api_link)
      .then((res) => {
        setAllBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  const filterAuthorData = allBlogs?.filter(
    (value) => value.authorName.toLowerCase() === authName.toLowerCase()
  );

  return (
    <Container className="author-blog-container">
      <h2 className="text-center mb-4">
        Blogs by <span className="author-name">{authName}</span>
      </h2>
      <Row className="gy-4">
        {filterAuthorData?.map((value, index) => (
          <Col key={index} md={6} lg={4}>
            <Card className="author-blog-card h-100">
              <Card.Img
                variant="top"
                src={value.imageBlog}
                alt={value.header}
                className="author-blog-img"
              />
              <Card.Body>
                <Card.Title className="author-blog-title">
                  {value.header}
                </Card.Title>
                <Card.Text className="author-blog-text">
                  {value.short_des.slice(0, 150)}...
                </Card.Text>
                <p className="author-blog-meta">
                  By: {value.authorName} <br />
                  {value.time}
                </p>
                <StarPrinting blogids={value.id} />
                <Button
                  variant="primary"
                  as={Link}
                  to={`/detailspage/${value.id}`}
                  className="mt-3"
                >
                  Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {filterAuthorData?.length === 0 && (
        <p className="text-center mt-5">No blogs found for this author.</p>
      )}
    </Container>
  );
};

export default AuthorWiseBlog;
