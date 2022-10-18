$(window).on("load", async function() {

    let canLogin = false;

    $(".loading").hide();

    textfCaptcha(".captcha", () => {

        canLogin = true;
        $(".captcha").empty();

    }, null, null, null, false, "Enter the text you see to login", "center")

    $("#cUser").on("click", async function() {

        if (canLogin) {

            $(".loading").show();
            $(".form").hide();

            let usernameE = $("#usernameE");
            let passwordE = $("#passwordE");

            let user = {

                username: usernameE.val(),
                password_hash: sha256(passwordE.val())

            };

            if (user.username == "") {

                $(".loading").hide();
                $(".captcha").empty();
                $(".form").show();
                textfCaptcha(".captcha", () => {

                    canLogin = true;
                    $(".captcha").empty();

                }, null, null, null, false, "Enter the text you see to login", "center")
                return;

            }
            if (passwordE.val() == "") {

                $(".loading").hide();
                $(".captcha").empty();
                $(".form").show();
                textfCaptcha(".captcha", () => {

                    canLogin = true;
                    $(".captcha").empty();

                }, null, null, null, false, "Enter the text you see to login", "center")
                return;

            }

            let userFromDB = await ajax("php/getuserbyusername.php", {

                username: user.username

            }, "POST", "json");

            if (userFromDB.length <= 0) {

                $(".loading").hide();
                $(".captcha").empty();
                $(".form").show();
                textfCaptcha(".captcha", () => {

                    canLogin = true;
                    $(".captcha").empty();

                }, null, null, null, false, "Enter the text you see to login", "center")
                return;

            }

            if (userFromDB[0].password_hash != user.password_hash) {

                $(".loading").hide();
                $(".captcha").empty();
                $(".form").show();
                textfCaptcha(".captcha", () => {

                    canLogin = true;
                    $(".captcha").empty();

                }, null, null, null, false, "Enter the text you see to login", "center")
                return;

            }

            let isNowLogedIn = await ajax("php/loginaction.php", {

                username: user.username

            }, "POST", "json");


            if (isNowLogedIn == true) {

                location.href = "../dash.php";

            }

        } else {

            alert("You have to verify you are a human")

        }
        

    })
    
})