import '../App';
import cities from '../dataCities'
import DisplayCardCities from '../component/CityCard';



function Cities() {
    return (
        <>
            <DisplayCardCities allCities={cities} />
        </>
    );
}

export default Cities;
