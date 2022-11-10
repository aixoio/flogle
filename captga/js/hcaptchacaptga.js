$(window).on("load", async () => {
  let loggedin = true;

  let userData = null;

  if ($("#canStay").text() != "1") {
    loggedin = false;
  } else {
    loggedin = true;
  }

  initCaptgaSocre(loggedin);

  let hcap = hcaptcha.render("hcaptcha", {
    sitekey: gethCaptchaSiteKey(),
    callback: async (token) => {
      let hcaptData = await ajax(
        "../../php/hcaptchaapi.php",
        {
          token: token
        },
        "POST",
        "json"
      );

      if (hcaptData.success) {
        let userData = await ajax(
          "../../php/getuserbyusername.php",
          {
            username: $("#usernameE").text()
          },
          "POST",
          "json"
        );

        await addCaptgaScore(loggedin ? userData[0].id : -1, 24);

        location.href = "index.php";
      } else {
        hcaptcha.reset(hcap);
      }
    }
  });
});
