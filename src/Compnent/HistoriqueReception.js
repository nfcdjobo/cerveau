import Footer from "./Footer";
import Header from "./Header";
import { useEffect, useState } from "react";
import { get_cookie } from "../cookies/cookies";
import url_api from "../api/url_api";

function HistoriqueReception(props){
    const cookies = get_cookie("cookies_cerveau");
    if(!cookies) window.location.href = "/login";
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const [myTransactionState, myTransactionSetState] = useState({});
    useEffect(()=>{
        fetch(url_api+"getReception", {
            method:"GET",
            headers: {Authorization: cookies.token}
        })
        .then(res=>res.json())
        .then(success=>{
            const ac_container = document.querySelector(".ac-container");
            if(success.virement){
                ac_container.textContent = "";
                success.virement.sort((a, b)=>new Date(b.created_at)-new Date(a.created_at)).forEach((vire, indice) => {
                    const compteur = indice+1;
                    const div_accor = document.createElement("div"); ac_container.append(div_accor);
                    const input_accor = document.createElement("input"); input_accor.id=`ac-${compteur}`; input_accor.name = `accordion-1`; input_accor.type = "radio"; div_accor.append(input_accor);
                    if(indice===1){ input_accor.checked=""}
                    const label_accor = document.createElement("label"); label_accor.setAttribute("for", `ac-${compteur}`); div_accor.append(label_accor);
                    const strong_accor_1_label = document.createElement("strong"); strong_accor_1_label.innerHTML=vire.montant+" FCFA"; label_accor.append(strong_accor_1_label); label_accor.innerHTML += " || ";

                    // const strong_accor_2_label = document.createElement("strong"); strong_accor_2_label.innerHTML=vire.reference; label_accor.append(strong_accor_2_label); label_accor.innerHTML += " || ";

                    const strong_accor_3_label = document.createElement("strong"); strong_accor_3_label.innerHTML=vire.expediteurNumber; label_accor.append(strong_accor_3_label); label_accor.innerHTML += " || ";

                    const strong_accor_4_label = document.createElement("strong"); strong_accor_4_label.innerHTML=new Date(vire.created_at).toLocaleDateString('fr-FR', options); label_accor.append(strong_accor_4_label);

                    const article_accor = document.createElement("article"); article_accor.className = "ac-small"; div_accor.append(article_accor);

                    const p_accor = document.createElement("p"); article_accor.append(p_accor); p_accor.innerHTML+="Vous avez réçu un virement de ";
                    const strong_accor_1_p = document.createElement("strong"); strong_accor_1_p.innerHTML=vire.montant+" FCFA"; p_accor.append(strong_accor_1_p); p_accor.innerHTML+= " provenant de ";

                    const strong_accor_2_p = document.createElement("strong"); strong_accor_2_p.innerHTML=vire.expediteurNumberNumber; p_accor.append(strong_accor_2_p); /*p_accor.innerHTML+= " compte de ";*/

                    const strong_accor_3_p = document.createElement("strong"); strong_accor_3_p.innerHTML=`Madame/Monsieur ${vire.utilisateur.nom+" "+vire.utilisateur.prenom}`; p_accor.append(strong_accor_3_p); p_accor.innerHTML+= " à la date du ";

                    const strong_accor_4_p = document.createElement("strong"); strong_accor_4_p.innerHTML=new Date(vire.created_at).toLocaleDateString('fr-FR', options); p_accor.append(strong_accor_4_p); p_accor.innerHTML+= ". Référence: ";

                    const strong_accor_5_p = document.createElement("strong"); strong_accor_5_p.innerHTML=vire.reference; p_accor.append(strong_accor_5_p); p_accor.innerHTML+= ".";
                });
            }
            



            myTransactionSetState(success.portefeuil)
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
                                <h4 className="page-title">Historique des transactions</h4>
                                <div className="d-flex align-items-center">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item active" aria-current="page"><a href="/accueil">Accueil</a></li>
                                            <li className="breadcrumb-item active" aria-current="page"><a href="/profile">Profile</a></li>
                                            <li className="breadcrumb-item active" aria-current="page"><a href="/transaction">Transaction</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Historique</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-6 col-xlg-12 col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        <section className="ac-container">
                                            
                                        </section>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-xlg-12 col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        <canvas id="myChart" className="campaign ct-charts"></canvas>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Column --> */}
                        </div>
                    </div>
                    
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default HistoriqueReception;