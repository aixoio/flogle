$(window).on("load", async function () {

    let canMine = await ajax("../../php/canmineacoin.php", null, "GET", "json");

    if (canMine[0].canMine == "0") {

        location.href = "index.php";

    }

    let tick = 0;
    let acoins = 0;

    let ismineing = true;

    $("#clamacoinBtn").on("click", async function () {

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
        
        ismineing = false;

        let good = await ajax("../../php/addacoin.php", {

            userID: userData[0].id,
            acoins: acoins

        }, "POST", "json");

        if (good[0]) {

            location.href = "tools.php";

        }
        
    })
    
    setInterval(async () => {

        if (ismineing) {

            tick ++;
            acoins += 0.018;

            if (tick > 60) {

                tick = 0;

            }

            let barPro = $("#barpre");

            barPro.css("width", `${((tick / 60) * 100).toFixed(2)}%`);
            barPro.text(`${Math.floor((tick / 60) * 100)}%`);

            $("#totalRnE").text(`aCoins: ${acoins}`)

        }

    }, (1000 / 1));

})