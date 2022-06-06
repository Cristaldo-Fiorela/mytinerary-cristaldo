import './App.css';
import Carousel from './component/Carousel';
import NavBar from './component/Navbar';
import cities from './dataCities';



function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Carousel allCities={cities} />
    </div>
  );
}

export default App;
