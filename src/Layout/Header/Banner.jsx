import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Banner = () => {
  return (
    <>
    <Container className=' text-center mb-3'>
    <Row>
<Col md={6} className='mt-5'>
<h2 className='mb-2 '>NapCare</h2>
<h5 className='mb-3'>Because Every Nap Matters</h5>
<p style={{textAlign:"justify"}}>Welcome to NapCare, your ultimate destination for everything related to restful sleep and rejuvenating naps. Here, we delve into the science and art of sleep, offering expert tips, insightful articles, and practical advice to help you achieve the perfect slumber. Whether you're looking to improve your nightly sleep routine or discover the benefits of a power nap, NapCare is here to guide you every step of the way. Embrace the power of rest with us and wake up to a healthier, more energized you.</p>

 <Link to="/about" className='btn btn-info'>
  Read more
 </Link>

</Col>

<Col md={5} className='mt-5'><img src='/asset/Designer.png' alt="" className='h-75 w-75 '/></Col>

    </Row>
    </Container>
    </>
  )
}

export default Banner
