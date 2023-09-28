import url_api from "../api/url_api";
import { get_cookie, save_cookie } from "../cookies/cookies";


function Login(props) {
    if(get_cookie("cookies_cerveau")) return window.location.href = "/accueil";
    const savin_login=event=>{
        event.preventDefault();
        const login=event.target.querySelector(".login");
        const message = event.target.querySelector(".message");
        const h2 =event.target.querySelector("h2");
        const h3 =event.target.querySelector("h3");
        const submit =event.target.querySelector("input[type='submit']");
        const allInput = event.target.querySelectorAll("input:required");
        const formData = new FormData();
        let _option = true;
        allInput.forEach(input => {
            if(input.value){
                formData.append(input.name, input.value);
            }else{
                _option = false;
            }
        });

        if(!_option) return;

        allInput.forEach(input=>input.disabled=true);
        submit.classList.add("none")
        submit.style.cursor="wait";
        fetch(url_api+"login", {
            method:"POST",
            body:new URLSearchParams(formData)
        })
        .then(res=>res.json())
        .then(success=>{
            if(success.message){
                allInput.forEach(input=>{input.disabled=false; input.hidden=false});
                message.innerHTML = success.message;
                message.hidden = false;
                submit.style.cursor="pointer";
                submit.classList.remove("none");
                console.log(submit.hidden)
                message.classList.remove("success");
                message.classList.add("error");
            }else{
                console.log(success)
                allInput.forEach(input=>{input.disabled=false; input.hidden=true});
                submit.classList.remove("block")
                submit.classList.add("none")
                message.hidden = false;
                message.innerHTML = "Connexion réussie !";
                h2.innerHTML = "FELICITATION";
                h3.innerHTML = "Succès";
                message.classList.remove("error");
                message.classList.add("success");
                save_cookie(success)
                setTimeout(() => {
                    window.location.href = "/portefeuil";
                }, 3000);
            }
        })
    }

    return (
        <form id="msform" onSubmit={savin_login}>
            <canvas id="myChart" className="campaign ct-charts" hidden></canvas>
            <ul id="progressbar">
            </ul>
            <fieldset>
                <a href="/" className="logos"><img src="https://m.media-amazon.com/images/I/61NN9SlsuuL._SX522_.jpg"></img></a>
                <div className="login">
                    <h2 className="fs-title">Authentification</h2>
                    <h3 className="fs-subtitle">Login</h3>
                    <input type="email" name="email" placeholder="Nom d'utilisateur" required/>
                    <input type="password" name="password" placeholder="Mot de passe" required/>
                    <input type="password" name="secret" placeholder="Code de sécurité" required/>
                    <input type="submit" className="next action-button" value="Connexion"/>
                </div>
                <div className="message" hidden>2145</div>
            </fieldset>
        </form>
    )
}

export default Login;