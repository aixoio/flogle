$(window).on("load", async () => {
  let loggedin = true;

  let userData = null;

  if ($("#canStay").text() != "1") {
    loggedin = false;

  } else {
    loggedin = true
    
  }

  initCaptgaSocre(loggedin);


  textfCaptcha(".fcaptcha", async () => {

    let userData = await ajax(
      "../../php/getuserbyusername.php",
      {
        username: $("#usernameE").text()
      },
      "POST",
      "json"
    );

    await addCaptgaScore(loggedin ? userData[0].id : -1, 3);

    location.href = "index.php";

  }, null, null, null, true, "Enter the text you see", "center");



});
