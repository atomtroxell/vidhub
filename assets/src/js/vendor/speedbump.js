
//SafeLinks array example
// var SafeLinks = [
//   '[href*=".{{prod-domain}}.com"]',
//   '[href^="https://{{prod-domain}}.com"]',
//   '[href^="http://{{prod-domain}}.com"]',
//   '[href^="http://www.{{prod-domain}}.com"]',
//   '[href^="http://{{demo-domain}}.lrsws.co/"]',
//   '[href^="https://{{demo-domain}}.lrsws.co/"]'
// ];

function initSpeedbump(SafeLinks) {
  // automatic speedbump
  // find all speedbump enabled external links
  var link,
    DefaultSafeLinks = [
      '[href=""]',
      '[href^="tel"]',
      '[href^="/"]',
      '[href^="#"]',
      '[class*="no-speedbump"]',
      '[id*="url-link"]',
      '[id*="close-speedbump"]',
      '[class*="close-reveal-modal"]',
      '[class*="btn-search"]',
      '[class*="btn-primary"]'];

  var selector = "a:not(";

  for (link of DefaultSafeLinks) {
    selector += link + ", ";
  }

  for (link of SafeLinks) {
    selector += link + ", ";
  }

  selector = selector.substring(0, selector.length - 2) + ")";

  $(selector).addClass('external');

  $('[href^="mailto:"]').addClass('email-link');

  // remove external class from links without href attribute
  $('a:not([href])').removeClass('external');

  // add the link and title to the continue button
  $('body').on('click', 'a.external', function (e) {
    e.preventDefault();
    if (!$(this).hasClass('no-redirect')) {
      var url = $(this).attr('href');
      var target = $(this).attr('target');
      $('#url-link').attr('href', url).attr('target', target);
      $('#em_url-link').attr('href', url).attr('target', target);

      $('#speedbump').addClass('open');
    }
  });

  // close speedbump when clicking acknowledgment button
  $('#speedbump a#close-speedbump, ' +
    '#speedbump a#close-reveal-modal, ' +
    '#email_speedbump a#em_close-speedbump, ' +
    '#email_speedbump a#em_close-reveal-modal, ' +
    '#login_speedbump a#em_close-speedbump, ' +
    '#login_speedbump a#em_close-reveal-modal,  ' +
    '#login_speedbump_mobile a#em_close-speedbump, ' +
    '#login_speedbump_mobile a#em_close-reveal-modal').click(function (e) {
      e.preventDefault();
      $('#speedbump').removeClass('open');
    });

  // close reveal if link is clicked
  $('a:not([id*="close-speedbump"], ' +
    '[id*="close-reveal-modal"], ' +
    '[id*="em_close-speedbump"], ' +
    '[id*="em_close-reveal-modal"])').click(function () {
      $('#speedbump').removeClass('open');
    });

}
