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

    loadMess(userData[0].id);

    $("#backToDash").on("click", function () {
        
        location.href = "../../dash.php";

    })

})

async function loadMess(userID) {
    
    let messs = await ajax("../../php/loadchatsfromuserid.php", {

        userID: userID

    }, "POST", "json");

    for (let i = 0; i < messs.length; i++) {

        let currDat = messs[i];

        let rapper = $("<div></div>");

        rapper.addClass("messRapper");

        let messIcon = $("<img></img>");

        messIcon.attr("src", "../../images/messages.svg");
        messIcon.attr("alt", "Message icon");
        messIcon.width(64).height(64);

        let chatTitle = $("<span></span>");

        chatTitle.text(currDat.title);
        chatTitle.css("font-size", "200%");

        let delBtn = $("<button</button>");

        delBtn.append($("<img></img").attr("src", "../../images/trash.svg").width(32).height(32).attr("alt", "Delete"));
        delBtn.attr("title", "Delete");
        delBtn.addClass("btn btn-danger");

        chatTitle.on("click", function () {
            
            openChat(currDat.uuid);

        })

        messIcon.on("click", function () {

            openChat(currDat.uuid);

        })

        rapper.append(messIcon);
        rapper.append(chatTitle);
        rapper.append(delBtn);


        $("#chats").append(rapper);
        $("#chats").append($("<hr>"));

    }

    function openChat(chatUUID) {

        location.href = "chat.php?chatUUID=" + chatUUID;

    }


}