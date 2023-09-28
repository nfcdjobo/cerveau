function Index(props) {
    return (
            <body className="hero-anime" id="hero-anime">

                <div className="navigation-wrap bg-light start-header start-style">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <nav className="navbar navbar-expand-md navbar-light">

                                    <a className="navbar-brand" href="/">
                                        <img src="https://m.media-amazon.com/images/I/61NN9SlsuuL._SX522_.jpg" alt=""/>
                                    </a>

                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>

                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section full-height">
                    <div className="absolute-center">
                        <div className="section">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <h1><span>C</span><span>E</span><span>R</span><span>V</span><span>E</span><span>A</span><span>U</span><br/>
                                            <span>M</span><span>O</span><span>N</span><span>E</span><span>Y</span></h1>
                                        <p>Facitité le quotidien avec le paiement digitale, rapide et sécurisé en tous lieu et en tous temps</p>
                                        <p className="params-login-all"><a href="/login">Se connecter</a> <a href="/register">Créer un compte</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section mt-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <div id="switch">
                                            <div id="circle"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-5 py-5">
                </div>

                <canvas id="myChart" className="campaign ct-charts" hidden></canvas>
            </body>

    )
}

export default Index;