/*  JavaScript 6th Edition
    Chapter 10
    Hands-on Project 10-5

    Author: Thanh-Tung Pham
    Date: Dec 4, 2017

    Filename: script.js
*/

"use strict";

var waitForUser;

function setUpPage() {
  var buttons = document.getElementById('cities').getElementsByTagName('div');
  for (var idx in buttons) {
    if (buttons[idx].addEventListener) {
      buttons[idx].addEventListener('click', createMap, false);
    }
    else if (buttons[idx].attachEvent) {
      buttons[idx].attachEvent('onclick', createMap);
    }
  }
}

function geoTest() {
  waitForUser = setTimeout(fail, 10000);
  if (navigator.geolocation) {
    setTimeout(navigator.geolocation.getCurrentPosition(createMap, fail), 10000);
  }
  else {
    fail();
  }
}

function createMap(position) {
  // Downtown Beijing, China: 39.928016, 116.412526
  // Downtown Paris, France: 48.862000, 2.349118
  // Downtown Rio de Janeiro, Brazil: -23.003571,-43.3348165
  var Lat, Lng;
  clearTimeout(waitForUser);
  if (position.coords) {
    Lat = position.coords.latitude;
    Lng = position.coords.longitude;
  }
  else {
    var city = this.innerHTML;
    if (city === 'Beijing') {
      Lat = 39.928016;
      Lng = 116.412526;
    }
    else if (city === 'Paris') {
      Lat = 48.862000;
      Lng = 2.349118;
    }
    else if (city === 'Rio de Janeiro') {
      Lat = -23.003571;
      Lng = -43.3348165;
    }
    document.getElementById('caption').innerHTML = city;
  }

  var mapOptions = {
    center: new google.maps.LatLng(Lat, Lng),
    zoom: 10
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function fail() {
  document.getElementById('map').innerHTML = "Unable to access your current location.";
}

window.addEventListener('load', setUpPage, false);