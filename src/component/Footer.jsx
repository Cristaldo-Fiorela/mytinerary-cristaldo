//REACT
import React from "react";
import { Link as LinkRouter } from "react-router-dom";

// MUI
import { Button } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

//STYLES
import '../styles/footer.css'


function Footer() {

    const ScrollToTop = () =>  {
        window.scroll({
            top: 0,
            behavior: "smooth",
            left:0
        })
    }

    return (
        <>
        <div className="footerNav">
            <div className="socialMedia">
                <Button href="https://www.facebook.com/fiio.cristaldo/" style={{color: "#F2F2F2"}}>
                    <FacebookIcon fontSize="large" style={{color: "#F2F2F2"}}/>
                </Button>
                <Button href="https://www.instagram.com/fio.cristaldo/" style={{color: "#F2F2F2"}}>
                    <InstagramIcon fontSize="large" style={{color: "#F2F2F2"}}/>
                </Button>
                <Button href="https://github.com/Cristaldo-Fiorela" style={{color: "#F2F2F2"}}>
                    <GitHubIcon fontSize="large" style={{color: "#F2F2F2"}}/>
                </Button>
            </div>
            <div className="navFooter">
                <LinkRouter to= './'>
                    <Button onClick={ScrollToTop}  style={{color: "#F2F2F2"}}>Home</Button>
                </LinkRouter>

                <LinkRouter to= './cities'>
                    <Button onClick={ScrollToTop}  style={{color: "#F2F2F2"}}>Cities</Button>
                </LinkRouter>
                
            </div>
            <img src='https://i.imgur.com/0MtMWli.png' className="footerLogo" alt="LOGO" style={{height: "10rem"}} />
        </div>
        <div className="copyrg">
            <p> Copyright © 2022 Cristaldo Fiorela</p>
        </div>
        </>
    )

}

export default Footer