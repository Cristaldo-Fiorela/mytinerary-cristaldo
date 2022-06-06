import './App.css';
import BannerSlogan from './component/BannerSlogan';
import Carousel from './component/Carousel';
import NavBar from './component/Navbar';
import cities from './dataCities';



function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <BannerSlogan></BannerSlogan>
      <Carousel allCities={cities} />
    </div>
  );
}

export default App;
