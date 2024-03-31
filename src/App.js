import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from "./pages/Home";
import About from "./pages/About";
import SinglePost from "./pages/SinglePost";
import Project from "./pages/projects/project";
import Post from "./pages/Post";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer"


function App() {
  return (
    <BrowserRouter>
    <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects/:slug" element={<Project />} />
          <Route path="/post" element={<Post />} />
        </Routes>
        <Footer></Footer>
  </BrowserRouter>
  )
}

export default App;
