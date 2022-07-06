import React from "react";
import { Link as LinkRouter } from "react-router-dom";

import '../styles/toAction.css'


function CallToAction() {
    
    const ScrollToTop = () =>  {
        window.scroll({
            top: 0,
            behavior: "smooth",
            left:0
        })
    }
    return (
        <div className="to-action">
            <img src={process.env.PUBLIC_URL + "/assets/geisha.png"} alt="geisha" className="geisha-img" />

            <div className="textCallTo">
                <div className="textJapan">
                    <p>Have you always dreamed of walking under cherry trees in the spring?</p>
                    <p>Do you span love the magical atmosphere between the bustling city and calm temples?</p>
                    <p>Whether you are into food, culture, history or the outdoors Japan has it all.</p>
                    <h2>Whatever you want, you can find it in Japan.</h2>
                </div>
                <div className="button-borders">
                    <LinkRouter to='/cities'>
                        <button  onClick={ScrollToTop} className="primary-button"> GET STARTED!</button>
                    </LinkRouter>
                </div>

            </div>

        </div>
    )

}

export default CallToAction