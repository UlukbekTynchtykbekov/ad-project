import React from 'react';
import {Route, Routes} from "react-router-dom";
import Projects from "../pages/Projects";
import Services from "../pages/Services";
import Consultation from "../pages/Consultation";
import About from "../pages/About";
import Contacts from "../pages/Contacts";
import Home from "../pages/Home";
import Architecture from "../pages/Architecture";
import Interior from "../pages/Interior";
import Exterior from "../pages/Exterior";
import Design from "../pages/Design";
import Favorite from "../pages/Favorite";
import Construction from "../pages/Construction";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProjectDetail from "../pages/ProjectDetail";
import ProjectList from "../Admin/ProjectList";
import ProtectedRoute from "./ProtectedRoute";
import Company from "../Admin/Company";
import NewProject from "../Admin/NewProject";

const Routers = () => {
    return <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/architecture" element={<Architecture/>}/>
        <Route path="/design" element={<Design/>}/>
        <Route path="/construction" element={<Construction/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/consultation" element={<Consultation/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contacts" element={<Contacts/>}/>
        <Route path="/projects/interior" element={<Interior/>}/>
        <Route path="/projects/exterior" element={<Exterior/>}/>
        <Route path="/projects/:projectId" element={<ProjectDetail/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/favorite" element={<Favorite/>}/>
        <Route path="/register" element={<Register/>}/>

        <Route exact path='/' element={<ProtectedRoute role={"ADMIN"}/>}>
            <Route exact path='/admin/projects' element={<ProjectList/>}/>
            <Route exact path='/admin/company' element={<Company/>}/>
            <Route exact path='/admin/projects/new' element={<NewProject/>}/>
        </Route>
    </Routes>
};

export default Routers;