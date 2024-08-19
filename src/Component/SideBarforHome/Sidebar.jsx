import React, { useEffect, useState } from 'react'
import { Tab,Tabs } from 'react-bootstrap'
import { api_url, endpoints } from '../../Api/Api'
import axios from 'axios'
import {Link} from "react-router-dom"
import './sidebar.css'

const Sidebar = () => {
    let api_link = api_url+endpoints.blogdetails
let [sidebardata,setsidebardata]=useState()
// let[findauthor,setfindauthor]=useState()
 let getApi = ()=>{
    axios.get(api_link)
    .then(res=>{
        // console.log(res.data);
        setsidebardata(res.data)
        // setfindauthor(res.data)
    })
    .catch(err=>{
        console.error(err);
    })
 }
 useEffect(()=>{
    getApi()
 },[])
//  console.log("Side Bar Data",sidebardata);

let authorNameData = []
   sidebardata?.map(item=>{
     if(!authorNameData.find(value=>value.authorName===item.authorName)){
      authorNameData.push(item)
     }
   })

  //  console.log("Author",authorNameData);
  return (
    <div className='mt-4' style={{backgroundColor:"whitesmoke" , padding:"5px",borderRadius:"10px"}}>
        <Tabs
      defaultActiveKey="latest"
      id="uncontrolled-tab-example"
      className="mb-3" 
      
    >
      <Tab eventKey="latest" title="Latest Feeds" >
        {sidebardata?.slice(0,10).map((value,index)=>(
         <h5 key={index} className='m-4 '><Link className=' onHover' to={`detailspage/${value.id}`}>{value.header}</Link></h5>
        ))}
      </Tab>
      
      <Tab eventKey="author" title="Authors">
      {authorNameData?.map((value,index)=>(
         <h5 key={value.id} className='m-4 onHover'><Link className='onHover' to={`authorblogs/${value.authorName}`}>{value.authorName}</Link></h5>
        ))} 
       </Tab>
      
    </Tabs>
    </div>
  )
}

export default Sidebar
