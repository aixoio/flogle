$(window).on("load", async function () {
    
    $(".btns").hide();

    if ($("#canStay").text() != "1") {

        location.href = "../login.html";

    }

    await onPageLoad();

    $("#reloadData").on("click", async function () {
        
        await onPageLoad();

    })

    async function onPageLoad() {

        let userData = await ajax("../../php/getuserbyusername.php", {

            username: $("#userName").text()

        }, "POST", "json");

        if (userData.length <= 0) {

            location.href = "../login.html";

        }

        let acoinData = await ajax("../../php/getacoininfobyusername.php", {

            username: userData[0].username

        }, "POST", "json");

        if (acoinData.length <= 0) {

            let good = await ajax("../../php/setupacoinbyuserid.php", {

                userID: userData[0].id

            }, "POST", "json");

            if (!good[0]) {

                location.href = "../login.html";

            }

            acoinData = await ajax("../../php/getacoininfobyusername.php", {

                username: userData[0].username

            }, "POST", "json");

        }

        $("#acoinsENum").text(`aCoins: ${acoinData[0].acoins}`);

        loadJSBtns(userData[0], acoinData[0]);
        
        $(".btns").show();

    }
    
})

function loadJSBtns(userData, acoinData) {

    $(".btns-gen").empty();
    
    let lockBtn = $("<button></button>");

    lockBtn.text("Lock");
    lockBtn.addClass("btn btn-primary");

    lockBtn.on("click", async function () {
        
        let result = await ajax("../../php/lockacoin.php", {

            userID: userData.id

        }, "POST", "json");

        if (result[0]) {

            let userDataNew = await ajax("../../php/getuserbyusername.php", {

                username: $("#userName").text()

            }, "POST", "json");

            if (userDataNew.length <= 0) {

                location.href = "../login.html";

            }

            let acoinDataNew = await ajax("../../php/getacoininfobyusername.php", {

                username: userDataNew[0].username

            }, "POST", "json");

            if (acoinDataNew.length <= 0) {

                let good = await ajax("../../php/setupacoinbyuserid.php", {

                    userID: userDataNew[0].id

                }, "POST", "json");

                if (!good[0]) {

                    location.href = "../login.html";

                }

                acoinDataNew = await ajax("../../php/getacoininfobyusername.php", {

                    username: userDataNew[0].username

                }, "POST", "json");

            }

            loadJSBtns(userDataNew[0], acoinDataNew[0]);

        }
        
    })


    let unlockBtn = $("<button></button>");

    unlockBtn.text("Unlock");
    unlockBtn.addClass("btn btn-primary");

    if (acoinData.locked == "1") {

        lockBtn.addClass("disabled");
        unlockBtn.removeClass("disabled");

    } else if (acoinData.locked == "0") {

        unlockBtn.addClass("disabled");
        lockBtn.removeClass("disabled");

    }

    unlockBtn.on("click", async function () {
        
        let result = await ajax("../../php/unlockacoin.php", {

            userID: userData.id

        }, "POST", "json");

        if (result[0]) {

            let userDataNew = await ajax("../../php/getuserbyusername.php", {

                username: $("#userName").text()

            }, "POST", "json");

            if (userDataNew.length <= 0) {

                location.href = "../login.html";

            }

            let acoinDataNew = await ajax("../../php/getacoininfobyusername.php", {

                username: userDataNew[0].username

            }, "POST", "json");

            loadJSBtns(userDataNew[0], acoinDataNew[0]);

        }

    })


    $(".btns-gen").append(lockBtn);
    $(".btns-gen").append(unlockBtn);

}