$(window).on("load", async function() {

    $(".loading").hide();
    
    let canSignup = false;

    textfCaptcha(".captcha", () => {

        canSignup = true;
        $(".captcha").empty();

    }, null, null, null, true, "Enter the text you see to signup", "center")

    $("#cUser").on("click", async function() {


        if (canSignup) {

            $(".form").hide();
            $(".loading").show();

            let usernameE = $("#usernameE");
            let passwordE = $("#passwordE");

            let user = {

                username: usernameE.val(),
                password_hash: sha256(passwordE.val())

            }

            if (user.username == "") {

                $(".form").show();
                $(".loading").hide();
                $(".captcha").empty();
                textfCaptcha(".captcha", () => {

                    canSignup = true;
                    $(".captcha").empty();

                }, null, null, null, true, "Enter the text you see to signup", "center")
                return;

            }

            if (passwordE.val() == "") {

                $(".form").show();
                $(".loading").hide();
                $(".captcha").empty();
                textfCaptcha(".captcha", () => {

                    canSignup = true;
                    $(".captcha").empty();

                }, null, null, null, true, "Enter the text you see to signup", "center")
                return;

            }

            let doesThatUser = await ajax("php/getuserbyusername.php", {

                username: user.username

            }, "POST", "json");

            if (doesThatUser.length >= 1) {

                $(".form").show();
                $(".loading").hide();
                $(".captcha").empty();
                textfCaptcha(".captcha", () => {

                    canSignup = true;
                    $(".captcha").empty();

                }, null, null, null, true, "Enter the text you see to signup", "center")
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

            alert("You have to verify you are a human")

        }

    })

});