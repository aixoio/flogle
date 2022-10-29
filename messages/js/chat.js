$.getScript(
  "https://www.google.com/recaptcha/api.js?onload=onloadreCaptchaCallback&render=" +
    getreCaptchaSiteKeyV3()
);

let canScoreVerifySend = false;
let scoreVerifyedSend = false;
let canSend = false;
let sendRecapt = null;
let chatData = null;
let userData = null;

function onloadreCaptchaCallback() {
  sendRecapt = grecaptcha.render("recaptchainvbox", {
    sitekey: getreCaptchaSiteKeyInv(),
    size: "invisible",
    callback: async (token) => {
      let reData = await ajax(
        "../../php/recaptchaapi.php",
        {
          mode: "v2inv",
          token: token
        },
        "POST",
        "json"
      );

      if (reData.success) {
        canSend = true;

        if (canScoreVerifySend) {
          scoreVerifyedSend = true;
        }
      } else {
        canSend = false;
      }

      grecaptcha.ready(() => {
        grecaptcha
          .execute(getreCaptchaSiteKeyV3(), {
            action: "Send_Message"
          })
          .then(async (token) => {
            let reV3Data = await ajax(
              "../../php/recaptchaapi.php",
              {
                mode: "v3",
                token: token
              },
              "POST",
              "json"
            );

            if ((reV3Data.score >= 0.5 || scoreVerifyedSend) && canSend) {
                let message = $("#messageE").val();
                if (message == "") return;
                let sended = await ajax(
                  "../../php/sendmessage.php",
                  {
                    chatID: chatData[0].id,
                    fromID: userData[0].id,
                    message: message,
                    chatUUID: chatData[0].uuid,
                    time: Date.now()
                  },
                  "POST",
                  "json"
                );
                if (sended[0]) {
                  $("#messageE").val("");
                } else {
                  alert("Error");
                }
            } else {
              canScoreVerifySend = true;
              canSend = false;
              grecaptcha.reset(sendRecapt);
              grecaptcha.execute(sendRecapt);
            }
          });
      });
    }
  });
}

$(window).on("load", async function () {
  if ($("#canStay").text() != "1") {
    location.href = "../../login.html";
  }

  let username = $("#userName").text();

  userData = await ajax(
    "../../php/getuserbyusername.php",
    {
      username: username
    },
    "POST",
    "json"
  );

  if (userData.length <= 0) {
    location.href = "../../login.html";
  }

  chatData = await ajax(
    "../../php/getchatdatabychatuuid.php",
    {
      chatUUID: $("#chatUUID").text()
    },
    "POST",
    "json"
  );

  if (chatData.length <= 0) {
    location.href = "index.php";
  }

  let otherUserID =
    chatData[0].from_id == userData[0].id
      ? chatData[0].to_id
      : chatData[0].from_id;

  let otherUserData = await ajax(
    "../../php/getuserbyuserid.php",
    {
      id: otherUserID
    },
    "POST",
    "json"
  );

  if (otherUserData.length <= 0) {
    let good = await ajax(
      "../../php/deletechat.php",
      {
        chatID: chatData[0].id
      },
      "POST",
      "json"
    );

    if (good[0]) {
      location.href = "index.php";
    } else {
      alert("Error!");
    }

    location.href = "index.php";
  }

  $(document).on("keydown", async function (evt) {
    if (evt.key == "Enter") {
      await sendMessage(userData[0], chatData[0]);
    }
  });

  $("#backToChats").on("click", function () {
    location.href = "index.php";
  });

  $("#toMessage").text(`To: ${otherUserData[0].username}`);

  await loadMessages(userData[0]);

  $("#sendBtn").on("click", async function () {
    await sendMessage(userData[0], chatData[0]);
  });

  $("#getDown").on("click", function () {
    downloadChat(chatData[0], userData[0], otherUserData[0]);
  });

  setInterval(async function () {
    loadMessages(userData[0]);
  }, 2000);
});

async function loadMessages(userData) {
  let messages = await ajax(
    "../../php/loadallmessagesbychatuuid.php",
    {
      chatUUID: $("#chatUUID").text()
    },
    "POST",
    "json"
  );

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
    text.text(atob(currMess.message));

    rapper.on("click", function () {
      location = "messageactions.php?messageid=" + messages[i].id;
    });

    let d = new Date(+currMess.time);

    rapper.attr("title", d.toDateString() + "\n" + d.toTimeString());

    rapper.append(text);

    $(".messs").append(rapper);

    if (i == messages.length - 1) {
      rapper[0].scrollIntoView();
    }
  }
}

async function sendMessage(userData, chatData) {
  grecaptcha.ready(() => {
    canScoreVerifySend = false;
    scoreVerifyedSend = false;
    canSend = false;
    grecaptcha.reset(sendRecapt);
    grecaptcha.execute(sendRecapt);
  });
}

async function downloadChat(chatData, userData, otherUserData) {
  let messages = await ajax(
    "../../php/loadallmessagesbychatuuid.php",
    {
      chatUUID: $("#chatUUID").text()
    },
    "POST",
    "json"
  );

  let script = `Transcript of "${chatData.title}"\n\n`;

  for (let i = 0; i < messages.length; i++) {
    let messageSenderUsername =
      messages[i].from_id == userData.id
        ? userData.username
        : otherUserData.username;

    let line = `${new Date(
      +messages[i].time
    ).toString()}, ${messageSenderUsername}: ${atob(messages[i].message)}\n`;

    script += line;
  }

  let fileData = script;

  let a = $("<a></a>");

  a.attr(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(fileData)
  );

  a.attr("download", chatData.title + ".txt");

  a.hide();

  $("body").append(a);

  a.hide();

  a[0].click();

  a.hide();

  a.remove();
}
