jQuery(document).ready(function ($) {
  // primary nav
  $('.nav-primary').accessibleNav({
    desktop: 1025,
    spans: 'hide',
    level2position: 'vertical-bottom',
    level3position: 'horizontal-right'
  });
  $('.nav-open').on('keypress', function (e) {
    if (e.which === 13) {
      $('body').addClass('nav-wrap-open');
      $('.nav-close').focus();
    }
  });
  $('.nav-close').on('keypress', function (e) {
    if (e.which === 13) {
      $('body').removeClass('nav-wrap-open');
      $('.nav-open').focus();
    }
  });
  $('.nav-open').on('click', function () {
    $('body').addClass('nav-wrap-open');
  });
  $('.nav-close').on('click', function () {
    $('body').removeClass('nav-wrap-open');
  });

  // search
  $('.search-form > button').click(function (e) {
    e.preventDefault();
    var root = location.protocol + '//' + location.host + '/search-results?search=';
    var terms = $('.search-form input[type="search"]').val();
    var url = root + terms;
    // console.log(url);
    window.location.href = url;
  });
  $('.search-form input[type="search"]').on('keyup', function (e) {
    var root = location.protocol + '//' + location.host + '/search-results?search=';
    var terms = $(this).val();
    var url = root + terms;
    // console.log(url);
    if (e.which === 13) {
      window.location.href = url;
    }
  });
  $(".search-form input[type='search']").focusin(function () {
    $('.search-form').addClass('active');
  });
  $(".search-form input[type='search']").focusout(function () {
    $('.search-form').removeClass('active');
  });

  // add class to select on open
  $('select').on('click', function () {
    $(this).toggleClass('open');
  });
  $('label').on('click', function (e) {
    if ($(this).next().is('select')) {
      e.preventDefault();
      $(this).next('select').focus();
    }
  });
  $(document).on('keyup', function (e) {
    if (e.keyCode === 27) {
      if ($('select').hasClass('open')) {
        $(this).removeClass('open');
      }
    }
  });
  $(window).on('scroll', function () {
    if ($('select').hasClass('open')) {
      $('select').removeClass('open');
    }
  });
});