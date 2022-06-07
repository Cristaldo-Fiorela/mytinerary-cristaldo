import React from "react";
import '../styles/footer.css'
//import logoColor from '../asserts/logoMyTineraryColor.png'

function Footer() {
    return (
        <>
        <div className="footerNav">
            <div>
                <p>REDES SOCIELES</p>
            </div>
            <nav className="navFooter">
                <a href="-">Home</a>
                <a href="-">Cities</a>
            </nav>
                        <img src={process.env.PUBLIC_URL+"/assets/logoMyTineraryColor.png"} alt="LOGO" style={{height: "10rem"}} />
        </div>
        <div className="copyrg">
            <p> Copyright © 2022 Cristaldo Fiorela</p>
        </div>
        </>
    )

}

export default Footer