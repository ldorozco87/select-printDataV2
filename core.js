const gileadForm = (function (jQuery, window) {
    "use strict";
    // Variable Definitions
    const JSON_URL = "./countries.json";
    let $DOM = {};

    /* =================== Private methods ================= */
    function _fetchData() {
        fetch(JSON_URL).then(response => {
            return response.json();
        }).then(data => {
            console.log("JSON:", data);

            $DOM.countrySelect.addEventListener("change", function (e) {
                _cleanDrugs();
                _printDrugs(this.value);
            });

            function _findDrugs(country) {
                let resultItems = data.filter(function (currentItem) {
                    return currentItem.Country == country;
                });

                return resultItems[0] ? resultItems[0].Drugs : "N/A";
            }

            function _printDrugs(country) {
                let drugs = _findDrugs(country);
                console.log("country", country);
                console.log("drugs: ", drugs);

                if (drugs !== undefined || drugs.length != 0) {
                    if (drugs === "N/A" || drugs.length == 0) {
                        // const TEMPLATE = document.createElement("div");
                        // TEMPLATE.innerHTML = `<p>N/A</p>`;

                        // $DOM.drugsWrapper.appendChild(TEMPLATE);
                    }
                    if (drugs !== "N/A") {
                        drugs.map((drug) => {
                            $(".drugs-wrapper").find("." + drug).addClass("active");
                        });
                    }
                }
                console.log("\n");
            }

            function _cleanDrugs() {
                $(".drugs-wrapper").find(".active").removeClass("active");
            }

        }).catch(err => {
            const ERR_MSG = document.createElement("div");
            ERR_MSG.innerHTML = `An error occurred fetching your data`;
            console.log("An error occurred fetching your data");

            $DOM.drugsWrapper.appendChild(ERR_MSG);
        });
    }

    /* =================== Public methods ================= */

    // cache $DOM elements
    function cacheDom() {
        $DOM = {
            countrySelect: document.getElementById("selectCountry"),
            drugsWrapper: document.querySelector(".drugs-wrapper")
        };
    }

    // Component Init
    function init() {
        cacheDom();
        _fetchData();
    }

    /* =============== export public methods =============== */
    return {
        init: init
    };
})(jQuery, window);

(function () {
    gileadForm.init();
})();

