import React, { useEffect, useState } from 'react'
import { Form,Modal,Button } from 'react-bootstrap'
import { api_url, endpoints } from '../../Api/Api'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogin = ({userlog,setUserlog,setShow}) => {
  let navigate = useNavigate()
    
    // console.log(userlog);
    let api_link = api_url+endpoints.userdetails
    // console.log(api_link);
    let [logindata,setlogindata]=useState({
      email:'',
      password:'',
      error:{
        email:'',
      password:'',
      }
     
    })
    let [loginDetails,setloginDetails]=useState()
    let [errormessage,setErrorMessage]=useState()
    let handleClose = ()=>setUserlog(false) || navigate('/') || setErrorMessage("")
    let onChangeValueHandler = (e)=>{
      let err = logindata.error
      let {name,value}=e.target
      switch(name){
        case "email":
          if (value.length<1) {
            err.email="Enter Email"
          }else  err.email=""
          break;
        case "password":
          if (value.length<1) {
            err.password="Enter Password"
          }else  err.password=""
          break;
      }
        setlogindata({...logindata,[e.target.name]:e.target.value,error:err})
    }
    let getApi=()=>{
      axios.get(api_link)
      .then(res=>{
    //  console.log(res.data);
     setloginDetails(res.data)
      }).catch(err=>{
        console.error(err);
      })
    }
    useEffect(()=>{
      getApi()
    },[])
// console.log(errormessage)

let onSubmitHandler=(e)=>{
e.preventDefault()
 let findlogDetails = loginDetails?.find((value)=>{
 return value.email===logindata?.email 
})
// console.log(findlogDetails);

if(findlogDetails){
  sessionStorage.setItem("emailid",findlogDetails.email)
  sessionStorage.setItem("userName",findlogDetails.firstName)
  setUserlog(false)
  navigate('/')
  
}else if(!findlogDetails){
  setErrorMessage("User does not matched")
}
}

let onredirectRegisterHandler = ()=>{
  navigate("/userregistration")
  setUserlog(false)
  setShow(true)

}

// console.log(logindata);

  return (
    <>
    <Modal show={userlog} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
          {errormessage?<p className='text-danger text-center'>{errormessage}</p>:null}
        <Modal.Body>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                name='email'
                onChange={onChangeValueHandler}
              />
            </Form.Group>
            {logindata?.error.email&&logindata?.error.email.length>1?<p className='text-danger'>{logindata?.error.email}</p>:null}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                autoFocus
                name='password'
                onChange={onChangeValueHandler}
              />
            </Form.Group>
            {logindata?.error.password&&logindata?.error.password.length>1?<p className='text-danger'>{logindata?.error.password}</p>:null}
            <Button variant="secondary" onClick={handleClose} className='m-3'>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Save 
          </Button>
          </Form>
        </Modal.Body>
       <Modal.Footer>
        Not Register ? <Button variant='outline-info' onClick={onredirectRegisterHandler}>Register</Button>

       </Modal.Footer>
          
        
      </Modal>
    </>
  )
}

export default UserLogin
