

document.addEventListener("DOMContentLoaded", ev => {

}, false);





window.addEventListener("load", ev => {




    setTimeout(() => {

        $(".next").click(function (event) {
            let _option = true;
            const fieldset = event.target.closest("fieldset")
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
            if (!_option) return false;
        });

        if (window.location.href.includes("accueil") || window.location.href.includes("portefeuil") || window.location.href.includes("historiqueTransaction") || window.location.href.includes("historiqueReception")) {

            // const xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160];
            // const xValues = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
            let dataTransaction = [0,0,0,0,0,0,0];
            let dataReception = [0,0,0,0,0,0,0];

            let tokenners = document.getElementById("tokenner") ? document.getElementById("tokenner").textContent : "";
            let urlApi = document.getElementById("tokenner") ? document.getElementById("tokenner").className : "";
            let myTransactions = [];
            let myReceptions = [];
            let premiere = [];
            let deux = [];
            let trois = [];
            let quatre = [];
            let cinq = [];
            let six = [];
            let sept = [];

            let filteReception = [];
            let filterTransaction = [];
            let premiereR = [];
            let deuxR = [];
            let troisR = [];
            let quatreR = [];
            let cinqR = [];
            let sixR = [];
            let septR = [];

            moment.locale("fr");
            const today = new Date();
            const xValues = [];
            
            for (let i = today.getDay() - 7; i < today.getDay(); i++) {
                xValues.push(moment().day(i).format("dddd YYYY-MM-DD"));
            }

            fetch(urlApi + "getTransaction", {
                method: "GET",
                headers: { Authorization: tokenners }
            })
                .then(res => res.json())
                .then(success => {
                    dataTransaction = []
                    if (success.virement.length) {
                        
                        filterTransaction = success.virement.filter(item => (today - 6 * 24 * 60 * 60 * 1000) <= new Date(item.created_at) && new Date(item.created_at) < today);

                        premiere = filterTransaction.filter(item => new Date(item.created_at).getDay() === 0);
                        deux = filterTransaction.filter(item => new Date(item.created_at).getDay() === 1)
                        trois = filterTransaction.filter(item => new Date(item.created_at).getDay() === 2)
                        quatre = filterTransaction.filter(item => new Date(item.created_at).getDay() === 3)
                        cinq = filterTransaction.filter(item => new Date(item.created_at).getDay() === 4)
                        six = filterTransaction.filter(item => new Date(item.created_at).getDay() === 5)
                        sept = filterTransaction.filter(item => new Date(item.created_at).getDay() === 6);
                        
                        myTransactions.push(premiere.length ? premiere.reduce((a, b) => a.montant + b.montant) : 0);
                        myTransactions.push(deux.length ? deux.reduce((a, b) => a.montant + b.montant) : 0);
                        myTransactions.push(trois.length ? trois.reduce((a, b) => a.montant + b.montant) : 0);
                        myTransactions.push(quatre.length ? quatre.reduce((a, b) => a.montant + b.montant) : 0);
                        myTransactions.push(cinq.length ? cinq.reduce((a, b) => a.montant + b.montant) : 0);
                        myTransactions.push(six.length ? six.reduce((a, b) => a.montant + b.montant) : 0);
                        myTransactions.push(sept.length ? sept.reduce((a, b) => a.montant + b.montant) : 0);

                        console.log("...........................1", myTransactions)

                        fetch(urlApi + "getReception", {
                            method: "GET",
                            headers: { Authorization: tokenners }
                        })
                        .then(res => res.json())
                        .then(resultat => {
                            if (resultat.virement.length) {
                                filteReception = resultat.virement.filter(item => (today - 6 * 24 * 60 * 60 * 1000) <= new Date(item.created_at) && new Date(item.created_at) < today);

                                premiereR = filteReception.filter(item => new Date(item.created_at).getDay() === 0);
                                deuxR = filteReception.filter(item => new Date(item.created_at).getDay() === 1)
                                troisR = filteReception.filter(item => new Date(item.created_at).getDay() === 2)
                                quatreR = filteReception.filter(item => new Date(item.created_at).getDay() === 3)
                                cinqR = filteReception.filter(item => new Date(item.created_at).getDay() === 4)
                                sixR = filteReception.filter(item => new Date(item.created_at).getDay() === 5)
                                septR = filteReception.filter(item => new Date(item.created_at).getDay() === 6);
                                
                                myReceptions.push(premiereR.length ? (premiereR.length>1 ? premiereR.reduce((a, b) => a.montant + b.montant): premiereR[0].montant) : 0);
                                myReceptions.push(deuxR.length ?  (deuxR.length>1 ? deuxR.reduce((a, b) => a.montant + b.montant): deuxR[0].montant) : 0);
                                myReceptions.push(troisR.length ?  (troisR.length>1 ? troisR.reduce((a, b) => a.montant + b.montant): troisR[0].montant) : 0);
                                myReceptions.push(quatreR.length ?  (quatreR.length>1 ? quatreR.reduce((a, b) => a.montant + b.montant): quatreR[0].montant) : 0);
                                myReceptions.push(cinqR.length ?  (cinqR.length>1 ? cinqR.reduce((a, b) => a.montant + b.montant): cinqR[0].montant) : 0);
                                myReceptions.push(sixR.length ?  (sixR.length>1 ? sixR.reduce((a, b) => a.montant + b.montant): sixR[0].montant) : 0);
                                myReceptions.push(septR.length ?  (septR.length>1 ? septR.reduce((a, b) => a.montant + b.montant): septR[0].montant) : 0);
                                new Chart("myChart", {
                                    type: "line",
                                    data: {
                                        labels: xValues,
                                        datasets: [
                                            {
                                                label: "Transaction",
                                                data: myTransactions,
                                                borderColor: "red",
                                                fill: false
                                            },
                                            {
                                                label: "Réception",
                                                data: myReceptions,
                                                borderColor: "blue",
                                                fill: false
                                            }
                                        ]
                                    },
                                    options: {
                                        legend: {
                                            display: true,
                                            position: "bottom",
                                            labels: {
                                                fontColor: "#000080",
                                            }
                                        },
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true
                                                }
                                            }]
                                        }
                                    }
                                });
                            }
                        })
                    } else {
                        fetch(urlApi + "getReception", {
                            method: "GET",
                            headers: { Authorization: tokenners }
                        })
                            .then(res => res.json())
                            .then(resultat => {
                                if (resultat.virement.length) {

                                }
                            })
                    }
                })


        }

    }, 500);




}, false);




