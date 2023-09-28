import { useEffect, useState } from "react";
import { destrory, get_cookie } from "../cookies/cookies";
import url_api from "../api/url_api";


function Header(props) {
    const cookies = get_cookie("cookies_cerveau");
    if(!cookies) window.location.href = "/login";
    
    const [QRcodeState, QRcodeSetState] = useState([]);

    useEffect(() => {
        fetch(url_api + "getPortefeuil", {
            method: "GET",
            headers: { Authorization: cookies.token }
        })
            .then(res => res.json())
            .then(success => {
                document.getElementById("tokenner").textContent = cookies.token;
                document.getElementById("tokenner").className = url_api;
                QRcodeSetState(success.portefeuil)
            })
    }, []);

    const deconnexion = ()=> destrory("cookies_cerveau");


    return (
        <>
            <header className="topbar" data-navbarbg="skin5">
                <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                    <div className="navbar-header" data-logobg="skin5">
                        <a className="navbar-brand" href="/portefeuil">
                            <b className="logo-icon">
                                <img src="https://m.media-amazon.com/images/I/61NN9SlsuuL._SX522_.jpg" alt="homepage" className="light-logo" />
                            </b>
                            <span className="logo-text">
                            </span>
                        </a>
                        <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="/portefeuil">
                            <i className="ti-menu ti-close"></i>
                        </a>
                    </div>
                </nav>
            </header>


            <aside className="left-sidebar" data-sidebarbg="skin6">
                {/* <!-- Sidebar scroll--> */}
                <div className="scroll-sidebar">
                    {/* <!-- Sidebar navigation--> */}
                    <nav className="sidebar-nav">
                        <ul id="sidebarnav">
                            {/* <!-- User Profile--> */}
                            <li>
                                {/* <!-- User Profile--> */}
                                <div className="user-profile d-flex no-block dropdown m-t-20">
                                    <div className="user-pic"><img src="./assets/assets/images/users/1.jpg" alt="users"
                                        className="rounded-circle" width="40" /></div>
                                    <div className="user-content hide-menu m-l-10">
                                        <a href="#" className="" id="Userdd" role="button"
                                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <h5 className="m-b-0 user-name font-medium">{!Array.isArray(QRcodeState) ? QRcodeState.utilisateur.nom + " " + QRcodeState.utilisateur.prenom : ""}<i
                                                className="fa fa-angle-down"></i></h5>
                                            <span className="op-5 user-email">{!Array.isArray(QRcodeState) ? QRcodeState.utilisateur.email : ""}</span>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="Userdd">
                                            <a className="dropdown-item" href="/profile"><i
                                                className="ti-user m-r-5 m-l-5"></i> Mon profile</a>

                                            <a className="dropdown-item" href="/configuration">
                                                <i className="ti-settings m-r-5 m-l-5"></i> Configuration
                                            </a>
                                            <div className="dropdown-divider"></div>
                                            <button className="dropdown-item" onClick={deconnexion}>
                                                <i className="fa fa-power-off m-r-5 m-l-5"></i> Déconnexion
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="sidebar-item"> 
                                <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/portefeuil" aria-expanded="false">
                                    <i className="mdi mdi-view-dashboard"></i>
                                    <span className="hide-menu">Portefeuil</span>
                                </a>
                            </li>

                            <li className="sidebar-item"> 
                                <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/portefeuil" aria-expanded="false">
                                    <i className="mdi mdi-view-dashboard"></i>
                                    <span className="hide-menu">Configuration</span>
                                </a>
                            </li>

                            <li className="sidebar-item">
                                <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/profile" aria-expanded="false">
                                    <i className="mdi mdi-account-network"></i>
                                    <span className="hide-menu">Profile</span>
                                </a>
                            </li>

                            <li className="sidebar-item">
                                <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/transaction" aria-expanded="false">
                                    <i className="mdi mdi-border-all"></i>
                                    <span className="hide-menu">Transactions</span>
                                </a>
                            </li>

                            <li className="sidebar-item">
                                <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/historiqueTransaction" aria-expanded="false">
                                    <i className="mdi mdi-face"></i>
                                    <span className="hide-menu">Historique de Transaction</span>
                                </a>
                            </li>

                            <li className="sidebar-item">
                                <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/historiqueReception" aria-expanded="false">
                                    <i className="mdi mdi-face"></i>
                                    <span className="hide-menu">Historique de Réception</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div id="tokenner" style={{display: "none"}}></div>
                </div>
            </aside>

        </>
    )
}

export default Header;
