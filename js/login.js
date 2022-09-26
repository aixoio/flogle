$(window).on("load", async function() {

    $(".loading").hide();

    $("#cUser").on("click", async function() {

        let usernameE = $("#usernameE");
        let passwordE = $("#passwordE");

        let user = {

            username: usernameE.val(),
            password_hash: sha256(passwordE.val())

        };

        if (user.username == "") return;
        if (passwordE.val() == "") return;

        let userFromDB = await ajax("php/getuserbyusername.php", {

            username: user.username

        }, "POST", "json");

        if (userFromDB.length <= 0) {

            return;

        }

        if (userFromDB[0].password_hash != user.password_hash) return;

        let isNowLogedIn = await ajax("php/loginaction.php", {

            username: user.username

        }, "POST", "json");


        if (isNowLogedIn == true) {

            location.href = "../dash.php";

        }

        

    })
    
})