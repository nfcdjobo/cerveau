function FormPortefeuil(props){
    const actived = event=>{
        const parent_form = event.target.closest("form");
        const submit = parent_form.querySelector("#submit");
        parent_form.querySelectorAll("input").forEach(input=>{
            if(input.type==="password") input.value = "";
            input.disabled = false;
            
        })
        event.target.classList.remove("block");
        event.target.classList.add("none");

        submit.classList.remove("none");
        submit.classList.add("block");

    }
    const portefeuil = props.portefeuil;
    return(
        <div className="col-lg-8 col-xlg-9 col-md-7">
            <div className="card">
                <div className="card-body">
                    <form className="form-horizontal form-material mx-2">
                        <div className="row">
                            <div className="col-lg-6 col-xlg-12 col-md-12">
                                <div className="form-group">
                                    <label className="">Adresse Téléphonique</label>
                                    <div className="telephone">
                                        <input type="tel" defaultValue={!Array.isArray(props.portefeuil) ? props.portefeuil.utilisateur.telephone : ""} name="telephone" className="form-control form-control-line" disabled required/>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-xlg-12 col-md-12">
                                <div className="form-group">
                                    <label className="" htmlFor="password">Mot de passe</label>
                                    <div className="">
                                        <input type="password" defaultValue={"0000000000"} name="password" className="form-control form-control-line" disabled required/>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-xlg-12 col-md-12">
                                <div className="form-group">
                                    <label className="" htmlFor="pays">Pays résident</label>
                                    <div className="">
                                        <input type="text" defaultValue={!Array.isArray(props.portefeuil) ? props.portefeuil.utilisateur.pays : ""} name="pays" className="form-control form-control-line" disabled required/>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-xlg-12 col-md-12">
                                <div className="form-group">
                                    <label className="nationalite">Nationalité</label>
                                    <div className="">
                                        <input type="text" defaultValue={!Array.isArray(props.portefeuil) ? props.portefeuil.utilisateur.nationalite : ""} name="nationalite" className="form-control form-control-line" disabled required/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-12">
                                <button type="button" id="actived" className="btn btn-danger text-white" onClick={actived}>Modifier</button>
                                <button type="submit" className="btn btn-success text-white none" id="submit" >Mise à jour</button>
                            </div>
                        </div>
                    </form>
                    
                    <div className="form-horizontal form-material mx-2">

                        <div className="d-md-flex align-items-center">
                            <div>
                                <h4 className="card-title">Statistique des operations</h4>
                                <h5 className="card-subtitle">Aperçu du mois passé</h5>
                            </div>       
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <canvas id="myChart" className="campaign ct-charts"  style={{width:100+"%", maxWidth:50+"rem"}} ></canvas>
                            </div>
                        </div>

                        {/* <div className="row">
                            <div className="col-lg-12 col-xlg-12 col-md-12">
                                
                                <canvas id="myChart" className="campaign ct-charts"  style={{width:100+"%", maxWidth:50+"rem"}} ></canvas>
                                
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormPortefeuil;