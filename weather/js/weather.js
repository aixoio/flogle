let wathercodemap = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light Drizzle",
  53: "Moderate Drizzle",
  55: "Dense Drizzle",
  56: "Light Freezing Drizzle",
  57: "Dense Freezing Drizzle",
  61: "Slight Rain",
  63: "Moderate Rain",
  65: "Heavy Rain",
  66: "Light Freezing Rain",
  67: "Heavy Freezing Rain",
  71: "Slight Snow",
  73: "Moderate Snow",
  75: "Heavy Snow",
  77: "Snow grains",
  80: "Slight Rain Showers",
  81: "Moderate Rain Showers",
  82: "Violent Rain Showers",
  85: "Slight Snow Showers",
  86: "Heavy Snow Showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with slight and heavy hail"
};

$(window).on("load", async function () {
  $("head").append($(getGA4Code()));

  let map = L.map("map").setView([0, 0], 2);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap"
  }).addTo(map);

  async function onMapClick(e) {
    $("#lat").html("Latitude: " + e.latlng.lat + "&deg;");
    $("#lon").html("Longitude: " + e.latlng.lng + "&deg;");
    let wdata = await getWatherData(e.latlng.lat, e.latlng.lng);

    if ("current_weather" in wdata) {
      let marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

      marker
        .bindPopup(
          `Here the current temperature is <b>${
            wdata.current_weather.temperature
          }&deg;C</b><br>${wathercodemap[wdata.current_weather.weathercode]}`
        )
        .openPopup();
    }
  }

  map.on("click", onMapClick);

  getLatLon(map);

  $("#goBtn").on("click", async function () {
    $(".resutls").empty();

    if ($("#numofresutlsE").val() == "") {
      $("#numofresutlsE").val("5");
    }
    if (+$("#numofresutlsE").val() < 1) return;
    if (+$("#numofresutlsE").val() > 100) return;

    let data = await ajax(
      "../../php/geocodeapi.php",
      {
        query: $("#placeE").val(),
        resutls: +$("#numofresutlsE").val()
      },
      "GET",
      "json"
    );

    if ("results" in data) {
      let res = data.results;

      for (let i = 0; i < res.length; i++) {
        let cdata = res[i];

        let rapper = $("<div></div>");

        let img = $("<img></img>");
        let name = $("<h3></h3>");
        let btn = $("<button></button>");

        img.attr(
          "src",
          "https://countryflagsapi.com/png/" + cdata.country_code
        );
        img.addClass("img");

        name.text(cdata.name + " " + cdata.country);

        btn.text("Go!");

        btn.addClass("btn btn-primary btn-sm");

        btn.on("click", async () => {
          let wdata = await getWatherData(cdata.latitude, cdata.longitude);

          if ("current_weather" in wdata) {
            let marker = L.marker([cdata.latitude, cdata.longitude]).addTo(map);

            marker
              .bindPopup(
                `Here the current temperature is <b>${
                  wdata.current_weather.temperature
                }&deg;C</b><br>${
                  wathercodemap[wdata.current_weather.weathercode]
                }`
              )
              .openPopup();
          }

          map.setView([cdata.latitude, cdata.longitude], 13);
          $("#lat").html("Latitude: " + cdata.latitude + "&deg;");
          $("#lon").html("Longitude: " + cdata.longitude + "&deg;");
          $(".resutls").empty();
        });

        rapper.append(img);
        rapper.append(name);
        rapper.append(btn);

        $(".resutls").append(rapper);
        $(".resutls").append($("<hr>"));
      }
    }
  });
});

function getLatLon(map) {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        $("#lat").html("Latitude: " + lat + "&deg;");
        $("#lon").html("Longitude: " + lon + "&deg;");

        let wdata = await getWatherData(lat, lon);

        if ("current_weather" in wdata) {
          let marker = L.marker([lat, lon]).addTo(map);

          marker
            .bindPopup(
              `Here the current temperature is <b>${
                wdata.current_weather.temperature
              }&deg;C</b><br>${
                wathercodemap[wdata.current_weather.weathercode]
              }`
            )
            .openPopup();

          L.circle([lat, lon], {
            color: "#ff0000",
            fillColor: "#ff0033",
            fillOpacity: 0.5,
            radius: position.coords.accuracy
          })
            .addTo(map)
            .bindPopup(
              `Here the current temperature is <b>${
                wdata.current_weather.temperature
              }&deg;C</b><br>${
                wathercodemap[wdata.current_weather.weathercode]
              }`
            );
        }

        map.setView([lat, lon], 13);
      },
      function () {
        $("#lat").hide();
        $("#lon").hide();
        $("#accuracy").hide();
      }
    );
  } else {
    $("#lat").hide();
    $("#lon").hide();
    $("#accuracy").hide();
  }
}

async function getWatherData(lat, lon) {
  let data = await ajax(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius`,
    null,
    "GET",
    "json"
  );

  return data;
}
