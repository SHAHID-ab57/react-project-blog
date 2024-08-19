import React from 'react'
import { Routes,Route,BrowserRouter } from 'react-router-dom'
import Header from '../Layout/Header/Header'
import Banner from '../Layout/Header/Banner'
import Home from '../Component/Home/Home'
import UserRegestration from '../Component/UserRegistration/UserRegestration'
import UserLogin from '../Component/UserLogin/UserLogin'
import About from '../Component/Info/About'
import CreateBlog from '../Component/CreateBlog/CreateBlog'
import Detailsblog from '../Component/Detailsblog/Detailsblog'
import Allblog from '../Component/Allblog/Allblog'
// import Advantage from '../Component/Advantage/Advantage'
// import Disadvantage from '../Component/Disadvantage/Disadvantage'
import DMCA from '../Component/Info/DMCA'
import Footer from '../Layout/Footer/Footer'
import SearchBlogs from '../Component/SearchBlogs/SearchBlogs'
import AuthorWiseBlog from '../Component/AuthorWiseBlog/AuthorWiseBlog'
import DashBoard from '../Component/DashBoard/DashBoard'
import ChangePassword from '../Component/DashBoard/ChangePassword'

const Routing = ({isDarkMode,DarkButtonHandler}) => {

  
  return (
    <>
    <BrowserRouter>
    <Header isDarkMode={isDarkMode} DarkButtonHandler={DarkButtonHandler}/>
    <Banner/>
    <Routes>
       < Route path='' element={<Home/>}/>
       < Route path='userregistration' element={<UserRegestration/>}/>
       < Route path='userloging' element={<UserLogin/>}/>
       < Route path='about' element={<About/>}/>
       < Route path='createblog' element={<CreateBlog/>}/>
       < Route path='detailspage/:userid' element={<Detailsblog/>}/>
       <Route path='allblogs' element={<Allblog/>}/>
       {/* <Route path='advantage' element={<Advantage/>}/> */}
       {/* <Route path='disadvantage' element={<Disadvantage/>}/> */}
       <Route path='dmca' element={<DMCA/>}/>
       <Route path='searchblogs/:search' element={<SearchBlogs/>}/>
       <Route path='authorblogs/:authName' element={<AuthorWiseBlog/>}/>
       <Route path='userdashboard' element={<DashBoard/>}/>
       <Route path='changepassword/:changeid' element={<ChangePassword/>}/>
       
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default Routing
