$(window).on("load", async function () {
    
    if ($("#canStay").text() != "1") {

        location.href = "../../login.html";

    }

    let username = $("#userName").text();

    let userData = await ajax("../../php/getuserbyusername.php", {

        username: username

    }, "POST", "json");

    if (userData.length <= 0) {

        location.href = "../../login.html";

    }

    $("#makeChatBtn").on("click", async function () {

        if ($("#titleE").val() == "") {

            $("#error").text("Enter a name for this chat!");

        }

        let toUserData = await ajax("../../php/getuserbyusername.php", {

            username: $("#toE").val()

        }, "POST", "json");

        if (toUserData.length <= 0) {

            $("#error").text("That user does not exist!");

        }

        let uid = uuid(45);


        let made = await ajax("../../php/newchatwithdata.php", {

            chatUUID: uid,
            chatTitle: $("#titleE").val(),
            chatFromID: userData[0].id,
            chatToID: toUserData[0].id

        }, "POST", "json");


        if (made[0]) {

            location.href = "index.php";

        } else {

            $("#error").text("Error! :(");

        }

    })

})