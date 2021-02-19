// tooltips
function cookieAccept() {
  var session = sessionStorage.getItem('acceptCookies');
  var local = localStorage.getItem('acceptCookies');

  if ((session === 'CookiesAccepted') || (local === 'CookiesAccepted')) {
    if ($('.clear-cookie-accept').length) {
      $('.clear-cookie-accept').on('click', function () {
        sessionStorage.removeItem('acceptCookies');
        localStorage.removeItem('acceptCookies');
      });
    }
  } else {
    $('body').prepend('<div class="cookie-accept"><p><b>Notice</b></p><p>We use cookies to optimize site functionality and give you the best possible experience. <a href="/privacy-policy">Learn more about our Privacy Policy</a>.</p><a class="accept" href="javascript:void(0);">Accept</a><a class="decline" href="javascript:void(0);">Dismiss</a><a class="dismiss" href="javascript:void(0);">&times;</a></div>');
  }
  $('.cookie-accept .accept').on('click', function () {
    localStorage.setItem('acceptCookies', 'CookiesAccepted');
    $('.cookie-accept').remove();
  });
  $('.cookie-accept .decline, .cookie-accept .dismiss').on('click', function () {
    sessionStorage.setItem('acceptCookies', 'CookiesAccepted');
    $('.cookie-accept').remove();
  });
}
