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
        
        let usernameIN = $("#fromUsernameE").val();

        if (usernameIN == "") return;
        if (usernameIN == userData[0].username) return;

        let usernameData = await ajax("../../php/getuserbyusername.php", {

            username: usernameIN

        }, "POST", "json");

        if (usernameData.length <= 0) {

            return;

        }

        let acoinData = await ajax("../../php/getacoininfobyusername.php", {

            username: usernameData[0].username

        }, "POST", "json");

        if (acoinData.length <= 0) {

            return;

        }
        
        if ($("#fromCoinsE").val() == "") return;

        let taken = await ajax("../../php/requestacoinaction.php", {

            toID: usernameData[0].id,
            fromID: userData[0].id,
            acoins: $("#fromCoinsE").val()

        }, "POST", "json");

        if (taken[0]) {

            location.href = "tools.php";

        }

    })

})