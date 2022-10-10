$(window).on("load", async function() {

    $(".loading").hide();

    $("#cUser").on("click", async function() {

        $(".form").hide();
        $(".loading").show();

        let usernameE = $("#usernameE");
        let passwordE = $("#passwordE");

        let user = {

            username: usernameE.val(),
            password_hash: sha256(passwordE.val())

        }

        if (user.username == "") return;

        if (passwordE.val() == "") return;

        let doesThatUser = await ajax("php/getuserbyusername.php", {

            username: user.username

        }, "POST", "json");

        if (doesThatUser.length >= 1) {

            $(".form").show();
            $(".loading").hide();
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



    })

});