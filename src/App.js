import './styles/App.css';
import NavBar from './component/Navbar';
import Footer from './component/Footer';
import IndexHome from './pages/IndexHome'
import WipCities from './pages/WipCities'
import { Route, Routes} from 'react-router-dom'
import ScrollToTop from 'react-scroll-to-top';
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import { useEffect } from 'react';




function App() {
  
  useEffect(() =>{
    setTimeout(()=>{
      window.scrollTo(0, 0)
    },500)
  },[])

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<IndexHome/>} />
        <Route path='/Cities' element={<WipCities/>}/>
      </Routes>
      <Footer/>
      <ScrollToTop 
      smooth 
      component={ < ArrowCircleUpRoundedIcon sx={{color: "#F2F2F2", fontSize: "4.5rem", backgroundColor: "#F27E7E", borderRadius:"100%"}} />} 
      style={{backgroundColor: "transparent", boxShadow: "none" }}
      />
    </div>
  );
}

export default App;
