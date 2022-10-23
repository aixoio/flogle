
function onloadreCaptchaCallback() {
    
    let recaptcha = grecaptcha.render("lookupUser", {

        "sitekey": getreCaptchaSiteKeyInv(),
        "callback": async (token) => {

            let reData = await ajax("../php/recaptchaapi.php", {

                mode: "v2inv",
                token: token

            }, "POST", "json");

            if (reData.success) {

                $(".askForUser").hide();


                let usernameIn = $("#userNameIn").val();

                let userData = await ajax("../../php/getuserbyusername.php", {

                    username: usernameIn

                }, "POST", "json");

                if (userData.length <= 0) {

                    $(".askForUser").show();
                    grecaptcha.reset(recaptcha);
                    return;

                }

                let acoinData = await ajax("../../php/getacoininfobyusername.php", {

                    username: userData[0].username

                }, "POST", "json");

                if (acoinData.length <= 0) {

                    $(".askForUser").show();
                    grecaptcha.reset(recaptcha);
                    return;

                }

                $(".resultData").show();

                $("#usernameR").text(`Username: ${userData[0].username}`);
                $("#acoinsR").text(`aCoins: ${acoinData[0].acoins}`);
                $("#lockedR").text(acoinData[0].locked == "1" ? "This user is locked" : "This user is unlocked");
                $("#adminR").text(acoinData[0].admin == "1" ? "This user is an admin" : "This user is not an admin");


            }

        }

    })

}

$(window).on("load", function () {

    $(".askForUser").show();
    $(".resultData").hide();
    $(".loading").hide();


})