import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import SinglePost from "./pages/SinglePost";
import Project from "./pages/Project";
import Post from "./pages/Post";
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
