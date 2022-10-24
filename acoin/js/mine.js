$.getScript("https://www.google.com/recaptcha/api.js?onload=onloadreCaptchaCallback&render=" + getreCaptchaSiteKeyV3());

let scoreVerifyed = false;
let canScoreVerify = false;
let tick = 0;
let acoins = 0;
let ismineing = true;

function onloadreCaptchaCallback() {


    let recaptcha = grecaptcha.render("clamacoinBtn", {

        "sitekey": getreCaptchaSiteKeyInv(),
        "callback": async (token) => {
            
            let reInvData = await ajax("../../php/recaptchaapi.php", {
                
                mode: "v2inv",
                token: token
                
            }, "POST", "json");
            
            if (reInvData.success && canScoreVerify) {
    
                scoreVerifyed = true;
    
            }

            grecaptcha.ready(function () {

                grecaptcha.execute(getreCaptchaSiteKeyV3(), {

                    action: "aCoin_Miner_Claim"

                }).then(async (token) => {

                
                    let reV3Data = await ajax("../../php/recaptchaapi.php", {

                        mode: "v3",
                        token: token

                    }, "POST", "json");

                    let canMine = await ajax("../../php/canmineacoin.php", null, "GET", "json");

                    if (reV3Data.score >= 0.5 || scoreVerifyed) {

                        let userData = await ajax("../../php/getuserbyusername.php", {

                            username: $("#userName").text()

                        }, "POST", "json");

                        if (userData.length <= 0) {

                            location.href = "../login.html";

                        }

                        let acoinData = await ajax("../../php/getacoininfobyusername.php", {

                            username: userData[0].username

                        }, "POST", "json");

                        if (acoinData.length <= 0) {

                            let good = await ajax("../../php/setupacoinbyuserid.php", {

                                userID: userData[0].id

                            }, "POST", "json");

                            if (!good[0]) {

                                location.href = "../login.html";

                            }

                            acoinData = await ajax("../../php/getacoininfobyusername.php", {

                                username: userData[0].username

                            }, "POST", "json");

                        }
                        
                        ismineing = false;

                        let good = await ajax("../../php/addacoin.php", {

                            userID: userData[0].id,
                            acoins: acoins

                        }, "POST", "json");

                        if (good[0]) {

                            location.href = "tools.php";

                        }

                    } else {

                        canScoreVerify = true;
                        grecaptcha.reset(recaptcha);
                        grecaptcha.execute(recaptcha);

                    }

                })

            })



        }

    })

}


$(window).on("load", async function () {
    
    
    let canMine = await ajax("../../php/canmineacoin.php", null, "GET", "json");

    if (canMine[0].canMine == "0") {

        location.href = "index.php";

    }
    


    $("#clamacoinBtn").on("click", async function () {

        $(".main").hide();

    })

    let userData = await ajax("../../php/getuserbyusername.php", {

            username: $("#userName").text()

        }, "POST", "json");

        if (userData.length <= 0) {

            location.href = "../login.html";

        }

    let acoinData = await ajax("../../php/getacoininfobyusername.php", {

        username: userData[0].username

    }, "POST", "json");

    if (acoinData.length <= 0) {

        let good = await ajax("../../php/setupacoinbyuserid.php", {

                userID: userData[0].id

            }, "POST", "json");

        if (!good[0]) {

            location.href = "../login.html";

        }

         acoinData = await ajax("../../php/getacoininfobyusername.php", {

            username: userData[0].username

        }, "POST", "json");


    }

    let mineCode = btoa(`user_id=${userData[0].id}
acoin_id=${acoinData[0].id}`);

    $("#mcE").text(`Your aCoin mine app code is ${mineCode}`);
    
    
    setInterval(async () => {

        if (ismineing) {

            tick ++;
            acoins += 0.018;

            if (tick > 60) {

                tick = 0;

            }

            let barPro = $("#barpre");

            barPro.css("width", `${((tick / 60) * 100).toFixed(2)}%`);
            barPro.text(`${Math.floor((tick / 60) * 100)}%`);

            $("#totalRnE").text(`aCoins: ${acoins}`)

        }

    }, (1000 / 1));

})