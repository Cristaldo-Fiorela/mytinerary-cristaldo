import '../App';
import BannerSlogan from '../component/BannerSlogan';
import Carousel from '../component/Carousel';
import cities from '../dataCities';
import CallToAction from '../component/CallToAction';



function IndexHome() {
    return (
        <div>
            <BannerSlogan />
            <CallToAction />
            <Carousel allCities={cities} />
        </div>
    );
}

export default IndexHome;
