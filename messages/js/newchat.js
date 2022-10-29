$.getScript(
  "https://www.google.com/recaptcha/api.js?onload=onloadreCaptchaCallback&render=" +
    getreCaptchaSiteKeyV3()
);

let scoreVerifyed = false;
let canScoreVerify = false;
let canMakeChat = false;
let recapt = null;

function onloadreCaptchaCallback() {
  recapt = grecaptcha.render("captcha", {
    sitekey: getreCaptchaSiteKeyCheckbox(),
    callback: async (token) => {
      let reData = await ajax(
        "../../php/recaptchaapi.php",
        {
          mode: "v2checkbox",
          token: token
        },
        "POST",
        "json"
      );

      if (reData.success) {
        canMakeChat = true;

        if (canScoreVerify) {
          scoreVerifyed = true;
        }
      } else {
        canMakeChat = false;
      }

      grecaptcha.ready(() => {
        grecaptcha
          .execute(getreCaptchaSiteKeyV3(), {
            action: "New_Chat"
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

            if ((reV3Data.score >= 0.5 || scoreVerifyed) && canMakeChat) {
              canMakeChat = true;
            } else {
              canScoreVerify = true;
              canMakeChat = false;
              scoreVerifyed = false;
              grecaptcha.reset(recapt);
            }
          });
      });
    },
    "expired-callback": () => {
      canMakeChat = false;
      scoreVerifyed = false;
      canScoreVerify = false;
    }
  });
}

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

  $("#makeChatBtn").on("click", async function () {
    if ($("#titleE").val() == "") {
        $("#error").text("Enter a name for this chat!");
        return
    }
    if (!canMakeChat) {

        $("#error").text("You have to verify you are not a robot!")
        return

    }
    let toUserData = await ajax("../../php/getuserbyusername.php", {
        username: $("#toE").val()
    }, "POST", "json");
    if (toUserData.length <= 0) {
        $("#error").text("That user does not exist!");
        return
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
  });
});
