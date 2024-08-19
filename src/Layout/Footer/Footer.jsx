import React,{useState} from 'react'
import { Col, Container, Row,Figure,Nav,Form,Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FaFacebook ,FaInstagram,FaInstagramSquare,FaDiscord } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import "./footer.css"

const Footer = () => {
    let navigate = useNavigate()
    let [searchvalue, setsearchvalue] = useState("");
  let onchangeHandler = (e) => {
    setsearchvalue(e.target.value);
};
let onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log("Search Text", searchvalue);
    navigate(`/searchblogs/${searchvalue}`);
  };

  return (
    <div style={{height:"auto", width:"100%", backgroundColor:"#639eb0", marginTop:"30px"}}>
        <Container>
      <Row>
        <Col md={4} className="d-flex justify-content-center">
        <Figure.Image
        width={150}
        height={150}
        alt="Loading..."
        src="/asset/Designer2.png"
        className='mt-5 '
      />

        </Col>

        <Col md={4}>
        
        <Nav className='m-4 text-center' style={{flexDirection:"column",fontSize:"18px" }}>
<Nav.Link id='footerText'  as={Link} to="">
                Home
              </Nav.Link>
              <Nav.Link id='footerText' as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link id='footerText' as={Link} to="/dmca">
                DMCA
              </Nav.Link>
              <Nav.Link id='footerText' as={Link} to="/createblog">
                Write Blog
              </Nav.Link>
              </Nav>
        </Col>
        <Col className="d-flex justify-content-center" md={4} style={{flexDirection:'column'}}>
        <Form onSubmit={onSubmitHandler} className='m-3'>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Author or Topic"
                  className=" mr-sm-2 mb-3"
                  onChange={onchangeHandler}
                />
              </Col>
              <Col xs="auto">
                <Button variant="outline-light" type='submit'>Search</Button>
              </Col>
            </Row>
          </Form>
           <div className='m-1'>
            <span className='m-4'><Link to="http://www.facebook.com"><FaFacebook style={{height:"30px", width:"30px", color:'blue'}} /></Link></span> 
            <span className='m-4'><Link to=""><FaInstagramSquare  style={{height:"30px", width:"30px", color: "#d62976"}} /></Link></span> 
            <span className='m-4'><Link to=""><BsTwitterX style={{height:"30px", width:"30px", color:'black'}} /></Link></span> 
            <span className='m-4'><Link to=""><FaDiscord style={{height:"35px", width:"35px", color:'#5865F2'}} /></Link></span> 
             </div>
        </Col>
      </Row>
      <hr />
      <Row >
        <p className='text-center'>Copyright © { new Date().getFullYear()} NapCare. All Rights Reserved. Built with React.</p> 
      </Row>
      </Container>
    </div>
  )
}

export default Footer
