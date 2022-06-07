import './App.css';
import BannerSlogan from './component/BannerSlogan';
import Carousel from './component/Carousel';
import NavBar from './component/Navbar';
import cities from './dataCities';
import CallToAction from './component/CallToAction';
import Footer from './component/Footer';



function App() {
  return (
    <div className="App">
      <NavBar />
      <BannerSlogan />
      <CallToAction/>
      <Carousel allCities={cities} />
      <Footer/>
    </div>
  );
}

export default App;
