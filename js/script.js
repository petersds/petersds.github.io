$(document).ready(function () {
  //mobile menu
  $("#mobile-menu").click(function(){
    $(".mobile-links").toggle()
    $(".fa-bars, .fa-close").toggleClass("fa-bars fa-close")
  })

  // set browser cookie
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
  }

  function setCookie() {
    var expires = new Date(Date.now() + 86400 * 1000).toUTCString();
    document.cookie =
      "session=visited; expires=" + (expires + 86400) + ";path=/;";
    var cookiename = getCookie("session");

    return cookiename;
  }

  function checkCookie() {
    var cookiename = getCookie("session");

    if (cookiename === "visited") {
      $(".modal-outer").css({ display: "none" });
    }
  }

  checkCookie();

  $(".modal-close").on("click", function () {
    $(".modal-outer").css({ display: "none" });

    // call cookie function
    setCookie();
  });
  var objects_data = "./data/objects_data.json";
  var zoomLevel = 2;
  var center = [49.56986759155009, 11.165958815004329];

  var map = L.map("map").setView(center, zoomLevel);
  mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
  L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; " + mapLink + " Contributors",
    maxZoom: 18,
  }).addTo(map);
  map.scrollWheelZoom.disable()

  $.getJSON(objects_data, function (data) {
    var object = data.objects;

    for (var i = 0; i < object.length; i++) {
      //   console.log(object[i].geo[2])
      marker = new L.marker([object[i].geo[0], object[i].geo[1]])
        .bindPopup(
          "<a href='" +
            object[1].url +
            "'>" +
            object[i].objectNumber +
            "</a><br/>" +
            object[i].title +
            "<br/>" +
            object[i].geoName
        )
        .addTo(map);
    }
  });
});
