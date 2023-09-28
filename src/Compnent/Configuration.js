import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { get_cookie } from "../cookies/cookies";
import url_api from "../api/url_api";
import FormFrais from "./FormFrais";


function Configuration(props){
    const cookies = get_cookie("cookies_cerveau");
    if(!cookies) window.location.href = "/login";


    return(
        <>
            <div className="preloader">
                <div className="lds-ripple">
                    <div className="lds-pos"></div>
                    <div className="lds-pos"></div>
                </div>
            </div>
            <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full" data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
                <Header /> 
                <div className="page-wrapper">
                    <div className="page-breadcrumb">
                        <div className="row align-items-center">
                            <div className="col-5">
                                <h4 className="page-title">Configuration</h4>
                                <div className="d-flex align-items-center">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item active" aria-current="page"><a href="/accueil">Accueil</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Configuration</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <canvas id="myChart" className="campaign ct-charts" hidden></canvas> */}
                    <div className="container-fluid">
                        <div className="row">
                            <FormFrais />
                            {/* <!-- Column --> */}
                        </div>
                    </div>
                    
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Configuration;