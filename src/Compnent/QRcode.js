function QRcode(props){
    const portefeuil = props.portefeuil;
    if(!Array.isArray(props.portefeuil)){
        // Ici on récupère la balise canvas
        const canvas = document.getElementById("qr-code");
        // Puis on récupère le contexte de dessin sur notre composant canevas
        const ctx = canvas.getContext("2d");
        // Ici on récupère la balise img dans laquelle se trouve notre image
        let img_QRcode = document.getElementById("img-QRcode");
        // On écoute l'événemnent load sur notre balise image
        img_QRcode.addEventListener('load', function(){
            // En fin on effectue une copie de notre balise image sur le contexte de dessin sur notre composant canevas
            // absisce = 0, ordonnée= 0, largeur = 300px et hauteur = 150pc
            ctx.drawImage(img_QRcode, 0, 0, 300, 150);
        }, false);
    }

    return(
        <div className="col-lg-4 col-xlg-3 col-md-5">
            <div className="card">
                <div className="card-body">
                    <center className="m-t-30">
                        <h4 className="card-title m-t-10">{!Array.isArray(props.portefeuil) ? props.portefeuil.utilisateur.nom +" "+ props.portefeuil.utilisateur.prenom : ""}</h4>
                        <h6 className="card-subtitle"></h6>
                        <h6  className="card-subtitle">{!Array.isArray(props.portefeuil) ? props.portefeuil.utilisateur.email : ""}</h6>
                        <h6  className="card-subtitle">{!Array.isArray(props.portefeuil) ? props.portefeuil.utilisateur.telephone : ""}</h6>
                        <h4  className="card-title m-t-10">{!Array.isArray(props.portefeuil) ? props.portefeuil.numero_compte : ""}</h4>
                    </center>
                </div>
                <div>
                    <hr/>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-xlg-12 col-md-12">
                        <div className="card qr-code">
                            <div className="card-body text-center" id="card-body">
                                {/* Je défini un composant canvas qui va contenir le déssin (image) */}
                                <canvas id="qr-code"></canvas>
                                {/* Je défini une div en display none (invisible) */}
                                <div style={{display:'none'}}>
                                    {/* Je défini la balise img qui réprésente notre image donc une copie de cette balise sera dans le composant canvas*/}
                                    <img id='img-QRcode' src={!Array.isArray(props.portefeuil) ? props.portefeuil.img_code_qr: ""}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-12 col-xlg-12 col-md-12">
                        <div className="card" id="solde">
                            <div className="card-body text-center">
                                SOLDE
                            </div>
                            <div className="somme-compte">{!Array.isArray(props.portefeuil) ? props.portefeuil.solde : 0} FCFA</div>
                        </div>
                    </div>

                    <div className="col-lg-12 col-xlg-12 col-md-12">
                        <div className="card" id="historique">
                            <a href="/transaction">
                                <div className="card-body text-center">
                                    FAIRE DEPOT
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <br />
                </div>
            </div>
        </div>
    )
}

export default QRcode;