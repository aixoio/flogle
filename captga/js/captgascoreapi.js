let storageSaveMethodCaptga = null;


function initCaptgaSocre(loggedin) {

    storageSaveMethodCaptga = "cloud";

    if (localStorage.getItem("captgascore") != null) {

        storageSaveMethodCaptga = "local"

    }

    if (!loggedin) {

        storageSaveMethodCaptga = "local"


    }

    if (localStorage.getItem("captgascore") == null && storageSaveMethodCaptga == "local") {
      localStorage.setItem("captgascore", 0);
    }

}

async function initCloudCaptga(user_id) {

    let setupOn = await ajax("../../php/setupcaptgabyuserid.php", {

        userID: user_id

    }, "POST", "json");

    return setupOn[0];

}

async function getCaptgaScore(user_id) {

    if (storageSaveMethodCaptga == null) initCaptgaSocre();

    if (storageSaveMethodCaptga == "local") {

        return localStorage.getItem("captgascore");

    }

    if (storageSaveMethodCaptga == "cloud") {

        let captgaUserData = await ajax(
          "../../php/getcaptchascorebyuserid.php",
          {
            user_id: user_id
          },
          "POST",
          "json"
        );

        if (captgaUserData.length == 0) {

            await initCloudCaptga(user_id);

            captgaUserData = await ajax(
              "../../php/getcaptchascorebyuserid.php",
              {
                user_id: user_id
              },
              "POST",
              "json"
            );

        }

        return captgaUserData[0].score;



    }

}


async function addCaptgaScore(user_id, add) {

    add = Math.abs(add);

    if (storageSaveMethodCaptga == null) initCaptgaSocre();

    if (storageSaveMethodCaptga == "local") {

        localStorage.setItem(
          "captgascore",
          (+localStorage.getItem("captgascore")) + add
        );

    }

    if (storageSaveMethodCaptga == "cloud") {

        let captgaUserData = await ajax(
          "../../php/getcaptchascorebyuserid.php",
          {
            user_id: user_id
          },
          "POST",
          "json"
        );

        if (captgaUserData.length == 0) {

            await initCloudCaptga(user_id);

            captgaUserData = await ajax(
              "../../php/getcaptchascorebyuserid.php",
              {
                user_id: user_id
              },
              "POST",
              "json"
            );

        }

        let addedCloud = await ajax("../../php/addcaptgascore.php", {

            userID: user_id,
            score: add

        }, "POST", "json");



    }


}


async function setCaptgaScore(user_id, set) {

    if (storageSaveMethodCaptga == null) initCaptgaSocre();

    if (storageSaveMethodCaptga == "local") {

        localStorage.setItem(
          "captgascore",
          +set
        );

    }

    if (storageSaveMethodCaptga == "cloud") {

        let captgaUserData = await ajax(
          "../../php/getcaptchascorebyuserid.php",
          {
            user_id: user_id
          },
          "POST",
          "json"
        );

        if (captgaUserData.length == 0) {

            await initCloudCaptga(user_id);

            captgaUserData = await ajax(
              "../../php/getcaptchascorebyuserid.php",
              {
                user_id: user_id
              },
              "POST",
              "json"
            );

        }

        let setedCloud = await ajax("../../php/setcaptgascore.php", {

            userID: user_id,
            score: set

        }, "POST", "json");




    }


}

async function resetCaptgaScore(user_id) {

    if (storageSaveMethodCaptga == null) initCaptgaSocre();

    if (storageSaveMethodCaptga == "local") {

        localStorage.removeItem("captgascore")

    }

    if (storageSaveMethodCaptga == "cloud") {


      await setCaptgaScore(user_id, 0)


    }


}


