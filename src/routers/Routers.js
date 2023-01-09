import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Projects from "../pages/Projects";
import Services from "../pages/Services";
import Consultation from "../pages/Consultation";
import About from "../pages/About";
import Contacts from "../pages/Contacts";

const Routers = () => {
    return <Routes>
        <Route path="/" element={<Navigate to="home"/>}/>
        <Route path="projects" element={<Projects/>}/>
        <Route path="services" element={<Services/>}/>
        <Route path="consultation" element={<Consultation/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="contacts" element={<Contacts/>}/>
    </Routes>
};

export default Routers;