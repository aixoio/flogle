$.getScript("https://www.google.com/recaptcha/api.js?onload=onloadreCaptchaCallback&render=" + getreCaptchaSiteKeyV3());

let scoreVerifyed = false;
let canScoreVerify = false;
let canSend = false;
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

                canSend = true;

                if (canScoreVerify) {

                    scoreVerifyed = true;

                }

            } else {


                canSend = false;

            }
            

        },
        "expired-callback": () => {

            canSend = false;

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

    $("#sendB").on("click", async function () {

        grecaptcha.ready(() => {

            grecaptcha.execute(getreCaptchaSiteKeyV3(), {

                action: "Send_aCoin"

            }).then(async (token) => {

                let reV3Data = await ajax("../../php/recaptchaapi.php", {

                    mode: "v3",
                    token: token

                }, "POST", "json");


                if (reV3Data.score >= 0.5 || scoreVerifyed) {

                    if (canSend) {

                        let usernameIN = $("#toUsernameE").val();

                        if (usernameIN == "") {
                            
                            canSend = false;
                            grecaptcha.reset(recapt);
                            return;

                        }

                        if (usernameIN == userData[0].username) {

                            canSend = false;
                            grecaptcha.reset(recapt);
                            return

                        }

                        let usernameData = await ajax("../../php/getuserbyusername.php", {

                            username: usernameIN

                        }, "POST", "json");

                        if (usernameData.length <= 0) {

                            canSend = false;
                            grecaptcha.reset(recapt);
                            return;

                        }

                        let acoinDataN = await ajax("../../php/getacoininfobyusername.php", {

                            username: usernameData[0].username

                        }, "POST", "json");

                        if (acoinDataN.length <= 0) {

                            canSend = false;
                            grecaptcha.reset(recapt);
                            return;

                        }

                        if (acoinDataN[0].locked == "1") {

                            canSend = false;
                            grecaptcha.reset(recapt);
                            return;

                        }

                        if (acoinData[0].locked == "1") {

                            canSend = false;
                            grecaptcha.reset(recapt);
                            return;

                        }

                        if ($("#toCoinsE").val() == "") {

                            canSend = false;
                            grecaptcha.reset(recapt);
                            return;

                        }

                        if ($("#toCoinsE").val() <= 0) {
                            
                            canSend = false;
                            grecaptcha.reset(recapt);
                            return;

                        }
                        

                        let sended = await ajax("../../php/sendacoinaction.php", {

                            toID: usernameData[0].id,
                            fromID: userData[0].id,
                            acoins: $("#toCoinsE").val()

                        }, "POST", "json");

                        if (sended[0]) {

                            location.href = "tools.php";

                        }

                    } else {

                        alert("You have to verify you are a human");

                    }

                } else {

                    canScoreVerify = true;
                    canSend = false;
                    grecaptcha.reset(recapt);

                }

            })

        })

        

    })

})