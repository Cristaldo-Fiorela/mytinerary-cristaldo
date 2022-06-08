import './App.css';
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
        <Route path='/src/pages/IndexHome.jsx' element={<IndexHome/>} />
        <Route path='/src/pages/WipCities.jsx'/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
