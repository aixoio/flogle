$.getScript("https://www.google.com/recaptcha/api.js?onload=onloadreCaptchaCallback&render=" + getreCaptchaSiteKeyV3());

let canSignup = false;
let recaptcha = null;
let scoreVerifyed = false;
let canVerifyScore = false;

function onloadreCaptchaCallback() {


    recaptcha = grecaptcha.render("captcha", {
        "sitekey": getreCaptchaSiteKeyCheckbox(),
        "callback": async (token) => {

            let data = await ajax("php/recaptchaapi.php", {

                mode: "v2checkbox",
                token: token

            }, "POST", "json");

            if (data.success) {

                canSignup = true;

                if (canVerifyScore) {

                    scoreVerifyed = true;

                }

            } else {

                canSignup = false;

                if (canVerifyScore) {

                    scoreVerifyed = false;

                }

            }

        },
        "expired-callback": () => {

            canSignup = false;
            if (canVerifyScore) {

                scoreVerifyed = false;

            }

        }
    });


}


$(window).on("load", async function() {

    $("head").append($(getGA4Code()));

    $(".form").show();

    $(".loading").hide();

    $("#cUser").on("click", async function() {


        if (canSignup) {

            $(".form").hide();
            $(".loading").show();
            
            grecaptcha.ready(() => {
                grecaptcha.execute(getreCaptchaSiteKeyV3(), {
                    action: "Signup"
                }).then(async (token) => {
                    
                    let data = await ajax("php/recaptchaapi.php", {
                        
                        mode: "v3",
                        token: token
                        
                    }, "POST", "json");

                    
                    if (data.score >= 0.5 || scoreVerifyed) {
                        
            
                        let usernameE = $("#usernameE");
                        let passwordE = $("#passwordE");
            
                        let user = {
            
                            username: usernameE.val(),
                            password_hash: sha256(passwordE.val())
            
                        }
            
                        if (user.username == "") {
            
                            $(".form").show();
                            $(".loading").hide();
                            canSignup = false;
                            grecaptcha.reset(recaptcha);
                            return;
            
                        }
            
                        if (passwordE.val() == "") {
            
                            $(".form").show();
                            $(".loading").hide();
                            canSignup = false;
                            grecaptcha.reset(recaptcha);
                            return;
            
                        }
            
                        let doesThatUser = await ajax("php/getuserbyusername.php", {
            
                            username: user.username
            
                        }, "POST", "json");
            
                        if (doesThatUser.length >= 1) {
            
                            $(".form").show();
                            $(".loading").hide();
                            canSignup = false;
                            grecaptcha.reset(recaptcha);
                            return;
            
                        }
            
                        let made = await ajax("php/newuser.php", {
            
                            username: user.username,
                            password_hash: user.password_hash
            
                        }, "POST", "json");
            
                        if (made[0] == true) {
            
                            location.href = "../dash.php";
            
                        } else {
            
                            alert("Error");
                            location.reload();
            
                        }
                        
                    } else {
                        
                        canVerifyScore = true;
                        $(".loading").hide();
                        $(".form").show();
                        canLogin = false;
                        scoreVerifyed = false;
                        grecaptcha.reset(recaptcha);

                    }
                
                })
            })

        } else {

            alert("You have to verify you are a human")

        }

    })

});