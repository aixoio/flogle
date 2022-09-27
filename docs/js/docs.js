$(window).on("load", async function() {

    if ($("#canStay").text() != "1") {

        location.href = "../../login.html";

    }

    let username = $("#userName").text();

    let userData = await ajax("../../php/getuserbyusername.php", {

        username: username

    }, "POST", "json");

    if (userData.length <= 0) location.href = "../../login.html";

    loadDocs(userData);

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

    $("#backToDash").on("click", function () {
        
        location.href = "../../dash.php";

    })

    $("#uploadBtb").on("click", function () {
        
        $("#fileUE")[0].click();

    })

    $("#fileUE").on("input", function () {
        
        const reader = new FileReader();
        reader.onload = function () {
            const text = reader.result;
            
            uploadDoc(text, userData);

        }
        reader.readAsText($("#fileUE")[0].files[0]);

    })

})

async function loadDocs(userData) {

    let docs = await ajax("../../php/getdocsbyuserid.php", {

        userid: userData[0].id

    }, "POST", "json");

    $(".docsbox").empty();

    for (let i = 0; i < docs.length; i++) {

        let rapper = $("<div></div");

        let title = $("<span></span>");

        title.text(docs[i].title);
        title.css("font-size", "200%");

        let delBtn = $("<button></button>");

        delBtn.addClass("btn btn-danger");
        delBtn.append($("<img></img").attr("src", "../../images/trash.svg").width(32).height(32).attr("alt", "Delete"));

        delBtn.on("click", function () {

            let del_rapper = $("<div></div");

            let message = $("<span></span>");

            let yBtn = $("<button></button>");
            let nBtn = $("<button></button>");

            message.html(`Are you sure you want to <b>permanently</b> delete "${docs[i].title}"?`);

            yBtn.addClass("btn btn-danger");
            yBtn.text("Yes");

            nBtn.addClass("btn btn-primary");
            nBtn.text("No");

            yBtn.on("click", async function () {

                let result = await ajax("../../php/deletedoc.php", {

                    docID: docs[i].id

                }, "POST", "json");

                if (result[0]) {

                    loadDocs(userData);

                }

            })

            nBtn.on("click", function () {

                del_rapper.remove();

            })

            del_rapper.append(message);
            del_rapper.append($("<br>"));
            del_rapper.append(yBtn);
            del_rapper.append(nBtn);

            del_rapper.hide();

            del_rapper.fadeIn("fast");

            delBtn.after(del_rapper);

        })

        let docIcon = $("<img></img>");

        docIcon.attr("src", "../../images/docs.svg");
        docIcon.width(64);
        docIcon.height(64);
        docIcon.attr("alt", "Doc");
        docIcon.on("click", function () {

            openDocs(docs[i].uuid);

        })

        let downloadBtn = $("<button></button>");

        downloadBtn.addClass("btn btn-primary");
        downloadBtn.text("Download");

        downloadBtn.on("click", function() {

            downloadDoc(docs[i]);

        })

        delBtn.attr("title", "Delete");

        let openBtn = $("<button></button>");

        openBtn.addClass("btn btn-success");
        openBtn.text("Open");

        openBtn.on("click", function () {
            
            openDocs(docs[i].uuid);

        })

        rapper.append(docIcon);
        rapper.append(title);
        rapper.append(openBtn);
        rapper.append(downloadBtn);
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

}

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

async function uploadDoc(docFileText, userData) {
    
    try {

        let dataStr = atob(docFileText);

        let data = JSON.parse(dataStr);

        let dataNoMD5Hash = {

            title: data.title,
            data: data.data

        };

        let originalHash = data.md5_hash;
        let newHash = md5(JSON.stringify(dataNoMD5Hash)); // This is for a Checksum NOT for hashing data

        if (originalHash == newHash) {

            let docUUID = uuid(45);

            let result = await ajax("../../php/newdocument.php", {


                docUUID: docUUID,
                docTitle: data.title,
                docUser_ID: userData[0].id,
                docData: atob(data.data)

            }, "POST", "json");


            if (result[0]) {

                location.href = "edit.php?docid=" + docUUID;

            }


        } else {

            alert("Can't upload your file because of an error");

        }

    } catch (e) {

        alert("Can't upload your file because of an error");

    }

}