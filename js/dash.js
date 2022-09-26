$(window).on("load", function() {

    $("#logoutBtn").on("click", function() {

        location.href = "logout.php";

    })

    $("#map").on("click", function() {

        location.href = "../maps/index.html";

    })

})