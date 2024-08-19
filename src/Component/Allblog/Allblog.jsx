import React, { useEffect, useState } from "react";
// import { api_url, endpoints } from "../../Api/Api";
// import axios from "axios";
import { Container, Row, Col, Card, Button, Pagination } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
// import Sidebar from "../SideBarforHome/Sidebar";
// import Home from "../Home/Home";
import StarPrinting from "../CommentRating/StarPrinting";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, fetchReviews } from "../../StorageRedux/BlogSlice";
import { calculateBlogsReview } from "../SortFunctionality/SortBlogs";

const Allblog = () => {

  let dateParse = (date)=>{
let [day,month,year]=date.split("/")
return new Date(`${year}-${month}-${day}`)

  }
  const dispatch = useDispatch()

  const {blogs,reviews,sortBy,status}= useSelector((state)=>state.blogs)
  
  // let [allblogs, setAllblogs] = useState([]);
  let [currentPage,setcurrentPage]=useState(1)
  let blogperpage = 4;
  useEffect(() => {
    if (status==="idle"){
      dispatch(fetchBlogs())
      dispatch(fetchReviews())
    }
  }, [dispatch,status]);

// console.log("All Blogs",blogs);
console.log("Reviews",reviews);

let sortedBlogs = calculateBlogsReview(blogs,reviews)
// console.log( "Blogs and reviews Marge Here",sortedBlogs);

if (sortBy.field ==="reviews"){
  sortedBlogs.sort ((a,b)=>sortBy.direction==="asc" ?a.averageRating-b.averageRating:b.averageRating-a.averageRating)
}else if(sortBy.field==="date"){
  sortedBlogs.sort((a,b)=>{
    let firstTime = dateParse(a.time)
    let secondTime = dateParse (b.time)

    console.log('Time',firstTime,secondTime);
     return sortBy.direction==='asc'? firstTime-secondTime:secondTime-firstTime
  })
}

console.log("Blogs After sorted" ,sortedBlogs);
  

  let indexofLastBlog = currentPage * blogperpage;
 let indexofFirstBlog = indexofLastBlog-blogperpage;

 let currentBlog = sortedBlogs.slice(indexofFirstBlog,indexofLastBlog);

 let totalPage = Math.ceil(sortedBlogs.length/blogperpage)

 let pageHandler = (num)=>{
  setcurrentPage(num)
 }

  // console.log(totalPage)

  
  return (
    <>
    
      <Container className="mt-0" >
        {/* <Home/> */}
        <Row>
          {currentBlog?.map((value, index) => (
            <Col key={index} md={4} className="m-5 mt-2 h-100">
              <Card style={{ width: "25rem", border:"none", height:"100%"}}>
                
                <img
                  src={value.imageBlog}
                  alt=""
                  className=" d-block  mt-1 "
                  
                />
                <Card.Body>
                  <Card.Title>{value.header}</Card.Title>
                  <Card.Text>{value.short_des.slice(0,178)} .....
                    </Card.Text>
                    <p style={{fontSize:"14px", marginTop:"15px",color:"grey"}}>
                     By : {value.authorName
                      } <br />
                      {value.time}
                    </p>
                    <Card.Text>
                    <StarPrinting blogids = {value.id}/>
                    </Card.Text>
                    
                  <Button variant="primary" as={Link} to={`detailspage/${value.id}`}>Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="d-flex justify-content-center" style={{paddingLeft:"500px"}}>
        <Pagination className="text-center">
        <Pagination.First onClick={()=>pageHandler(1)} disabled={currentPage===1}/>
          <Pagination.Prev
          onClick={()=>pageHandler(currentPage-1)} disabled={currentPage===1}/>
         {
          [...Array(totalPage).keys()].map(number=>(
            <Pagination.Item key={number+1} active={number+1===currentPage} onClick={()=>pageHandler(number+1)}>
          {number+1}
            </Pagination.Item>
          ))
         }
         <Pagination.Next onClick={()=>pageHandler(currentPage+1)} disabled={currentPage===totalPage}/>
          <Pagination.Last onClick={()=>pageHandler(totalPage)} disabled={currentPage===totalPage}/>

        </Pagination>
        </div>
      </Container>
    </>
  );
};

export default Allblog;
