$(window).on("load", async function() {


    let map = L.map("map").setView([0, 0], 2);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    getLatLon(map);

    

})

function getLatLon(map) {

    if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(function (position) {
            
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            $("#lat").html("Latitude: " + lat + "&deg;");
            $("#lon").html("Longitude: " + lon + "&deg;");
            $("#accuracy").text("Accuracy: " + position.coords.accuracy);

            

           L.marker([lat, lon]).addTo(map);
           map.setView([lat, lon], 13);

        }, function() {

            $("#lat").hide();
            $("#lon").hide();
            $("#accuracy").hide();

        });

    } else {


        $("#lat").hide();
        $("#lon").hide();
        $("#accuracy").hide();
        

    }

}