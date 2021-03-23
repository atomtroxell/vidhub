$(function () {
  // save settings
  $('#save').on('click', function () {
    var services = [];
    $.each($('input[name="service"]:checked'), function () {
      services.push({
        id: $(this).val(),
        title: $(this).attr('data-title'),
        logo: $(this).attr('data-logo'),
        url: $(this).attr('data-url'),
        background: $(this).attr('data-background')
      });
    });
    if ($('input[id="rememberRecent"]').is(':checked')) {
      localStorage.setItem('vidhubServicesRememberRecent', 'show');
    } else {
      localStorage.removeItem('vidhubServicesRememberRecent');
    }
    localStorage.setItem('vidhubServices', JSON.stringify(services));
    refreshPage();
  });
  $('#clear').on('click', function () {
    localStorage.removeItem('vidhubServices');
    localStorage.removeItem('vidhubServicesRememberRecent');
    localStorage.removeItem('vidhubServicesLastViewed');
    refreshPage();
  });
  function refreshPage() {
    window.location.reload();
  }
  function vidhubServices() {
    var vidhubServicesJSON;
    var vidhubServices;
    // var services;
    if (localStorage.getItem('vidhubServices') === null) {
      $.ajax({
        url: '/services.json',
        dataType: 'text',
        success: function (data) {
          vidhubServicesJSON = JSON.parse(data);
          for (var i = 0; i < vidhubServicesJSON.length; ++i) {
            // services
            $('.services').append('<div><span class="service ' + vidhubServicesJSON[i].title + '" href="#" data-title="' + vidhubServicesJSON[i].title + '" data-url="' + vidhubServicesJSON[i].url + '" aria-label="' + vidhubServicesJSON[i].title + '" style="' + vidhubServicesJSON[i].background + '"><span class="logo" style="background-image:url(' + vidhubServicesJSON[i].logo + ')"></span></span></div>');
            // services checkboxes
            $('.services-list').append('<div class="sm-full sm-last"><input type="checkbox" id="' + vidhubServicesJSON[i].id + '" data-title="' + vidhubServicesJSON[i].title + '" data-logo="' + vidhubServicesJSON[i].logo + '" data-url="' + vidhubServicesJSON[i].url + '" data-background="' + vidhubServicesJSON[i].background + '" value="' + vidhubServicesJSON[i].id + '" name="service"><label for="' + vidhubServicesJSON[i].id + '">' + vidhubServicesJSON[i].title + '</label></div>');
          }
        }
      });
    } else {
      vidhubServices = localStorage.getItem('vidhubServices');
      vidhubServicesRememberRecent = localStorage.getItem('vidhubServicesRememberRecent');
      vidhubServicesLocal = JSON.parse(vidhubServices);
      $.ajax({
        url: '/services.json',
        dataType: 'text',
        success: function (data) {
          vidhubServicesJSON = JSON.parse(data);
          for (var i = 0; i < vidhubServicesJSON.length; ++i) {
            // services checkboxes
            $('.services-list').append('<div class="sm-full sm-last"><input type="checkbox" id="' + vidhubServicesJSON[i].id + '" data-title="' + vidhubServicesJSON[i].title + '" data-logo="' + vidhubServicesJSON[i].logo + '" data-url="' + vidhubServicesJSON[i].url + '" data-background="' + vidhubServicesJSON[i].background + '" value="' + vidhubServicesJSON[i].id + '" name="service"><label for="' + vidhubServicesJSON[i].id + '">' + vidhubServicesJSON[i].title + '</label></div>');
          }
          selectedServices();
        }
      });
      if (vidhubServicesRememberRecent === 'show') {
        $('input[id="rememberRecent"]').prop("checked", true);
      } else {
        $('input[id="rememberRecent"]').prop("checked", false);
      }
    }
  }
  function selectedServices() {
    for (var i = 0; i < vidhubServicesLocal.length; ++i) {
      // services
      $('.services').append('<div><span class="service ' + vidhubServicesLocal[i].title + '" href="#" aria-label="' + vidhubServicesLocal[i].title + '" data-title="' + vidhubServicesLocal[i].title + '" data-url="' + vidhubServicesLocal[i].url + '" style="' + vidhubServicesLocal[i].background + '"><span class="logo" style="background-image:url(' + vidhubServicesLocal[i].logo + ')"></span></span></div>');
      // services checkboxes
      $('.services-list input[type="checkbox"]' + '#' + vidhubServicesLocal[i].id).prop("checked", true);
    }
  }
  // store last viewed
  function lastView() {
    $('body').on('click', '.services .service', function () {
      var vidhubServiceURL = $(this).attr('data-url');
      var vidhubServicesLastViewed = [];
      vidhubServicesLastViewed.push({
        title: $(this).attr('data-title'),
        url: $(this).attr('data-url')
      });
      localStorage.setItem('vidhubServicesLastViewed', JSON.stringify(vidhubServicesLastViewed));
      window.location.href = vidhubServiceURL;
    });

    vidhubServicesLastViewed = localStorage.getItem('vidhubServicesLastViewed');
    if (vidhubServicesLastViewed !== null) {
      $('.last-viewed').show();
      vidhubServicesLastViewedLocal = JSON.parse(vidhubServicesLastViewed);
      for (var i = 0; i < vidhubServicesLastViewedLocal.length; ++i) {
        $('.last-viewed').append('<a href="' + vidhubServicesLastViewedLocal[i].url + '">' + vidhubServicesLastViewedLocal[i].title + '</a>');
      }
    }
  }
  // reload on back button
  window.addEventListener("pageshow", function (event) {
    var historyTraversal = event.persisted ||
      (typeof window.performance !== "undefined" &&
        window.performance.navigation.type === 2);
    if (historyTraversal) {
      // Handle page restore.
      window.location.reload();
    }
  });
  vidhubServices();
  lastView();
});