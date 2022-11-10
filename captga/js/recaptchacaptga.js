$(window).on("load", async () => {
  let loggedin = true;

  let userData = null;

  if ($("#canStay").text() != "1") {
    loggedin = false;
  } else {
    loggedin = true;
  }

  initCaptgaSocre(loggedin);

  grecaptcha.ready(() => {
    let recap = grecaptcha.render("recaptcha", {
      sitekey: getreCaptchaSiteKeyCheckbox(),
      callback: async (token) => {
        let recaptData = await ajax(
          "../../php/recaptchaapi.php",
          {
            mode: "v2checkbox",
            token: token
          },
          "POST",
          "json"
        );

        if (recaptData.success) {
          let userData = await ajax(
            "../../php/getuserbyusername.php",
            {
              username: $("#usernameE").text()
            },
            "POST",
            "json"
          );

          await addCaptgaScore(loggedin ? userData[0].id : -1, 12);

          location.href = "index.php";
        } else {
          grecaptcha.reset(recap);
        }
      }
    });
  });
});
