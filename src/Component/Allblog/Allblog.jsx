import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarPrinting from "../CommentRating/StarPrinting";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, fetchReviews } from "../../StorageRedux/BlogSlice";
import { calculateBlogsReview } from "../SortFunctionality/SortBlogs";
import "./Allblog.css"; 

const Allblog = () => {
  const dispatch = useDispatch();

  const { blogs, reviews, sortBy, status } = useSelector((state) => state.blogs);

  const [currentPage, setCurrentPage] = useState(1);
  const blogPerPage = 4;

  const dateParse = (date) => {
    const [day, month, year] = date.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
      dispatch(fetchReviews());
    }
  }, [dispatch, status]);

  let sortedBlogs = calculateBlogsReview(blogs, reviews);

  if (sortBy.field === "reviews") {
    sortedBlogs.sort((a, b) =>
      sortBy.direction === "asc" ? a.averageRating - b.averageRating : b.averageRating - a.averageRating
    );
  } else if (sortBy.field === "date") {
    sortedBlogs.sort((a, b) => {
      const firstTime = dateParse(a.time);
      const secondTime = dateParse(b.time);
      return sortBy.direction === "asc" ? firstTime - secondTime : secondTime - firstTime;
    });
  }

  const indexOfLastBlog = currentPage * blogPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogPerPage;
  const currentBlog = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPage = Math.ceil(sortedBlogs.length / blogPerPage);

  const pageHandler = (num) => {
    setCurrentPage(num);
  };

  return (
    <Container className="mt-5 allblog-container">
      <Row className="gy-4">
        {currentBlog.map((value, index) => (
          <Col key={index} md={6} lg={4}>
            <Card className="blog-card h-100">
              <Card.Img
                variant="top"
                src={value.imageBlog}
                alt={value.header}
                className="blog-card-img"
              />
              <Card.Body>
                <Card.Title className="blog-card-title">{value.header}</Card.Title>
                <Card.Text className="blog-card-text">
                  {value.short_des.slice(0, 178)} .....
                </Card.Text>
                <p className="blog-card-meta">
                  By: {value.authorName}
                  <br />
                  {value.time}
                </p>
                <StarPrinting blogids={value.id} />
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
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.First onClick={() => pageHandler(1)} disabled={currentPage === 1} />
          <Pagination.Prev
            onClick={() => pageHandler(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPage).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => pageHandler(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => pageHandler(currentPage + 1)}
            disabled={currentPage === totalPage}
          />
          <Pagination.Last
            onClick={() => pageHandler(totalPage)}
            disabled={currentPage === totalPage}
          />
        </Pagination>
      </div>
    </Container>
  );
};

export default Allblog;
