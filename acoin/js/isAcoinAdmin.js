async function isAdmin(username) {

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

    return (acoinData[0].admin == "1");

}