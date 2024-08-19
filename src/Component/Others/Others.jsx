import React, { useEffect, useState } from 'react'
import { api_url, endpoints } from '../../Api/Api'
import axios from 'axios'
import { Container,Col,Row,Card,Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Others = () => {
    let api_link = api_url+endpoints.blogdetails
    // console.log(api_link);
    let [advantageblog,setadvantageblog]=useState()
    
    let getApi = ()=>{
        axios.get(api_link)
        .then(res=>{
            // console.log(res.data[0].tags);
                setadvantageblog(res.data)
            
        })
        .catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
    getApi()
    },[])
    
    let filteradvantage = advantageblog?.filter((value)=> value.tags.toLowerCase()!== "advantage" && value.tags.toLowerCase()!== "disadvantage")
    
    // console.log("Filtered data",filteradvantage);
    // console.log("Adv data",advantageblog);
      return (
        <>
          <Container className="mt-0">
            <Row>
              {filteradvantage?.map((value, index) => (
                <Col key={index} md={4} className="m-5 mt-2 ">
                  <Card style={{ width: "25rem", border:"none"}} >
                    
                    <img
                      src={value.imageBlog}
                      alt=""
                      className=" d-block  mt-1"
                      
                    />
                    <Card.Body>
                      <Card.Title>{value.header}</Card.Title>
                      <Card.Text>{value.short_des.slice(0,178)}....
                          </Card.Text>
                        <p style={{fontSize:"14px", marginTop:"15px",color:"grey"}}>
                         By : {value.authorName
                          } <br />
                          {value.time}
                        </p>
    
                      <Button variant="primary" as={Link} to={`detailspage/${value.id}`}>Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </>
  )
}

export default Others
