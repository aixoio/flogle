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

    $("#sizeE").text(formatBytes(new Blob([docData[0].data]).size), 2);


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
        
        document.execCommand("fontSize", true, $("#sizeE").val());

    })

    $("#cenE").on("click", function () {
        
        document.execCommand("justifyCenter");

    })

    $("#fullE").on("click", function () {
        
        document.execCommand("justifyFull");

    })

    $("#leftE").on("click", function () {

        document.execCommand("justifyLeft");

    })

    $("#rightE").on("click", function () {

        document.execCommand("justifyRight");

    })

    $("#resetE").on("click", function () {
        
        document.execCommand("removeFormat");

    })

    $("#sE").on("click", function () {

        document.execCommand("strikeThrough");

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
            $("#sizeE").text(formatBytes(new Blob([docData[0].data]).size), 2);

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

function formatBytes(bytes, decimals = 2) { // This is just from stackoverflow link: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript

    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
