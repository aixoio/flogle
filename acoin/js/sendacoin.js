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
        
        let usernameIN = $("#toUsernameE").val();

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
        
        if ($("#toCoinsE").val() == "") return;

        let sended = await ajax("../../php/sendacoinaction.php", {

            toID: usernameData[0].id,
            fromID: userData[0].id,
            acoins: $("#toCoinsE").val()

        }, "POST", "json");

        if (sended[0]) {

            location.href = "tools.php";

        }

    })

})