import './App.css';
import About from './Components/About';
import BlogSection from './Components/Blog';
import BlogPage from './Components/BlogePage'; 
import Contact from './Components/Contact';
import HeroSection from './Components/Hero';
import Links from './Components/Links';
import Projects from './Components/Projects';
import Skill from './Components/Skills';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
        
        {/* Define routes within the Routes component */}
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path="/blog/:id" element={<BlogPage />} /> Blog page route
        </Routes>
      
    </>
  );
}
const Landing = ()=>{
  return (
    <div className="overflow-x-hidden grid grid-rows-[*] bg-zinc-900">
        <HeroSection id="home" />
        <About id="About" />
        <Projects id="Projects" />
        <Skill id="Skills" />
        <BlogSection id="blog" />
        <Contact id="contact" />
        <Links />
      </div>   
  )
}
export default App;
