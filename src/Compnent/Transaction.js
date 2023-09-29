import Footer from "./Footer";
import FormTransaction from "./FormTransaction";
import Header from "./Header";
import { useEffect, useState } from "react";
import { get_cookie } from "../cookies/cookies";
import url_api from "../api/url_api";

function Transaction(props){
    const cookies = get_cookie("cookies_cerveau");
    if(!cookies) window.location.href = "/login";

    const [myPortefeuilState, myPortefeuilSetState] = useState({});
    useEffect(()=>{
        fetch(url_api+"getPortefeuil", {
            method:"GET",
            headers: {Authorization: cookies.token}
        })
        .then(res=>res.json())
        .then(success=>{
            myPortefeuilSetState(success.portefeuil)
        })
    },[]);
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
                                <h4 className="page-title">Transaction</h4>
                                <div className="d-flex align-items-center">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item active" aria-current="page"><a href="/profile">Profile</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Transaction</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <FormTransaction portefeuil={myPortefeuilState}/>
                            {/* <!-- Column --> */}
                        </div>
                    </div>
                    
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Transaction;