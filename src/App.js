import './styles/App.css';
import NavBar from './component/Navbar';
import Footer from './component/Footer';
import IndexHome from './pages/IndexHome'
import WipCities from './pages/WipCities'
import { Route, Routes} from 'react-router-dom'



function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<IndexHome/>} />
        <Route path='/Cities' element={<WipCities/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
