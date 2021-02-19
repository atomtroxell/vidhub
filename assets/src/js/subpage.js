jQuery(document).ready(function ($) {
  // Images
  $('img').each(function () {
    var img = $(this);
    var src = $(this).attr('src');
    var alt = $(this).attr('alt');
    var filename = src.split('/').reverse()[0].replace(/\.[^/.]+$/, '');
    if (img.parent('a').length !== 0) {
      console.log('parent is a link');
      if (alt === '' || alt === undefined) {
        img.attr('alt', 'image ' + filename);
      }
    } else {
      if (alt === '' || alt === undefined) {
        img.attr('alt', '');
      }
    }
  });

  // Tables
  $('main').responsiveTables();

});