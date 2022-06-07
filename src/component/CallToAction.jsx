import React from "react";
//import Geisha from "../asserts/geisha.png"

import '../styles/toAction.css'


function CallToAction() {
    return (
        <div className="to-action">
            <img src={process.env.PUBLIC_URL+"/assets/geisha.png"} alt="geisha" className="geisha-img" />
            <div>
            <h2>Have you always dreamed of walking under cherry trees in the spring?</h2>
            <h2>Do you love the magical atmosphere between the bustling city and calm temples?</h2>
            <h2>Whether you are into food, culture, history or the outdoors Japan has it all.</h2>
            <h2>Whatever you want, you can find it in Japan.</h2>
            </div>
            <div class="button-borders">
                <button class="primary-button"> GET STARTED!
            </button>
</div>
        </div>
    )

}

export default CallToAction