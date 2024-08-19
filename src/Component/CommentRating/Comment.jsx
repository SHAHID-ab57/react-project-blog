import React, { useEffect, useState } from 'react'
import { Container,Form,Button,Card } from 'react-bootstrap'
import { api_url, endpoints } from '../../Api/Api'
import axios from 'axios'
import { FaCommentDots } from "react-icons/fa";

function Comment({blogId}) {
    let api_link = api_url+endpoints.reviews
    let [reviewsdata,setreviewsdata]=useState(0)
    let [commentdata,setcommentdata]=useState()
    let [ratingdetails,setratingdetails]=useState()
let userName = sessionStorage.getItem("userName");
// console.log("User Name",userName);
    let getApi = ()=>{
        axios.get(api_link)
        .then(res=>{
      //  console.log(res.data);
       setratingdetails(res.data)
        }).catch(err=>{
            console.error(err);
        })
    }
    useEffect(()=>{
        getApi()
    },[])


    // console.log(ratingdetails,commentdata,blogId);
 let onSubmithandler = (e)=>{
e.preventDefault()
 let reviewData = {
    "username":userName ,
    "blogid":blogId,
    "review":reviewsdata,
    "comment":commentdata,
 }
 axios.post(api_link,reviewData)
 .then(res=>{
    console.log(res);
 }).catch(err=>{
    console.log(err);
 })
 }

 let filterComment =ratingdetails?.filter(value=>value.blogid===blogId)
// console.log(filterComment);

  return (
    <>
      <Form className='mt-5' onSubmit={onSubmithandler}>
    <h2>Review :</h2>


      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Rating</Form.Label>
        <Form.Control type="number" placeholder="Rating between 1-5" 
        min='1'
        max="5"
        className='w-25'
        onChange={(e)=>{setreviewsdata(e.target.value)}}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Comment</Form.Label>
        <Form.Control as="textarea" rows={5} className='w-50'
        onChange={(e)=>{setcommentdata(e.target.value)}}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    
    <h3 className='text mt-5'>Comment Section</h3>
     
     {/* if (filterComment?) {
      
     } */}
     
     {filterComment?.slice(0,3).map((value)=>(


<Card className='mt-5'>
      <Card.Header>Comment No : {value.id}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {' '}
            <FaCommentDots/> {value.comment} 
            {' '}
          </p>
          <footer className="blockquote-footer">
            By : <cite title="Source Title">{value.username || "Anonymous User"}</cite>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
     ))}

    
    </>
  )
}

export default Comment
