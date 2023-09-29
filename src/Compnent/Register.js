import url_api from "../api/url_api";
import { get_cookie } from "../cookies/cookies";

function Register(props) {
    const cookies = get_cookie("cookies_cerveau");
    if(cookies) return window.location.href = "/portefeuil";
    const sendEmali=eventClick=>{
        alert()
        const formData = new FormData();
        const button_event = eventClick.target;
        button_event.hidden=true;
        let _option = true;
        const verify = document.querySelector(".verify");
        const mesData = document.querySelector(".mesData");
        
        const fieldset = eventClick.target.closest("fieldset");
        const message_1=fieldset.querySelector(".message_1");
        const message_2=fieldset.querySelector(".message_2");
        const input_required = fieldset.querySelectorAll("input:required");
        
        input_required.forEach(input => {
            if (input.value.replaceAll(" ", "") === "") {
                input.classList.add("empty");
                input.focus();
                input.addEventListener("input", eve => eve.target.classList.remove("empty"))
                _option = false;
                return;
            }
        });

        if(!_option) return false;
        formData.append(fieldset.closest("form").email.name, fieldset.closest("form").email.value);
        formData.append(fieldset.closest("form").nom.name, fieldset.closest("form").nom.value);
        formData.append(fieldset.closest("form").prenom.name, fieldset.closest("form").prenom.value);

        input_required.forEach(input=>input.disabled=true);
        eventClick.target.disabled=true;

        fetch(url_api+"sendCodeEmail", {
            method:"POST",
            body:new URLSearchParams(formData)
        })
        .then(res=>res.json())
        .then(success=>{
            if(success.error){
                input_required.forEach(input=>input.disabled=false);
                eventClick.target.disabled=false;
                eventClick.target.hidden=false;

                message_1.classList.add("empty");
                message_1.innerHTML = success.error;
                message_1.hidden = false;
                eventClick.target.disabled=false;
            }else if(success.code){
                eventClick.target.disabled=true;
                const creer = document.getElementById("msform");
                mesData.classList.add("none");
                verify.classList.remove("none");
                verify.classList.add("block");
                verify.hidden = false;
                message_2.innerHTML = `Nous venons de vous envoyer un code de validation sur l'adresse email suivant: <a href="#!">${fieldset.closest("form").email.value}</a>`;
                creer.addEventListener("submit", submtEvent=>{
                    submtEvent.preventDefault();
                    const coding = submtEvent.target.querySelector("#coding")
                    if(success.code===coding.value){
                        const data = new FormData();
                        submtEvent.target.querySelectorAll("input:required").forEach(input=>{
                            if(input.value){
                                data.append(input.name, input.value)
                            }
                        }) 
                        fetch(url_api+"createUtilisateur", {
                            method:"POST",
                            body:new URLSearchParams(data)
                        })
                        .then(res=>res.json())
                        .then(newSuccess=>{
                            if(newSuccess.utilisateur){
                                console.log("newSuccess.utilisateur", newSuccess.utilisateur);
                                message_2.innerHTML = "Félicitation votre compte a été créé avec succès !"
                                message_2.hidden = false;
                                document.getElementById("creer").hidden = true;
                                coding.hidden = true;
                                setTimeout(() => {
                                    message_2.innerHTML = `Vous avez réussu un rapport resumant les accès de votre  <a href="#!">${newSuccess.utilisateur.email}</a>`;
                                }, 2000);
                                setTimeout(() => {
                                    window.location.href = "/login";
                                }, 7000);
                            }else if(newSuccess.errorPass){
                                input_required.forEach(input=>input.disabled=false);
                                eventClick.target.disabled=false;
                                message_1.hidden = false;
                                message_1.classList.add("empty-message");
                                message_1.innerHTML="Le mot de passe contenir au moin 8 caractères.";
                                eventClick.target.disabled=false;
                                mesData.classList.remove("none");
                                verify.classList.remove("block");
                                verify.classList.add("none");
                                coding.value="";
                                coding.classList.remove("empty");
                                eventClick.target.closest("form").password.classList.add("empty")
                            }else if(newSuccess.message){
                                input_required.forEach(input=>input.disabled=false);
                                eventClick.target.disabled=false;
                                message_1.hidden = false;
                                message_1.classList.add("empty-message");
                                message_1.innerHTML=newSuccess.message;
                                eventClick.target.disabled=false;
                                mesData.classList.remove("none");
                                verify.classList.remove("block");
                                verify.classList.add("none");
                                coding.value="";
                                coding.classList.remove("empty");
                                eventClick.target.closest("form").email.classList.add("empty")
                            }
                            
                        })
                    }else{
                        coding.classList.add("empty");
                        message_2.innerHTML="Code invalide.";
                    }
                })

            }else{
                input_required.forEach(input=>input.disabled=false);
                eventClick.target.disabled=false;
                eventClick.target.hidden=false;
                message_2.innerHTML = `Service momentanement indisponible.`;
            }
        })
    }

    return (
        <form id="msform" encType="multipart/form-data">
            
            <canvas id="myChart" className="campaign ct-charts" hidden></canvas>
            <fieldset id="fieldset-1">
            <a href="/" className="logos"><img src="https://m.media-amazon.com/images/I/61NN9SlsuuL._SX522_.jpg"></img></a>
                <div className="mesData">
                    <h2 className="fs-title">INSCRIPTION</h2>
                    <input type="email" name="email" placeholder="Email" required/>
                    <input type="tel" name="telephone" placeholder="Téléphone" required/>
                    <input type="password" name="password" className="password" placeholder="Mot de passe" required/>
                    <input type="text" name="nom" placeholder="Votre nom" required/>
                    <input type="text" name="prenom" placeholder="Votre prénom" required/>
                    <input type="date" name="naissance" placeholder="Votre de naissance" required/>
                    <input type="text" name="pays" placeholder="Votre de pays de résidence" required/>
                    <input type="text" name="nationalite" placeholder="Votre de nationalite" required/>
                    <p className="message_1" hidden></p>
                    <input type="button" name="next" className="next action-button" value="Créer" refer="required" onClick={sendEmali}/>
                </div>

                <div className="verify" hidden>
                    <h2 className="fs-title">Vérification</h2>
                    <p className="message_2" ></p>
                    <input type="text" name="coding" id="coding" placeholder="Entrer le code de vérification" />
                    <input type="submit" id="creer" className="submit action-button" target="_top" value={"Confirmer"}/>
                </div>
            </fieldset>
        </form>
    )
}

export default Register;