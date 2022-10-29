$.getScript(
  "https://www.google.com/recaptcha/api.js?onload=onloadreCaptchaCallback&render=" +
    getreCaptchaSiteKeyV3()
);

let scoreVerifyedNew = false;
let canScoreVerifyNew = false;
let canMakeNewDoc = false;
let recaptNew = null;

let scoreVerifyedUpload = false;
let canScoreVerifyUpload = false;
let canUploadDoc = false;
let recaptUpload = null;

let userData = null;

function onloadreCaptchaCallback() {
  recaptNew = grecaptcha.render("newDocBtn", {
    sitekey: getreCaptchaSiteKeyInv(),
    callback: async (token) => {
      let reData = await ajax(
        "../../php/recaptchaapi.php",
        {
          mode: "v2inv",
          token: token
        },
        "POST",
        "json"
      );

      if (reData.success) {
        canMakeNewDoc = true;

        if (canScoreVerifyNew) {
          scoreVerifyedNew = true;
        }
      } else {
        canMakeNewDoc = false;
      }

      grecaptcha.ready(() => {
        grecaptcha
          .execute(getreCaptchaSiteKeyV3(), {
            action: "New_Doc"
          })
          .then(async (token) => {
            let reV3Data = await ajax(
              "../../php/recaptchaapi.php",
              {
                mode: "v3",
                token: token
              },
              "POST",
              "json"
            );

            if ((reV3Data.score >= 0.5 || scoreVerifyedNew) && canMakeNewDoc) {
              let docUUID = uuid(45);
              let result = await ajax(
                "../../php/newdocument.php",
                {
                  docUUID: docUUID,
                  docTitle: "New document",
                  docUser_ID: userData[0].id,
                  docData: ""
                },
                "POST",
                "json"
              );
              if (result[0]) {
                location.href = "edit.php?docid=" + docUUID;
              }
            } else {
              canScoreVerifyNew = true;
              canMakeNewDoc = false;
              grecaptcha.reset(recaptNew);
              grecaptcha.execute(recaptNew);
            }
          });
      });
    }
  });

  recaptUpload = grecaptcha.render("recaptchaUploadInvV2", {
    sitekey: getreCaptchaSiteKeyInv(),
    size: "invisible",
    callback: async (token) => {
      let reData = await ajax(
        "../../php/recaptchaapi.php",
        {
          mode: "v2inv",
          token: token
        },
        "POST",
        "json"
      );

      if (reData.success) {
        canUploadDoc = true;

        if (canScoreVerifyUpload) {
          scoreVerifyedUpload = true;
        }
      } else {
        canUploadDoc = false;
      }

      grecaptcha.ready(() => {
        grecaptcha
          .execute(getreCaptchaSiteKeyV3(), {
            action: "Upload_Doc"
          })
          .then(async (token) => {
            let reV3Data = await ajax(
              "../../php/recaptchaapi.php",
              {
                mode: "v3",
                token: token
              },
              "POST",
              "json"
            );

            if (
              (reV3Data.score >= 0.5 || scoreVerifyedUpload) &&
              canUploadDoc
            ) {
              const reader = new FileReader();
              reader.onload = function () {
                const text = reader.result;

                uploadDoc(text, userData);
              };
              reader.readAsText($("#fileUE")[0].files[0]);
            } else {
              canScoreVerifyUpload = true;
              canUploadDoc = false;
              grecaptcha.reset(recaptUpload);
              grecaptcha.execute(recaptUpload);
            }
          });
      });
    }
  });
}

$(window).on("load", async function () {
  if ($("#canStay").text() != "1") {
    location.href = "../../login.html";
  }

  let username = $("#userName").text();

  userData = await ajax(
    "../../php/getuserbyusername.php",
    {
      username: username
    },
    "POST",
    "json"
  );

  if (userData.length <= 0) location.href = "../../login.html";

  loadDocs(userData);

  $("#backToDash").on("click", function () {
    location.href = "../../dash.php";
  });

  $("#uploadBtb").on("click", function () {
    $("#fileUE")[0].click();
  });

  $("#fileUE").on("input", function () {
    grecaptcha.reset(recaptUpload);
    grecaptcha.execute(recaptUpload);
  });
});

async function loadDocs(userData) {
  let docs = await ajax(
    "../../php/getdocsbyuserid.php",
    {
      userid: userData[0].id
    },
    "POST",
    "json"
  );

  $(".docsbox").empty();

  for (let i = 0; i < docs.length; i++) {
    let rapper = $("<div></div");

    let title = $("<span></span>");

    title.text(docs[i].title);
    title.css("font-size", "200%");

    let delBtn = $("<button></button>");

    delBtn.addClass("btn btn-danger");
    delBtn.append(
      $("<img></img")
        .attr("src", "../../images/trash.svg")
        .width(32)
        .height(32)
        .attr("alt", "Delete")
    );

    delBtn.on("click", function () {
      let del_rapper = $("<div></div");

      let message = $("<span></span>");

      let yBtn = $("<button></button>");
      let nBtn = $("<button></button>");

      message.text(
        `Are you sure you want to permanently delete "${docs[i].title}"?`
      );

      yBtn.addClass("btn btn-danger");
      yBtn.text("Yes");

      nBtn.addClass("btn btn-primary");
      nBtn.text("No");

      grecaptcha.ready(() => {
        grecaptcha.render(yBtn[0], {
          sitekey: getreCaptchaSiteKeyInv(),
          callback: async (token) => {
            let reData = await ajax(
              "../../php/recaptchaapi.php",
              {
                mode: "v2inv",
                token: token
              },
              "POST",
              "json"
            );

            
            if (reData.success) {
              let result = await ajax(
                "../../php/deletedoc.php",
                {
                  docID: docs[i].id
                },
                "POST",
                "json"
              );
              if (result[0]) {
                loadDocs(userData);
              }
            }

          }
        });
      });

      nBtn.on("click", function () {
        del_rapper.remove();
      });

      del_rapper.append(message);
      del_rapper.append($("<br>"));
      del_rapper.append(yBtn);
      del_rapper.append(nBtn);

      del_rapper.hide();

      del_rapper.fadeIn("fast");

      delBtn.after(del_rapper);
    });

    rapper.attr("title", formatBytes(new Blob([docs[i].data]).size, 2));

    let docIcon = $("<img></img>");

    docIcon.attr("src", "../../images/docs.svg");
    docIcon.width(64);
    docIcon.height(64);
    docIcon.attr("alt", "Doc");
    docIcon.on("click", function () {
      openDocs(docs[i].uuid);
    });

    let downloadBtn = $("<button></button>");

    downloadBtn.addClass("btn btn-primary");
    downloadBtn.text("Download");

    downloadBtn.on("click", function () {
      downloadDoc(docs[i]);
    });

    delBtn.attr("title", "Delete");

    let openBtn = $("<button></button>");

    openBtn.addClass("btn btn-success");
    openBtn.text("Open");

    openBtn.on("click", function () {
      openDocs(docs[i].uuid);
    });

    rapper.append(docIcon);
    rapper.append(title);
    rapper.append(openBtn);
    rapper.append(downloadBtn);
    rapper.append(delBtn);

    $(".docsbox").append(rapper);

    $(".docsbox").append($("<hr>"));

    title.on("click", function () {
      openDocs(docs[i].uuid);
    });

    function openDocs(docUUID) {
      location.href = "edit.php?docid=" + docUUID;
    }
  }
}

function formatBytes(bytes, decimals = 2) {
  // This is just from stackoverflow link: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript

  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function downloadDoc(docData) {
  let newData = {
    title: docData.title,
    data: docData.data
  };

  newData.md5_hash = md5(JSON.stringify(newData)); // This is for a Checksum NOT for hashing data

  let fileData = btoa(JSON.stringify(newData));

  let a = $("<a></a>");

  a.attr(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(fileData)
  );

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

      let result = await ajax(
        "../../php/newdocument.php",
        {
          docUUID: docUUID,
          docTitle: data.title,
          docUser_ID: userData[0].id,
          docData: atob(data.data)
        },
        "POST",
        "json"
      );

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
