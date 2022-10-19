$(window).on("load", function () {

    $(".resultData").hide();
    $(".captcha").hide();
    
    $("#lookupUser").on("click", async function () {
        
        $(".askForUser").hide();

        $(".captcha").show();

        textfCaptcha(".captcha", async () => {

            $(".captcha").empty();
            $(".captcha").hide();

            let usernameIn = $("#userNameIn").val();

            let userData = await ajax("../../php/getuserbyusername.php", {

                username: usernameIn

            }, "POST", "json");

            if (userData.length <= 0) {

                $(".askForUser").show();
                $(".captcha").empty();
                $(".captcha").hide();
                return;

            }

            let acoinData = await ajax("../../php/getacoininfobyusername.php", {

                username: userData[0].username

            }, "POST", "json");

            if (acoinData.length <= 0) {

                $(".askForUser").show();
                $(".captcha").empty();
                $(".captcha").hide();
                return;

            }

            $(".resultData").show();

            $("#usernameR").text(`Username: ${userData[0].username}`);
            $("#acoinsR").text(`aCoins: ${acoinData[0].acoins}`);
            $("#lockedR").text(acoinData[0].locked == "1" ? "This user is locked" : "This user is unlocked");
            $("#adminR").text(acoinData[0].admin == "1" ? "This user is an admin" : "This user is not an admin");

        }, null, null, null, true, "Enter the text you see to lookup that user", "center")


    })

})