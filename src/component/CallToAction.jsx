import React from "react";
import Geisha from "../asserts/geisha.png"
import { Button } from "@mui/material";

import '../styles/toAction.css'


function CallToAction() {
    return (
        <div className="to-action">
            <img src={Geisha} alt="geisha" className="geisha-img" />
            <div>
            <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum expedita omnis iusto odio? A, minima.</h2>
            <Button style={{color:"#A62D43"}} variant="outline">Hola soy un boton</Button>
            </div>
        </div>
    )

}

export default CallToAction