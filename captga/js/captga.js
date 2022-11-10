$(window).on("load", async () => {
  let loggedin = true;

  let userData = null;

  if ($("#canStay").text() != "1") {
    loggedin = false;
    initCaptgaSocre(loggedin);

    $("#scoreID").text(
      await getCaptgaScore(-1)
    );
  } else {
    initCaptgaSocre(loggedin);
    userData = await ajax(
      "../../php/getuserbyusername.php",
      {
        username: $("#usernameE").text()
      },
      "POST",
      "json"
    );

    $("#scoreID").text(
      await getCaptgaScore(userData == null ? -1 : userData[0].id)
    );

    return;
  }
});
