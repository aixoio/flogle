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

    let chatData = await ajax("../../php/getchatdatabychatuuid.php", {

        chatUUID: $("#chatUUID").text()

    }, "POST", "json");

    if (chatData.length <= 0) {

        location.href = "index.php";

    }

    let otherUserID = chatData[0].from_id == userData[0].id ? chatData[0].to_id : chatData[0].from_id;

    let otherUserData = await ajax("../../php/getuserbyuserid.php", {

        id: otherUserID

    }, "POST", "json");

    if (otherUserData.length <= 0) {

        // delete chat

        location.href = "index.php";

    }

    $(document).on("keydown", async function (evt) {
        
        if (evt.key == "Enter") {

            await sendMessage(userData[0], chatData[0]);

        }

    })

    $("#backToChats").on("click", function () {
        
        location.href = "index.php";

    })
    

    $("#toMessage").text(`To: ${otherUserData[0].username}`);

    await loadMessages(userData[0]);

    $("#sendBtn").on("click", async function () {
        
        await sendMessage(userData[0], chatData[0]);

    })

    setInterval(async function () {
        
        await loadMessages(userData[0]);

    }, 1500)

})

async function loadMessages(userData) {
    
    let messages = await ajax("../../php/loadallmessagesbychatuuid.php", {

        chatUUID: $("#chatUUID").text()

    }, "POST", "json");

    $(".messs").empty();

    for (let i = 0; i < messages.length; i++) {

        let currMess = messages[i];

        let rapper = $("<div></div>");

        rapper.addClass("message-rapper");

        if (currMess.from_id == userData.id) {

            rapper.css("display", "flex");
            rapper.css("justify-content", "end");

        } else {

            rapper.css("display", "flex");
            rapper.css("justify-content", "start");

        }


        let text = $("<span></span>");

        text.addClass(currMess.from_id == userData.id ? "from-self" : "to-self");
        text.text(atob(currMess.message))


        let d = new Date(+currMess.time);


        rapper.attr("title", d.toDateString() + "\n" + d.toTimeString())
        

        rapper.append(text);

        $(".messs").append(rapper);

        if (i == messages.length - 1) {

            rapper[0].scrollIntoView();

        }

    }

}

async function sendMessage(userData, chatData) {

    let message = $("#messageE").val();

    if (message == "") return;

    let sended = await ajax("../../php/sendmessage.php", {

        chatID: chatData.id,
        fromID: userData.id,
        message: message,
        chatUUID: chatData.uuid,
        time: Date.now()

    }, "POST", "json");

    if (sended[0]) {

        $("#messageE").val("");

    } else {

        alert("Error");

    }
    
}