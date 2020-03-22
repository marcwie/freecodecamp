var api = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?"
var apiKey = "3ca0b1ee128fcd4dc7bbd7acc406bed0"

var temperature = 0;
var latitude = 0;
var longitude = 0;
var city = "";
var country = "";
var weather = "";
var unit = "C";
var id = 0;
var condition = "";
var urlForCurrentWeather = ""

var urls = {
  "thunderstorm": "https://res.cloudinary.com/dgvof5t1y/image/upload/v1492366173/tim-trad-227296_conv_ksiyor.jpg",
  "drizzle": "https://res.cloudinary.com/dgvof5t1y/image/upload/v1492371617/mario-calvo-3518_xvkk2k.jpg",
  "snow": "https://res.cloudinary.com/dgvof5t1y/image/upload/v1492366914/todd-diemer-110885_conv_w7oocz.jpg",
  "atmosphere": "https://res.cloudinary.com/dgvof5t1y/image/upload/v1492370186/tobias-tullius-225741_conv_xvbuma.jpg",
  "clear": "https://res.cloudinary.com/dgvof5t1y/image/upload/v1492370172/lance-anderson-3601_conv_dwfm4i.jpg",
  "clouds": "https://res.cloudinary.com/dgvof5t1y/image/upload/v1492370190/aaron-burden-203263_conv_b5pfpm.jpg",
  "extreme": "https://res.cloudinary.com/dgvof5t1y/image/upload/v1492370557/karsten-wurth-163788_lpwpxg.jpg",
}

function celsius2Fahrenheit(celcius) {
  return celcius * 1.8 + 32
};

function fahrenheit2Celcius(fahrenheit) {
  return (fahrenheit - 32) / 1.8
};

function currentWeather(id) {
  if (id <= 299) {
    return urls.thunderstorm;
  } else if (id < 399) {
    return urls.drizzle;
  } else if (id < 599) {
    return urls.drizzle;
  } else if (id < 699) {
    return urls.snow;
  } else if (id < 799) {
    return urls.atmosphere;
  } else if (id == 800) {
    return urls.clear;
  } else if (id <= 805) {
    return urls.clouds;
  } else if (id < 907) {
    return urls.extreme;
  } else {
    return urls.clear;
  }
};

$(document).ready(function() {

  navigator.geolocation.getCurrentPosition(function(pos) {
    latitude = pos.coords.latitude;
    longitude = pos.coords.longitude;
    apiCall = api + "lat=" + latitude + "&lon=" + longitude + "&APPID=" + apiKey;

    $.getJSON(apiCall).done(function(json) {
      $("#location").html(json.name + ", " + json.sys.country);
      weather = json.weather[0].main; //or use .description for higher details
      temperature = (json.main.temp - 273.15);
      id = json.weather[0].id;
      setTemperature();

      urlForCurrentWeather = currentWeather(id);
      $('body').css('background-image', 'url(' + urlForCurrentWeather + ')');

    });
  });

  function setTemperature() {
    $("#weather").html(weather + " at " + temperature.toFixed(1) + " °" + unit);
  };

  $("#toggle").on("click", function() {
    if (unit === "F") {
      temperature = fahrenheit2Celcius(temperature);
      unit = "C"
      $("#toggle").html("toogle Fahrenheit")
    } else if (unit === "C") {
      temperature = celsius2Fahrenheit(temperature);
      unit = "F"
      $("#toggle").html("toogle Celcius")
    };
    setTemperature();
  });

});
