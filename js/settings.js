$(window).on("load", function () {

    if ($("#canStay").text() != "1") {

        location.href = "login.html";

    }
    
    let currUsername = $("#userName").text();

    $("#changeUsername").on("click", function () {
        
        let rapper = $("<div></div>");
        let text = $("<label></label>");
        let usernameE = $("<input></input>");

        let updateBtn = $("<button></button>");
        let cancelBtn = $("<button></button>");

        updateBtn.addClass("btn btn-primary");
        cancelBtn.addClass("btn btn-secondary");

        updateBtn.text("Update");
        cancelBtn.text("Cancel");

        updateBtn.on("click", async function () {
            
            rapper.hide();

            if (usernameE.val() == "") {

                rapper.show();
                return;

            }

            let tempUserData = await ajax("../php/getuserbyusername.php", {

                username: usernameE.val()

            }, "POST", "json");
            
            if (tempUserData.length >= 1) {

                rapper.show();
                return;

            }

            let good = await ajax("../php/changeUsername.php", {

                oldUsername: currUsername,
                newUsername: usernameE.val()

            }, "POST", "json");

            if (good[0]) {

                location.href = "logout.php";

            } else {

                rapper.show();

            }

        })

        cancelBtn.on("click", function () {
            
            rapper.remove();

        })

        text.html("Username:");
        text.attr("for", "usernameETemp1");

        usernameE.attr("id", "usernameETemp1");
        usernameE.attr("type", "text");
        usernameE.val(currUsername);


        rapper.append(text);
        rapper.append(usernameE);
        rapper.append($("<br>"));
        rapper.append(updateBtn);
        rapper.append(cancelBtn);



        
        $("#changeUsername").after(rapper);


    })

    $("#changePassword").on("click", function () {

        let rapper = $("<div></div>");
        let text = $("<label></label>");
        let passE = $("<input></input>");

        let updateBtn = $("<button></button>");
        let cancelBtn = $("<button></button>");

        updateBtn.addClass("btn btn-primary");
        cancelBtn.addClass("btn btn-secondary");

        updateBtn.text("Change");
        cancelBtn.text("Cancel");

        updateBtn.on("click", async function () {

            rapper.hide();

            if (passE.val() == "") return;

            let good = await ajax("../php/changePassword.php", {

                username: currUsername,
                newPassword: sha256(passE.val())

            }, "POST", "json");

            if (good[0]) {

                location.href = "logout.php";

            } else {

                rapper.show();

            }

        })

        cancelBtn.on("click", function () {

            rapper.remove();

        })

        text.html("New Password:");
        text.attr("for", "passE1");

        passE.attr("id", "passE1");
        passE.attr("type", "password");
        passE.val("");


        rapper.append(text);
        rapper.append(passE);
        rapper.append($("<br>"));
        rapper.append(updateBtn);
        rapper.append(cancelBtn);




        $("#changePassword").after(rapper);


    })


    $("#goBack").on("click", function () {
        
        location.href = "dash.php";

    })

})