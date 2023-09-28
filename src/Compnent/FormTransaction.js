import { useEffect, useState } from "react";
import url_api from "../api/url_api";
import { get_cookie } from "../cookies/cookies";


function FormTransaction(props){
    const [fraisState, fraisSetState] = useState({});
    
    useEffect(()=>{
        fetch(url_api+"getAllFees")
        .then(res=>res.json())
        .then(success=>{
            if(success.frais) fraisSetState(success.frais);
        })
    }, [])
    const cookies = get_cookie("cookies_cerveau");
    if(!cookies) return window.location.href = "/login";
    const portefeuil = props.portefeuil;
    // const frais = props.frais;
    const chaine = "AZERTYUIOPQSDFGHJKLMWXCVBN0123456789";
    const displays = event=>{document.getElementById("rapport-transaction").textContent = "";}
    const verify_beneficiaire = event=>{
        event.target.classList.remove("error");
        const formulaire = event.target.closest("form");
        const numero = event.target.value;
        const div_beneficiaire = document.getElementById("div-beneficiaire");
        const input_beneficiaire = div_beneficiaire.querySelector("input");
        if(numero!="" && numero.length===portefeuil.numero_compte.length && numero!=portefeuil.numero_compte &&  numero.split("").every(lettre=>chaine.includes(lettre))){
            fetch(url_api+"findCountByNumber/"+numero, {
                method:"GET",
                headers: {Authorization: cookies.token}
            })
            .then(res=>res.json())       
            .then(success=>{
                console.log(success)
                if(!success.portefeuil){
                    event.target.classList.add("error");
                    event.target.nextSibling.classList.add("incorrect");
                    event.target.nextSibling.textContent = success.message;
                    div_beneficiaire.hidden = true;
                    input_beneficiaire.value = "";
                    formulaire.montant.disabled = true;
                    formulaire.montant.textContent = "";
                }else{
                    event.target.nextSibling.textContent = "";
                    div_beneficiaire.hidden = false;
                    input_beneficiaire.value = success.portefeuil.utilisateur.nom + " " + success.portefeuil.utilisateur.prenom;
                    formulaire.montant.disabled = false;
                    formulaire.montant.addEventListener("blur", e=>{
                        e.target.classList.remove("error");
                        console.log(Number(portefeuil.solde), Number(e.target.value), Number(fraisState.pourcentage)*Number(e.target.value)/100, Number(e.target.value)+Number(fraisState.pourcentage)*Number(e.target.value)/100)
                        if(e.target.value && Number(e.target.value) > 0){
                            if((Number(portefeuil.solde)>= Number(e.target.value)+Number(fraisState.pourcentage)*Number(e.target.value)/100)){
                                formulaire.password.disabled = false;
                                formulaire.password.addEventListener("blur", pass=>{
                                    if(pass.target.value){
                                        fetch(url_api+`verifyPassword/${pass.target.value}`, {
                                            method:"GET",
                                            headers: {Authorization: cookies.token}
                                        })
                                        .then(res=>res.json())
                                        .then(fullPass=>{
                                            console.log(fullPass)
                                            pass.target.addEventListener("input", inp=>{
                                                inp.target.classList.remove("error");
                                                inp.target.nextSibling.textContent = "";
                                            })
                                            if(!fullPass.utilisateur){
                                                pass.target.classList.add("error");
                                                formulaire.secret.disabled = true;
                                                return pass.target.nextSibling.textContent = fullPass.message;
                                            }

                                            pass.target.classList.remove("incorrect");
                                            pass.target.classList.remove("error");
                                            pass.target.nextSibling.textContent = "";
                                            formulaire.secret.disabled = false;
                                            formulaire.secret.addEventListener("blur", scr=>{
                                                if(!scr.target.value){
                                                    scr.target.classList.remove("error");
                                                    scr.target.nextSibling.textContent = "Code sécret incorrect";
                                                    return formulaire.querySelector("#submit").hidden = true;
                                                }
                                                scr.target.addEventListener("input", inps=>{
                                                    inps.target.classList.remove("error");
                                                    inps.target.nextSibling.textContent = "";
                                                })
                                                fetch(url_api+`verifySecretCode/${scr.target.value}`, {
                                                    method:"GET",
                                                    headers: {Authorization: cookies.token}
                                                })
                                                .then(res=>res.json())
                                                .then(fullSecret=>{
                                                    if(fullSecret.message){
                                                        scr.target.classList.add("error");
                                                        scr.target.nextSibling.textContent = fullSecret.message;
                                                        return formulaire.querySelector("#submit").hidden = true;
                                                    }

                                                    scr.target.classList.remove("error");
                                                    scr.target.nextSibling.textContent = "";
                                                    return formulaire.querySelector("#submit").hidden = false;
                                                })
                                            })
                                        })
                                    }
                                })
                            }else{
                                e.target.classList.add("error");
                                formulaire.password.disabled = true;
                                e.target.nextSibling.textContent = "Votre solde est insuffisant.";
                                e.target.addEventListener("input", ine=>{
                                    ine.target.nextSibling.textContent = "";
                                    ine.target.classList.remove("error")
                                })
                                formulaire.secret.disabled = true;
                                formulaire.secret.textContent = "";
                            }
                        }
                        
                    })
                }
            })
        }else{
            return event.target.classList.add("error");
        }
    }

    const saving_translation = event => {
        const rapport_transaction = document.querySelector("#rapport-transaction");
        event.preventDefault();
        const submit = document.getElementById("submit");
        submit.hidden = true;
        const formData = new FormData();
        event.target.querySelectorAll("input:required").forEach(input => {
            if(input.value){
                formData.append(input.name, input.value)
            }else{
                input.classList.add("error");
                return input.focus()
            }
        });

        fetch(url_api+"virement", {
            method: "POST",
            body: new URLSearchParams(formData),
            headers: {Authorization: cookies.token}
        })
        .then(res=>res.json())
        .then(success=>{
            rapport_transaction.hidden = false;
            if(success.result){
                event.target.querySelectorAll("input:required").forEach(input=>{
                    
                    input.value = "";
                    input.nextSibling.textContent="";
                    input.disabled = input.name==="numero_compte" ? false: true
                })
                const result = success.result;
                rapport_transaction.innerHTML = `
                <div className="d-md-flex align-items-center">
                    <div>
                        <h4 className="card-title text-center">RAPPORT DE TRANSACTION</h4>
                        <h5 className="card-subtitle">Succès</h5>
                    </div>       
                </div>
                <div className="row">
                <div className="col-lg-12" id="rapport-transaction">
                <div class="rapport-message">
                Vous avez effectué un transaction de <strong>${result.montant} FCFA</strong> au <strong>${result.numero_compteBeneficiaire}</strong>  donc le pour priétaire <strong>Madame/ Monsieur ${result.nomPrenomBeneficiaire}.</strong>
                Votre solde actuel est de <strong>${result.nouveauSolde} FCFA</strong><br/>
                Date et heure de transaction : <strong>${result.dateVirement}</strong><br/>
                Référence de transaction ; <strong>${result.reference}</strong></div>
                </div></div>`;      
            }else{
                rapport_transaction.innerHTML = `
                <div class="rapport-message">
                Service interrompu, veuillez s'il-vous-plaît réessayer plus tard !
                </div>`;
            }
        })
    }


    return(
        <div className="col-lg-12 col-xlg-12 col-md-12">
            <div className="card">
                <div className="card-body">
                    <form className="form-horizontal form-material mx-2" onSubmit={saving_translation}>
                        <div className="row">
                            <div className="col-lg-4 col-xlg-12 col-md-6">
                                <div className="form-group">
                                    <label className="">Entrer le numéro de compte du bénéficiaire</label>
                                    <div className="">
                                        <input type="text" name="numero_compte" className="form-control form-control-line" placeholder="Numéro de compte" required onInput={displays} onBlur={verify_beneficiaire}/>
                                        <span className="error-data"></span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-xlg-12 col-md-6" id="div-beneficiaire" hidden>
                                <div className="form-group">
                                    <label className="" >Nom et prénom du bébéficière</label>
                                    <div className="">
                                        <input type="text" name="beneficiaire" className="form-control form-control-line" placeholder="Numéro du compte du bénéficiaire" required  disabled/>
                                        <span className="error-data"></span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-xlg-12 col-md-12">
                                <div className="form-group">
                                    <label className="" htmlFor="pays">Entrer le Montant</label>
                                    <div className="">
                                        <input type="number" name="montant" placeholder="Montant à transférer" min={1} className="form-control form-control-line" required disabled/>
                                        <span className="error-data"></span>
                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-4 col-xlg-12 col-md-12">
                                <div className="form-group">
                                    <label className="" htmlFor="password">Mot de passe</label>
                                    <div className="">
                                        <input type="password" name="password" placeholder="Entrez votre mot de passe" className="form-control form-control-line" required disabled/>
                                        <span className="error-data"></span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-xlg-12 col-md-12">
                                <div className="form-group">
                                    <label className="" htmlFor="secret">Code sécret de sécurité</label>
                                    <div className="">
                                        <input type="password" name="secret" placeholder="Entrez votre code sécret de sécurité" className="form-control form-control-line" required disabled/>
                                        <span className="error-data"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-12">
                                <button type="submit" id="submit" className="btn btn-danger text-white" hidden>Transférer Maintenant</button>
                            </div>
                        </div>
                    </form>

                    <div className="form-horizontal form-material mx-2" id="rapport-transaction"></div>
                </div>
            </div>
            <canvas id="myChart" className="campaign ct-charts"  hidden></canvas>
        </div>
    )
}

export default FormTransaction;