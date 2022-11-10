$(window).on("load", async () => {
  let loggedin = true;

  let userData = null;

  let acoins = 0;

  if ($("#canStay").text() != "1") {
    loggedin = false;
    initCaptgaSocre(loggedin);

    $("#scoreID").text(await getCaptgaScore(-1));
    $("#acoinCount").text(Math.abs((await getCaptgaScore(-1)) / 3));
    acoins = Math.abs((await getCaptgaScore(-1)) / 3);
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
    $("#acoinCount").text(
      Math.abs(
        (await getCaptgaScore(userData == null ? -1 : userData[0].id)) / 3
      )
    );
    acoins = Math.abs(
      (await getCaptgaScore(userData == null ? -1 : userData[0].id)) / 3
    );
  }

  if (!loggedin) {
    $("#convert").hide();
    location.href = "index.php";
  }

  $("#convert").on("click", async () => {
    $("#convert").hide();
    $("#loading").show();
    let added = await ajax("../../php/addacoin.php", {

      userID: userData[0].id,
      acoins: acoins

    }, "POST", "json");

    if (added[0] == false) {

      location.reload();

    } else {

      await resetCaptgaScore(userData[0].id);
      location.href = "index.php";

    }

  });
});
