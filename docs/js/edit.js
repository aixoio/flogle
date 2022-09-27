$(window).on("load", async function() {

    let uptodateDocData = null;

    if ($("#canStay").text() != "1") {

        location.href = "login.html";

    }

    $("#goBack").on("click", function() {

        location.href = "index.php";

    })

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

    $("#downloadBtn").on("click", function () {
        
        downloadDoc(docData[0]);

    })

    uptodateDocData = docData[0];

    $(".textedit").html(atob(docData[0].data))

    $("#titleI").val(docData[0].title);
    
    $("#colorE").attr("value", "#000000");
    
    $("#isSaved").text("Saved...");


    $("#bE").on("click", function() {

        document.execCommand("bold");

    })

    $("#iE").on("click", function () {
        
        document.execCommand("italic");

    })

    $("#uE").on("click", function () {

        document.execCommand("underline");

    })


    $("#colorE").on("change", function () {

        document.execCommand("foreColor", false, $("#colorE").val());

    })

    $("#changeSize").on("click", function () {
        
        document.execCommand("fontSize", false, $("#sizeE").val());

    })



    $("#saveBtn").on("click", async function() {

        let editE = $(".textedit");

        let data = editE.html();

        let res = await ajax("../../php/savedocbyid.php", {

            docUUID: docData[0].uuid,
            docData: data,
            docTitle: $("#titleI").val()

        }, "POST", "json");

        if (res[0]) {

            $("#isSaved").text("Saved...");

            uptodateDocData.data = btoa(data);
            uptodateDocData.title = $("#titleI").val();

            console.log(uptodateDocData);

        } else {

            $("#isSaved").text("Not Saved...");

        }

    })


    $(".textedit").on("DOMSubtreeModified", function () {
        
        $("#isSaved").text("Not Saved...");

    })

    $(".textedit").on("input", function () {

        $("#isSaved").text("Not Saved...");

    })

    $(".textedit").on("change", function () {

        $("#isSaved").text("Not Saved...");

    })

    $("#titleI").on("DOMSubtreeModified", function () {

        $("#isSaved").text("Not Saved...");

    })

    $("#titleI").on("input", function () {

        $("#isSaved").text("Not Saved...");

    })

    $("#titleI").on("change", function () {

        $("#isSaved").text("Not Saved...");

    })

})

function downloadDoc(docData) {

    let newData = {

        title: docData.title,
        data: docData.data

    };

    newData.md5_hash = md5(JSON.stringify(newData)); // This is for a Checksum NOT for hashing data

    let fileData = btoa(JSON.stringify(newData));

    let a = $("<a></a>");

    a.attr("href", "data:text/plain;charset=utf-8," + encodeURIComponent(fileData));

    a.attr("download", docData.title + ".fogledoc");

    a.hide();

    $("body").append(a);

    a.hide();

    a[0].click();

    a.hide();

    a.remove();

}