import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import About from "./components/About";
import SinglePost from "./components/SinglePost";
import Project from "./components/Project";
import Post from "./components/Post";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
    <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/post" element={<Post />} />
          <Route path="/singlepost" element={<SinglePost />} />
        </Routes>
  </BrowserRouter>
  )
}

export default App;
