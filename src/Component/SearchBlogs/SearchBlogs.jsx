import React, { useEffect, useRef, useState } from "react";
import { api_url, endpoints } from "../../Api/Api";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
// import Sidebar from "../SideBarforHome/Sidebar";
// import Home from "../Home/Home";
import StarPrinting from "../CommentRating/StarPrinting";

const SearchBlogs = () => {
  let {search}=useParams()
  let api_link = api_url + endpoints.blogdetails;
  console.log(search);
  let [allblogs, setAllblogs] = useState([]);
  let searchRef = useRef(null)
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

  useEffect(()=>{
    if(searchRef.current){
      searchRef.current.scrollIntoView({behavior:"smooth"})
    }
  },[])
  
  let searchFilter = allblogs?.filter((value)=>value.authorName.toLowerCase().includes( search?.toLowerCase().trim()) ||value.header.toLowerCase().includes( search?.toLowerCase().trim()))

  const highlightText = (text,highlight)=>{
    if(!highlight.trim()){
      return text;
    }
    const regex = new RegExp(`(${highlight})`,"gi");
    const parts = text.split(regex)
    return parts.map((part,index)=>
    part.toLowerCase()===highlight.toLowerCase()? (<mark style={{backgroundColor:"#639eb0"}} key={index}>{part}</mark>):(part)
    )
  }

// let blankArray = []
// let renderValue = searchFilter===blankArray?allblogs:searchFilter

//    console.log(" final output",renderValue);
  return (
    <>
      <Container className="mt-0" >
        
        <Row>
          {searchFilter?.map((value, index) => (
            <Col key={index} md={4} className="m-5 mt-2 h-100"
            ref={index===0?searchRef:null}
            >
              <Card style={{ width: "25rem", border:"none", height:"100%"}}>
                
                <img
                  src={value.imageBlog}
                  alt=""
                  className=" d-block  mt-1"
                  
                />
                <Card.Body>
                  <Card.Title>{highlightText(value.header,search)}</Card.Title>
                  <Card.Text>{value.short_des}
                    <p style={{fontSize:"14px", marginTop:"15px",color:"grey"}}>
                     By : {highlightText(value.authorName,search)
                      } <br />
                      {value.time}
                    </p>

                    <StarPrinting blogids = {value.id}/>
                  </Card.Text>

                  <Button variant="primary" as={Link} to={`detailspage/${value.id}`}>Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
      </Container>
    </>
  );
};

export default SearchBlogs;
