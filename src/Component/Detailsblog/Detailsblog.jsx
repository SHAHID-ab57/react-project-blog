import React, { useEffect, useState } from "react";
import { api_url, endpoints } from "../../Api/Api";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
import { Container, Card, Button ,Row,Col} from "react-bootstrap";
import Comment from "../CommentRating/Comment";
import StarPrinting from "../CommentRating/StarPrinting";

const Detailsblog = () => {
  let { userid } = useParams();
  let api_link = api_url + endpoints.blogdetails + `/${userid}`;
 let api_link_sort = api_url+endpoints.blogdetails
  let [blogdetails, setblogdetails] = useState();
  let [fullblogdata,setfullblogdata]= useState()
  let getApi = () => {
    axios
      .get(api_link)
      .then((res) => {
        // console.log(res);
        setblogdetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let getApiSort = ()=>{
    axios.get(api_link_sort)
    .then(res=>{
    //  console.log(res);
     setfullblogdata(res.data)
    }).catch(err=>{
        console.error(err);
    })
  }
  useEffect(() => {
    getApi();
    getApiSort()
  }, [userid]);

  // console.log("Details page", fullblogdata, blogdetails);

  let fillterData = fullblogdata?.filter(value=>value.tags===blogdetails?.tags&& value.id!==blogdetails?.id)
//  console.log(fillterData);
  return (
    <>
      <Container className="mt-5">
        <Card style={{ width: "auto", border: "none", height:"100%"}}>
          <Card.Img
            variant="top"
            src={blogdetails?.imageBlog}
            className="d-block w-auto "
            style={{height:"30%"}}
          />
          <Card.Body>
            <Card.Title>
              <h2>{blogdetails?.header}</h2>
            </Card.Title>
            <Card.Text>
            {/* <StarPrinting blogids={blogdetails?.id}/> */}
              <p style={{ color: "gray", fontSize: "15px" }}>
                <span>{blogdetails?.authorName}</span> <br />
                <span>{blogdetails?.time}</span>
              </p>
              <p className="mt-3" style={{ textAlign: "justify" }}>
                {blogdetails?.description}
              </p>
              <p> Catagory : {blogdetails?.tags}</p>
            </Card.Text>
          </Card.Body>
        </Card>
        <Row className="mt-5">
            <h3 className="text-center">Similar Blogs</h3>
         {fillterData?.map((value,index)=>(
            <Col md={4} key={index} className="mt-3">
            <Card style={{ width: '18rem', border:"none" }}>
        <Card.Img variant="top" src={value.imageBlog} className="d-block w-100 " />
        <Card.Body>
          <Card.Title>{value.header}</Card.Title>
          <Card.Text>
            <p style={{color:"gray"}}>
                <span>{value.authorName}</span>
            </p>

            <StarPrinting blogids={value.id}/>
          </Card.Text>
          <Button variant="primary" as={Link} to={`/detailspage/${value.id}`}>Details</Button>
        </Card.Body>
      </Card>
            </Col>
         ))}
          
        </Row>
        <Comment blogId={blogdetails?.id}/>
      </Container>
    </>
  );
};

export default Detailsblog;
