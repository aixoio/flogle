$(window).on("load", async function () {
    
    if ($("#canStay").text() != "1") {

        location.href = "../../login.html";

    }

    let docData = await ajax("../../php/loaddocdatabyid.php", {

        docUUID: $("#docID").text()

    }, "POST", "json");

    if (docData.length <= 0) {

        location.href = "index.php";

    }

    let userData = await ajax("../../php/getuserbyusername.php", {

        username: $("#userName").text()

    }, "POST", "json");

    if (userData.length <= 0) {

        location.href = "../signup.html";

    }

    if (docData[0].user_id != userData[0].id) {

        location.href = "index.php";

    }

    $("#backToDoc").on("click", function () {
        
        location.href = "edit.php?docid=" + $("#docID").text();

    });

    $("#exportHTML").on("click", function () {
        
        let htmlDownloadText = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flogle - View - ${docData[0].title}</title>
</head>
    <body>
        ${atob(docData[0].data)}
    </body>
</html>`;

        let a = $("<a></a>");

        a.attr("href", "data:text/plain;charset=utf-8," + encodeURIComponent(htmlDownloadText));

        a.attr("download", docData[0].title + ".html");

        a.hide();

        $("body").append(a);

        a.hide();

        a[0].click();

        a.hide();

        a.remove();

    })

})