import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from "./pages/Home";
import Project from "./pages/projects/project";
import Blog from "./pages/Blog";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer"
import Projects from "./pages/AllProjects"
import SinglePost from "./pages/SinglePost"


function App() {
  return (
    <BrowserRouter>
    <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/#about" element={<Home />} />
          <Route path="/projects/:slug" element={<Project />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<SinglePost />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
        <Footer></Footer>
  </BrowserRouter>
  )
}

export default App;
