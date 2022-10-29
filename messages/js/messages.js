$(window).on("load", async function () {
  if ($("#canStay").text() != "1") {
    location.href = "../../login.html";
  }

  let username = $("#userName").text();

  let userData = await ajax(
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

  loadMess(userData[0].id);

  $("#backToDash").on("click", function () {
    location.href = "../../dash.php";
  });

  $("#newChat").on("click", function () {
    location.href = "newchat.php";
  });
});

async function loadMess(userID) {
  let messs = await ajax(
    "../../php/loadchatsfromuserid.php",
    {
      userID: userID
    },
    "POST",
    "json"
  );

  $("#chats").empty();

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

    delBtn.append(
      $("<img></img")
        .attr("src", "../../images/trash.svg")
        .width(32)
        .height(32)
        .attr("alt", "Delete")
    );
    delBtn.attr("title", "Delete");
    delBtn.addClass("btn btn-danger");

    delBtn.on("click", function () {
      let conRapper = $("<div></div>");

      let areYouSure = $("<span></span>");

      areYouSure.text(
        `Are you sure you want to permanently delete the chat "${currDat.title}" and all of it's messages?`
      );

      let yBtn = $("<button></button>");
      let nBtn = $("<button></button>");

      nBtn.addClass("btn btn-primary");
      nBtn.text("No");
      nBtn.css("margin", "15px");

      yBtn.addClass("btn btn-danger");
      yBtn.text("Yes");
      yBtn.css("margin", "15px");

      grecaptcha.ready(() => {
        let delCapt = grecaptcha.render(yBtn[0], {
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
              conRapper.remove();

              let good = await ajax(
                "../../php/deletechat.php",
                {
                  chatID: currDat.id
                },
                "POST",
                "json"
              );

              if (good[0]) {
                loadMess(userID);
              } else {
                alert("Error!");
              }
            }
          }
        });
      });

      yBtn.on("click", async function () {});

      nBtn.on("click", function () {
        conRapper.remove();
      });

      conRapper.append(areYouSure);
      conRapper.append($("<br>"));
      conRapper.append(yBtn);
      conRapper.append(nBtn);

      conRapper.hide();

      delBtn.after(conRapper);

      conRapper.fadeIn("fast");
    });

    let openBtn = $("<button</button>");

    openBtn.addClass("btn btn-success");
    openBtn.text("Open");

    openBtn.on("click", function () {
      openChat(currDat.uuid);
    });

    chatTitle.on("click", function () {
      openChat(currDat.uuid);
    });

    messIcon.on("click", function () {
      openChat(currDat.uuid);
    });

    rapper.append(messIcon);
    rapper.append(chatTitle);
    rapper.append(openBtn);
    rapper.append(delBtn);

    $("#chats").append(rapper);
    $("#chats").append($("<hr>"));
  }

  function openChat(chatUUID) {
    location.href = "chat.php?chatUUID=" + chatUUID;
  }
}
