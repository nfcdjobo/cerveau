
import url_api from "../api/url_api";
import { get_cookie } from "../cookies/cookies";


function FormFrais(props){
    const cookies = get_cookie("cookies_cerveau");
    if(!cookies) window.location.href = "/login";
    

    fetch(url_api+"getAllFees")
    .then(res=>res.json())
    .then(success=>{
        if(success.frais) return document.getElementById("pourcentage").value = success.frais.pourcentage
    })
    
    const saving_frais = event=>{
        event.preventDefault();
        if(!event.target.pourcentage.value){
            event.target.pourcentage.classList.add("error");
            return event.target.pourcentage.nextSibling.textContent = "Champ obligatoire";
        }
        event.target.pourcentage.classList.remove("error");
        event.target.pourcentage.nextSibling.textContent = "";
        const formData = new FormData();
        formData.append(event.target.pourcentage.name, Number(event.target.pourcentage.value))
        fetch(url_api+"createFeesOrUpdateFees",{
            method:"POST",
            body:new URLSearchParams(formData),
            headers: {Authorization: cookies.token}
        })
        .then(res=>res.json())
        .then(success=>{
            event.target.pourcentage.value = success.frais.pourcentage;
        })
        
    }
    
    return(
        <div className="col-lg-4 col-xlg-12 col-md-6">
            <div className="card">
                <div className="card-body">
                    <form className="form-horizontal form-material mx-2" onSubmit={saving_frais}>
                        <div className="row">
                        <div className="d-md-flex align-items-center">
                            <div>
                                <h4 className="card-title">FRAIS DE TRANSACTION</h4>
                                <h5 className="card-subtitle">Pourcentage (%)</h5>
                            </div>       
                        </div>
                            <div className="col-lg-8 col-xlg-6 col-md-6">
                                <div className="form-group">
                                    <div className="">
                                        <input type="number" step="0.01" name="pourcentage" id="pourcentage" className="form-control form-control-line" min={0} placeholder="Frais de transaction" required/>
                                        <span className="error-data"></span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-xlg-6 col-md-6">
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <button type="submit" id="submit" className="btn btn-danger text-white" >Valider</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    
                    <div className="form-horizontal form-material mx-2">
                        <div className="row">
                            <div className="col-lg-12">
                                <canvas id="myChart" className="campaign ct-charts"  style={{width:100+"%", maxWidth:50+"rem"}} hidden></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormFrais;