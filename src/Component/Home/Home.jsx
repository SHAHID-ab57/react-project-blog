import React, { useEffect } from 'react'
import { Container, Tab,Tabs,Row,Col } from 'react-bootstrap'
import Allblog from '../Allblog/Allblog'
import Advantage from '../Advantage/Advantage'
import Disadvantage from '../Disadvantage/Disadvantage'
import Sidebar from '../SideBarforHome/Sidebar'
import { useNavigate } from 'react-router-dom'
import Others from '../Others/Others'
import DoctorAdv from '../DoctorAdv/DoctorAdv'


const Home = () => {
  let navigate = useNavigate()

  return (
   <>
   <Tabs
      defaultActiveKey="All"
      id="fill-tab-example"
      className="mb-5 "
      fill
      style={{fontSize:"18px" }}
      // onSelect={(key)=>{
      //   if(key=="Advantage"){
      //     navigate("/advantage")
      //   }
      // }}
    >
      <Tab eventKey="All" title="All">
        
        <Container fluid> 
         <Row>
         <Col md={8}>
         <Allblog/>
         </Col>
         <Col md={3} >
          <Sidebar/>
         </Col>

         </Row>

        </Container>
      </Tab>
      <Tab eventKey="Advantage" title="Advantage">
      <Container fluid>
         <Row>
         <Col md={8}>
         <Advantage/>
         </Col>
         <Col md={3}>
         <Sidebar/>
         </Col>

         </Row>

        </Container>
      </Tab>
      <Tab eventKey="Disadvantage" title="Disadvantage">
      <Container fluid>
         <Row>
         <Col md={8}>
         <Disadvantage/>
         </Col>
         <Col md={3}>
         <Sidebar/>
         </Col>

         </Row>

        </Container>
      </Tab>
      <Tab eventKey="Doctors" title="What Doctor say" >
      <Container fluid>
         <Row>
         <Col md={8}>
         <DoctorAdv/>
         </Col>
         <Col md={3}>
         <Sidebar/>
         </Col>

         </Row>

        </Container>
      </Tab>
      <Tab eventKey="others" title="Others" >
      <Container fluid>
         <Row>
         <Col md={8}>
         <Others/>
         </Col>
         <Col md={3}>
         <Sidebar/>
         </Col>

         </Row>

        </Container>
      </Tab>
    </Tabs>
   </>
      
  )
}

export default Home
