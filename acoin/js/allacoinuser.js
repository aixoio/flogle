$(window).on("load", async function () {

    $("head").before($(getGA4Code()));

    let data = await ajax("../../php/getallacoinusers.php", null, "GET", "json");


    for (let i = 0; i < data.length; i++) {

        let rapper = $("<div></div>");

        let placeE = $("<span></span>");

        placeE.html(`<b>${i + 1}.</b>`);

        rapper.append(placeE);

        let userNameE = $("<span></span>");

        userNameE.text(data[i].username);

        rapper.append(userNameE);

        let acoinE = $("<span></span>");

        acoinE.text(data[i].acoins);

        rapper.append(acoinE);

        $(".users").append(rapper);
        $(".users").append($("<hr>"));

    }

})