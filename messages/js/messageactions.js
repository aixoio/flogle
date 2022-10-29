$.getScript(
  "https://www.google.com/recaptcha/api.js?&render=" + getreCaptchaSiteKeyV3()
);

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

  let messageData = await ajax(
    "../../php/getmessagebymessageid.php",
    {
      messagesID: $("#messageID").text()
    },
    "POST",
    "json"
  );

  if (messageData.length <= 0) {
    location.href = "index.php";
  }

  let chatData = await ajax(
    "../../php/getchatdatabychatuuid.php",
    {
      chatUUID: messageData[0].chat_uuid
    },
    "POST",
    "json"
  );

  if (chatData.length <= 0) {
    location.href = "index.php";
  }

  let safeToDelete =
    chatData[0].from_id == userData[0].id ||
    chatData[0].to_id == userData[0].id;

  let isYourMessage = messageData[0].from_id == userData[0].id;

  if (!safeToDelete) {
    location.href = "index.php";
  }

  $("#title").text("Delete");

  let message = $("<span></span>");

  message.text(
    `Are you sure you want to permanently delete the message "${atob(
      messageData[0].message
    )}" in the chat "${chatData[0].title}"?`
  );

  let yBtn = $("<button></button>");
  let nBtn = $("<button></button>");

  yBtn.addClass("btn btn-danger");
  yBtn.text("Yes");

  nBtn.addClass("btn btn-primary");
  nBtn.text("No");

  let canScoreVerifyDel = false;
  let scoreVerifyedDel = false;
  let canDel = false;
  let delRecapt = null;

  grecaptcha.ready(() => {
    delRecapt = grecaptcha.render(yBtn[0], {
      sitekey: getreCaptchaSiteKeyInv(),
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
          canDel = true;

          if (canScoreVerifyDel) {
            scoreVerifyedDel = true;
          }
        } else {
          canDel = false;

          if (canScoreVerifyDel) {
            scoreVerifyedDel = false;
          }
        }

        grecaptcha.ready(() => {
          grecaptcha
            .execute(getreCaptchaSiteKeyV3(), {
              action: "Delete_Message"
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

              if ((reV3Data.score >= 0.5 || scoreVerifyedDel) && canDel) {
                let succed = await ajax(
                  "../../php/deletemessage.php",
                  {
                    messageID: messageData[0].id
                  },
                  "POST",
                  "json"
                );
                if (succed[0]) {
                  location.href = "chat.php?chatUUID=" + chatData[0].uuid;
                }
              } else {
                canScoreVerifyDel = true;
                canDel = false;
                scoreVerifyedDel = false;
                grecaptcha.reset(delRecapt);
                grecaptcha.execute(delRecapt);
              }
            });
        });
      }
    });
  });


  nBtn.on("click", function () {
    location.href = "chat.php?chatUUID=" + chatData[0].uuid;
  });

  $("body").append(message);
  $("body").append($("<br>"));
  $("body").append(yBtn);
  $("body").append(nBtn);

  if (isYourMessage) {
    let editTitle = $("<h1></h1>");

    editTitle.text("Edit");

    let editBoxE = $("<input></input>");
    let editBoxEL = $("<label></label>");

    editBoxE.attr("id", "editBoxE");
    editBoxEL.attr("for", "editBoxE");
    editBoxEL.text("Message:");

    editBoxE.attr("type", "text");
    editBoxE.val(atob(messageData[0].message));

    let changeBtn = $("<button></button>");

    changeBtn.text("Update message");
    changeBtn.addClass("btn btn-primary");

    let cancelBtn = $("<button></button>");

    cancelBtn.text("Cancel");
    cancelBtn.addClass("btn btn-secondary");

    cancelBtn.on("click", function () {
      location.href = "chat.php?chatUUID=" + chatData[0].uuid;
    });

    let canScoreVerifyChange = false;
    let scoreVerifyedChange = false;
    let canChange = false;
    let changeRecapt = null;

    grecaptcha.ready(() => {
      changeRecapt = grecaptcha.render(changeBtn[0], {
        sitekey: getreCaptchaSiteKeyInv(),
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
            canChange = true;

            if (canScoreVerifyChange) {
              scoreVerifyedChange = true;
            }
          } else {
            canChange = false;

            if (canScoreVerifyChange) {
              scoreVerifyedChange = false;
            }
          }

          grecaptcha.ready(() => {
            grecaptcha
              .execute(getreCaptchaSiteKeyV3(), {
                action: "Change_Message"
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

                if (
                  (reV3Data.score >= 0.5 || scoreVerifyedChange) &&
                  canChange
                ) {
                  if (editBoxE.val() != "") {
                    let changed = await ajax(
                      "../../php/editmessagebyid.php",
                      {
                        newMessage: editBoxE.val(),
                        messageID: messageData[0].id
                      },
                      "POST",
                      "json"
                    );

                    if (changed[0]) {
                      location.href = "chat.php?chatUUID=" + chatData[0].uuid;
                    }
                  }
                } else {
                  canScoreVerifyChange = true;
                  canChange = false;
                  scoreVerifyedChange = false;
                  grecaptcha.reset(changeRecapt);
                  grecaptcha.execute(changeRecapt);
                }
              });
          });
        }
      });
    });

    $("body").append(editTitle);
    $("body").append($("<br>"));
    $("body").append(editBoxEL);
    $("body").append(editBoxE);
    $("body").append(changeBtn);
    $("body").append(cancelBtn);
  }
});
