import '../App';
import BannerSlogan from '../component/BannerSlogan';
import Carousel from '../component/Carousel';
import cities from '../dataCities';
import CallToAction from '../component/CallToAction';



function Home() {
    return (
        <div>
            <BannerSlogan />
            <CallToAction />
            <Carousel allCities={cities} />
        </div>
    );
}

export default Home;
