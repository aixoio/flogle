$(window).on("load", async function() {

    if ($("#canStay").text() != "1") {

        location.href = "../../login.html";

    }

    let username = $("#userName").text();

    let userData = await ajax("../../php/getuserbyusername.php", {

        username: username

    }, "POST", "json");

    if (userData.length <= 0) location.href = "../../login.html";

    let docs = await ajax("../../php/getdocsbyuserid.php", {

        userid: userData[0].id

    }, "POST", "json");

    for (let i = 0; i < docs.length; i++) {

        let rapper = $("<div></div");

        let title = $("<span></span>");

        title.text(docs[i].title);
        title.css("font-size", "200%");

        let delBtn = $("<button></button>");

        delBtn.addClass("btn btn-danger");
        delBtn.append($("<img></img").attr("src", "../../images/trash.svg").width(32).height(32).attr("alt", "Delete"));


        
        let docIcon = $("<img></img>");

        docIcon.attr("src", "../../images/docs.svg");
        docIcon.width(64);
        docIcon.height(64);
        docIcon.attr("alt", "Doc");
        docIcon.on("click", function() {
            
            openDocs(docs[i].uuid);

        })

        rapper.append(docIcon);
        rapper.append(title);
        rapper.append(delBtn);

        $(".docsbox").append(rapper);

        $(".docsbox").append($("<hr>"));

        title.on("click", function () {

            openDocs(docs[i].uuid);

        })

        function openDocs(docUUID) {
            location.href = "edit.php?docid=" + docUUID;
        }

    }

    $("#newDocBtn").on("click", async function() {

        let docUUID = uuid(45);

        let result = await ajax("../../php/newdocument.php", {


            docUUID: docUUID,
            docTitle: "New document",
            docUser_ID: userData[0].id,
            docData: ""

        }, "POST", "json");


        if (result[0]) {

            location.href = "edit.php?docid=" + docUUID;

        }

    })

})