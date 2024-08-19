import React, { useState } from 'react'
import { Container,Form ,Button} from 'react-bootstrap'
import { api_url, endpoints } from '../../Api/Api'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const CreateBlog = () => {
let navigate = useNavigate()
  let api_link = api_url+endpoints.blogdetails
  // console.log(api_link);
  let [createblog,setcreateblog]=useState({
    author:"",
    header:"",
    short_des:"",
    blog:"",
    submit_year:0,
    tags:""
  })
  let [imageblog,setimageblog]=useState("")

  let valueHandler = (e)=>{
    setcreateblog({...createblog,[e.target.name]:e.target.value})
  }

  let imageHandler = (e)=>{
    setimageblog(e.target.files[0])
  }

  // let convertToBase64 = async(file) => {
  //   // return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () =>  resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   // });
  // };

  let formatDate = (date) => {
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  let currentDate = new Date();
    let formattedDate = formatDate(currentDate);

  
  
  let onSubmitHandler = (e)=>{
    e.preventDefault()
    console.log(createblog)
    const reader = new FileReader();

      reader.readAsDataURL(imageblog);
      reader.onload = () =>{
      let base64image = reader.result
      console.log(base64image);

      let userData = {
      "authorName":createblog.author,
      "header":createblog.header,
      "short_des":createblog.short_des,
      "description":createblog.blog,
      "submityear":createblog.submit_year,
      "tags":createblog.tags,
      "time":formattedDate,
      "imageBlog":base64image
    }
    console.log(userData);
axios.post(api_link,userData)
.then(res=>{
  console.log(res);
  navigate("/")
})
.catch(err=>{
  console.error(err);
})

      }
  }
  return (
    <>
    <Container style={{backgroundColor:"white", color:"black", borderRadius:"10px" ,boxShadow:"5px 5px 20px 5px gray"}}>
      <h2 className='text-center pt-5'>Exploring the Impact of Blogging on Modern Media</h2>
    <Form className='p-5' onSubmit={onSubmitHandler}>

    <Form.Group className="mb-3" controlId="exampleForm.Controlauthor">
        <Form.Label><b>Author</b></Form.Label>
        <Form.Control type="text" placeholder="Your Name" name='author'onChange={valueHandler}/>
      </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.Controlheader">
        <Form.Label><b>Header</b></Form.Label>
        <Form.Control type="text" placeholder="Header" name='header'onChange={valueHandler}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlDescription">
        <Form.Label><b>Description</b></Form.Label>
        <Form.Control as="textarea" rows={4} name='short_des'onChange={valueHandler}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.Controlfullblog">
        <Form.Label><b>Blog</b> </Form.Label>
        <Form.Control as="textarea" rows={20} name='blog' onChange={valueHandler}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.Controlyear">
        <Form.Label><b>Submit Year</b></Form.Label>
        <Form.Control type="number" placeholder={ new Date().getFullYear()} name='submit_year' onChange={valueHandler}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.Controltag">
        <Form.Label><b>Blog Tags</b></Form.Label>
        <Form.Control type="text" placeholder="Advantage or Disadvantage etc" name='tags'onChange={valueHandler}/>
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Blog Image</Form.Label>
        <Form.Control type="file" onChange={imageHandler}/>
      </Form.Group>
      <Button variant="success" type='submit' className='px-5 mt-3'>Submit</Button>
    </Form>
    </Container>
    </>
  )
}

export default CreateBlog
