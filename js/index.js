function Weather() {
  this.apiUrl = "http://api.openweathermap.org/data/2.5/weather";
  this.apiUrlForecast = "http://api.openweathermap.org/data/2.5/forecast";
}

Weather.prototype.getWeather = function (nombreCiudad) {
  var that = this;

  $.get(
    this.apiUrl +
      "?q=" +
      nombreCiudad +
      "&appid=8f39cd935257c74fd2f95fdb1da6ba35",
    function (json) {
      var result = "";

      if (json && json.cod == 200) {
        result = "<p class='title'>Tiempo en " + json.name + "</p>";
        switch (json.weather[0].main) {
          case "Clear":
            result += '<img src="http://openweathermap.org/img/wn/01d@4x.png">';
            break;
          case "Clouds":
            result += '<img src="http://openweathermap.org/img/wn/02d@4x.png">';
            break;
          case "Rain":
            result += '<img src="http://openweathermap.org/img/wn/10d@4x.png">';
            break;
          case "Thunderstorm":
            result += '<img src="http://openweathermap.org/img/wn/11d@4x.png">';
            break;
          case "Snow":
            result += '<img src="http://openweathermap.org/img/wn/13d@4x.png">';
            break;
          case "Mist":
            result += '<img src="http://openweathermap.org/img/wn/50d@4x.png">';
            break;
          default:
            result += "";
        }
        result += "<p>" + json.weather[0].main + "</p>";
        result += "<p>" + (json.main.temp - 273.15).toFixed(2) + "ºC</p>";
      }

      $("#informacion").html(result);
      $("#informacion").fadeIn();
      $("#presentacion").hide();
    }
  ).fail(function () {
    var result = "";
    result = "<p>Error</p>";
    $("#informacion").html(result);
    $("#presentacion").hide();
    $("#informacion").fadeIn();
  });
};

Weather.prototype.getWeatherForecast = function (nombreCiudad) {
  var that = this;

  $.get(
    this.apiUrlForecast +
      "?q=" +
      nombreCiudad +
      "&appid=8f39cd935257c74fd2f95fdb1da6ba35",
    function (json) {
      var result = "";
      if (json && json.cod == 200) {
        result = "<p class='title'>Tiempo en " + json.city.name + "</p>";

        for (let i = 0; i < 4; i++) {
          result += "<p class='title'>Día: " + (i + 1) + "</p>";
          var max = json.list[i * 8].main.temp_max;
          var min = json.list[i * 8].main.temp_min;
          var tiempo = json.list[i * 8].weather[0].main;
          for (let j = 1; j < 8; j++) {
            var nuevamax = json.list[i * 8 + j].main.temp_max;
            if (nuevamax > max) max = nuevamax;
            var nuevamin = json.list[i * 8 + j].main.temp_min;
            if (nuevamin < min) min = nuevamin;
          }
          switch (tiempo) {
            case "Clear":
              result +=
                '<img src="http://openweathermap.org/img/wn/01d@4x.png">';
              break;
            case "Clouds":
              result +=
                '<img src="http://openweathermap.org/img/wn/02d@4x.png">';
              break;
            case "Rain":
              result +=
                '<img src="http://openweathermap.org/img/wn/10d@4x.png">';
              break;
            case "Thunderstorm":
              result +=
                '<img src="http://openweathermap.org/img/wn/11d@4x.png">';
              break;
            case "Snow":
              result +=
                '<img src="http://openweathermap.org/img/wn/13d@4x.png">';
              break;
            case "Mist":
              result +=
                '<img src="http://openweathermap.org/img/wn/50d@4x.png">';
              break;
            default:
              result += "";
          }
          result += "<p>" + tiempo + "</p>";
          result +=
            "<p>Mínima: " +
            (min - 273.15).toFixed(2) +
            "ºC. Máxima: " +
            (max - 273.15).toFixed(2) +
            "ºC</p><hr>";
        }
      }
      $("#informacion").html(result);
      $("#informacion").fadeIn();
      $("#presentacion").hide();
    }
  ).fail(function () {
    var result = "";
    result = "<p>Error</p>";
    $("#informacion").html(result);
    $("#informacion").fadeIn();
    $("#presentacion").hide();
  });
};

$(document).ready(function () {
  $("#presentacion").fadeIn();
  $("#informacion").hide();
  $("#weather").hide();
  $("#forecast").hide();

  var weatherClient = new Weather();

  $("#buscar").submit(function (event) {
    weatherClient.getWeatherForecast($("input").first().val());
    event.preventDefault();
  });

  $("#buscarAhora").submit(function (event) {
    weatherClient.getWeather($("input").eq(1).val());
    event.preventDefault();
  });

  $("#home").click(function (event) {
    $("#presentacion").fadeIn();
    $("#informacion").hide();
    $("#weather").hide();
    $("#forecast").hide();
    event.preventDefault();
  });

  $("#weatherBtn").click(function (event) {
    $("#presentacion").hide();
    $("#informacion").hide();
    $("#weather").fadeIn();
    $("#forecast").hide();
    event.preventDefault();
  });

  $("#forecastBtn").click(function (event) {
    $("#presentacion").hide();
    $("#informacion").hide();
    $("#weather").hide();
    $("#forecast").fadeIn();
    event.preventDefault();
  });
});