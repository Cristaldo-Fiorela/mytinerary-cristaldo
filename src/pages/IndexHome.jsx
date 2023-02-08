import '../App';
import BannerSlogan from '../component/BannerSlogan';
import Carousel from '../component/Carousel';
import CallToAction from '../component/CallToAction';



function IndexHome() {
    return (
        <>
            <BannerSlogan />
            <CallToAction />
            <Carousel/>
        </>
    );
}

export default IndexHome;
