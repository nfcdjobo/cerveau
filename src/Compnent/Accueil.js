import Footer from "./Footer";
import Header from "./Header";

function Accueil(props){
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
                                <h4 className="page-title">Profile</h4>
                                <div className="d-flex align-items-center">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item active" aria-current="page">Profile</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-body">
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
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Resumé</h4>
                                        <div className="feed-widget">
                                            <ul className="list-style-none feed-body m-0 p-b-20">
                                                <li className="feed-item">
                                                    <div className="feed-icon bg-info"><i className="far fa-bell"></i></div> Achat total du mois en cours <span className="ms-auto font-12 text-muted">2.500.000 FCFA</span>
                                                </li>
                                                <li className="feed-item">
                                                    <div className="feed-icon bg-success"><i className="ti-server"></i></div>Achat total du mois passe<span className="ms-auto font-12 text-muted">500.000 FCFA</span>
                                                </li>
                                                <li className="feed-item">
                                                    <div className="feed-icon bg-warning"><i className="ti-shopping-cart"></i></div> Recette du mois en cours<span className="ms-auto font-12 text-muted">800.000 FCFA</span>
                                                </li>
                                                <li className="feed-item">
                                                    <div className="feed-icon bg-danger"><i className="ti-user"></i></div> Recette du mois passé<span className="ms-auto font-12 text-muted">8.050.000 FCFA</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-md-flex">
                                            <div>
                                                <h4 className="card-title">OPERATIONS RECENTES</h4>
                                                <h5 className="card-subtitle">Transactions et Receptions</h5>
                                            </div>
                                            <div className="ms-auto">
                                                <div className="dl">
                                                    <select className="form-select shadow-none">
                                                        <option value="0" selected>Transaction et Réception</option>
                                                        <option value="1">Transaction</option>
                                                        <option value="2">Réception</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- title --> */}
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table v-middle">
                                            <thead>
                                                <tr className="bg-light">
                                                    <th className="border-top-0">REFERENCES</th>
                                                    <th className="border-top-0">NOM</th>
                                                    <th className="border-top-0">PRENOM</th>
                                                    <th className="border-top-0">COMPTE</th>
                                                    <th className="border-top-0">TYPE</th>
                                                    <th className="border-top-0">DATE</th>
                                                    <th className="border-top-0">SOMME</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <h4 className="m-b-0 font-16">Elite Admin</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Single Use</td>
                                                    <td>John Doe</td>
                                                    <td>
                                                        <label className="label label-danger">Angular</label>
                                                    </td>
                                                    <td>46</td>
                                                    <td>356</td>
                                                    <td>
                                                        <h5 className="m-b-0">$2850.06</h5>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <h4 className="m-b-0 font-16">Elite Admin</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Single Use</td>
                                                    <td>Venessa Fern</td>
                                                    <td>
                                                        <label className="label label-info">Vue Js</label>
                                                    </td>
                                                    <td>46</td>
                                                    <td>356</td>
                                                    <td>
                                                        <h5 className="m-b-0">$2850.06</h5>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <h4 className="m-b-0 font-16">Elite Admin</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Single Use</td>
                                                    <td>John Doe</td>
                                                    <td>
                                                        <label className="label label-success">Bootstrap</label>
                                                    </td>
                                                    <td>46</td>
                                                    <td>356</td>
                                                    <td>
                                                        <h5 className="m-b-0">$2850.06</h5>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <h4 className="m-b-0 font-16">Ample Admin</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Single Use</td>
                                                    <td>John Doe</td>
                                                    <td>
                                                        <label className="label label-purple">React</label>
                                                    </td>
                                                    <td>46</td>
                                                    <td>356</td>
                                                    <td>
                                                        <h5 className="m-b-0">$2850.06</h5>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                    
                    <Footer />
                    
                </div>
            </div>
        </>
    )
}

export default Accueil;