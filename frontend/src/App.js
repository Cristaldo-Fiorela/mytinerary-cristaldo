import './styles/App.css';
import NavBar from './component/Navbar';
import Footer from './component/Footer';
import IndexHome from './pages/IndexHome'
import CitiesHome from '../src/pages/Cities'
import { Route, Routes} from 'react-router-dom'
import ScrollToTop from 'react-scroll-to-top';
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import { useEffect } from 'react';
import Details from './component/Details';
import { useDispatch} from 'react-redux'
import citiesActions from './redux/actions/citiesActions';
import SignIn from './component/SignIn';
import SignUp from './component/SignUp';


function App() {
  
  const dispatch = useDispatch() 

  useEffect(() => {
    dispatch(citiesActions.getCities())
    // eslint-disable-next-line
  },[])


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
          <Route path='/Cities' element={<CitiesHome/>}/>
          <Route path='/Cities/:idCity' element={ <Details />} />
          <Route path='/SignUp' element={ <SignUp/> } />
          <Route path='/SignIn' element={ <SignIn/> }/>
        </Routes>
      <Footer/>
      <ScrollToTop 
      smooth
      component={ < ArrowCircleUpRoundedIcon sx={{color: "#F2F2F2", fontSize: "4.5rem", backgroundColor: "#F27E7E", borderRadius:"100%"}} />} 
      style={{backgroundColor: "transparent", boxShadow: "none", paddingBottom: "4.4rem" }}
      />
    </div>
  );
}

export default App;
