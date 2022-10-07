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

async function loadJSBtns(userData, acoinData) {

    $(".btns-gen").empty();
    
    let lockBtn = $("<button></button>");

    lockBtn.text("Lock");
    lockBtn.addClass("btn btn-primary");

    lockBtn.on("click", async function () {
        
        let result = await ajax("../../php/lockacoin.php", {

            userID: userData.id

        }, "POST", "json");

        if (result[0]) {

            reloadThis();

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

            reloadThis();

        }

    })


    $(".btns-gen").append(lockBtn);
    $(".btns-gen").append(unlockBtn);

    async function reloadThis() {
        
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

        $("#acoinsENum").text(`aCoins: ${acoinDataNew[0].acoins}`);

        loadJSBtns(userDataNew[0], acoinDataNew[0]);

    }

    if (await isAdmin(userData.username)) {

        let addACoin = $("<button></button>");
        let removeACoin = $("<button></button>");
        let enableMineing = $("<button></button>");
        let disableMineing = $("<button></button>");

        addACoin.addClass("btn btn-warning");
        addACoin.text("Add aCoins");

        removeACoin.addClass("btn btn-warning");
        removeACoin.text("Remove aCoins");

        enableMineing.addClass("btn btn-warning");
        enableMineing.text("Enable aCoin Mining");

        disableMineing.addClass("btn btn-warning");
        disableMineing.text("Disable aCoin Mining");

        removeACoin.on("click", function () {
            
            let rapper = $("<div></div>");

            let message = $("<span></span>");

            let yBtn = $("<button></button>");
            let nBtn = $("<button></button>");



            nBtn.on("click", function () {
                
                rapper.remove();

            })

            
            let inputE = $("<input></input>");

            yBtn.on("click", async function () {
                
                let num = inputE.val();

                if (num == "") return;

                rapper.hide();

                let added = await ajax("../../php/removeacoin.php", {

                    userID: userData.id,
                    acoins: num

                }, "POST", "json");



                if (added[0]) {

                    rapper.remove();

                    reloadThis();

                } else {

                    rapper.show();

                }

            })

            message.text("Enter the number of aCoin you want to remove");

            yBtn.addClass("btn btn-primary");
            yBtn.text("Add");

            nBtn.addClass("btn btn-secondary");
            nBtn.text("Cancel");

            inputE.attr("step", "any");
            inputE.attr("type", "number");


            rapper.append($("<hr>"));
            rapper.append(message);
            rapper.append($("<br>"));
            rapper.append(inputE);
            rapper.append(yBtn);
            rapper.append(nBtn);



            disableMineing.after(rapper);

        })

        addACoin.on("click", function () {
            
            let rapper = $("<div></div>");

            let message = $("<span></span>");

            let yBtn = $("<button></button>");
            let nBtn = $("<button></button>");



            nBtn.on("click", function () {
                
                rapper.remove();

            })

            
            let inputE = $("<input></input>");

            yBtn.on("click", async function () {
                
                let num = inputE.val();

                if (num == "") return;

                rapper.hide();

                let added = await ajax("../../php/addacoin.php", {

                    userID: userData.id,
                    acoins: num

                }, "POST", "json");



                if (added[0]) {

                    rapper.remove();

                    reloadThis();

                } else {

                    rapper.show();

                }

            })

            message.text("Enter the number of aCoin you want to add");

            yBtn.addClass("btn btn-primary");
            yBtn.text("Add");

            nBtn.addClass("btn btn-secondary");
            nBtn.text("Cancel");

            inputE.attr("step", "any");
            inputE.attr("type", "number");


            rapper.append($("<hr>"));
            rapper.append(message);
            rapper.append($("<br>"));
            rapper.append(inputE);
            rapper.append(yBtn);
            rapper.append(nBtn);



            disableMineing.after(rapper);

        })

        enableMineing.on("click", async function () {
            
            if (await isAdmin(userData.username)) {

                let set = await ajax("../../php/changecanmineacoin.php", {

                    newState: 1

                }, "POST", "json");

                if (set[0]) {

                    reloadThis();

                }

            }

        })

        disableMineing.on("click", async function () {
            
            if (await isAdmin(userData.username)) {

                let set = await ajax("../../php/changecanmineacoin.php", {

                    newState: 0

                }, "POST", "json");

                if (set[0]) {

                    reloadThis();

                }

            }

        })

        let canMine = await ajax("../../php/canmineacoin.php", null, "GET", "json");

        if (canMine[0].canMine == "1") {

            enableMineing.addClass("disabled");
            disableMineing.removeClass("disabled");

        } else {

            enableMineing.removeClass("disabled");
            disableMineing.addClass("disabled");

        }


        $(".btns-gen").append(addACoin);
        $(".btns-gen").append(removeACoin);
        $(".btns-gen").append(enableMineing);
        $(".btns-gen").append(disableMineing);

    }

}