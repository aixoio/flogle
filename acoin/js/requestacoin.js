$.getScript("https://www.google.com/recaptcha/api.js?onload=onloadreCaptchaCallback&render=" + getreCaptchaSiteKeyV3());

let scoreVerifyed = false;
let canScoreVerify = false;
let canTake = false;
let recapt = null;


function onloadreCaptchaCallback() {
    
    recapt = grecaptcha.render("captcha", {

        "sitekey": getreCaptchaSiteKeyCheckbox(),
        "callback": async (token) => {

            let reData = await ajax("../../php/recaptchaapi.php", {

                mode: "v2checkbox",
                token: token

            }, "POST", "json");

            if (reData.success) {

                canTake = true;

                if (canScoreVerify) {

                    scoreVerifyed = true;

                }

            } else {


                canTake = false;

            }

        },
        "expired-callback": () => {

            canTake = false;
            scoreVerifyed = false;

        }

    })

}

$(window).on("load", async function () {
    
    if ($("#canStay").text() != "1") {

        location.href = "../login.html";

    }

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

    $("#requestB").on("click", async function () {
        

        grecaptcha.ready(() => {

            grecaptcha.execute(getreCaptchaSiteKeyV3(), {

                action: "Request_aCoin"

            }).then(async (token) => {

                let reV3Data = await ajax("../../php/recaptchaapi.php", {

                    mode: "v3",
                    token: token

                }, "POST", "json");

                if (reV3Data.score >= 0.5 || scoreVerifyed) {

                    if (canTake) {
            
                        let usernameIN = $("#fromUsernameE").val();
            
                        if (usernameIN == "") {

                            canTake = false;
                            grecaptcha.reset(recapt);
                            return;

                        }

                        if (usernameIN == userData[0].username) {

                            canTake = false;
                            grecaptcha.reset(recapt);
                            return;

                        }
            
                        let usernameData = await ajax("../../php/getuserbyusername.php", {
            
                            username: usernameIN
            
                        }, "POST", "json");
            
                        if (usernameData.length <= 0) {

                            canTake = false;
                            grecaptcha.reset(recapt);
                            return;

                        }
            
                        let acoinDataN = await ajax("../../php/getacoininfobyusername.php", {
            
                            username: usernameData[0].username
            
                        }, "POST", "json");
            
                        if (acoinDataN.length <= 0) {

                            canTake = false;
                            grecaptcha.reset(recapt);
                            return;

                        }
                        
                        if ($("#fromCoinsE").val() == "") {

                            canTake = false;
                            grecaptcha.reset(recapt);
                            return;

                        }

                        if (acoinDataN[0].locked == "1") {

                            canTake = false;
                            grecaptcha.reset(recapt);
                            return;

                        }

                        if ($("#fromCoinsE").val() <= 0) {

                            canTake = false;
                            grecaptcha.reset(recapt);
                            return;

                        }

            
                        if (+$("#fromCoinsE").val() > acoinDataN[0].acoins) {

                            canTake = false;
                            grecaptcha.reset(recapt);
                            return;

                        }
            
                        let taken = await ajax("../../php/requestacoinaction.php", {
            
                            toID: usernameData[0].id,
                            fromID: userData[0].id,
                            acoins: $("#fromCoinsE").val()
            
                        }, "POST", "json");
            
                        if (taken[0]) {
            
                            location.href = "tools.php";
            
                        }
            
                    } else {
            
                        alert("You have to verify you are a human");
            
                    }


                } else {

                    canScoreVerify = true;
                    canTake = false;
                    grecaptcha.reset(recapt);

                }

            })

        })


    })

})