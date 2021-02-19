$('iframe[src*="youtube.com"], iframe[src*="player.vimeo.com"]').each(function () {
  if (!$('body').hasClass('dnnEditState')) {
    iframe = $(this);
    height = iframe.height();
    width = iframe.width();
    ratio = ((height / width) * 100);
    padding = ratio.toFixed(2) + '%';
    var hasClass = $(this).attr('class');
    var hasAlign = $(this).attr('align');
    if (typeof hasClass !== typeof undefined && hasClass !== false) {
      if (hasClass == 'alignleft') {
        iframe.wrap('<div class="flex-container alignleft"><div class="flex-video" style="padding-bottom:' + padding + '"></div></div>');
      } else if (hasClass == 'alignright') {
        iframe.wrap('<div class="flex-container alignright"><div class="flex-video" style="padding-bottom:' + padding + '"></div></div>');
      } else if (hasClass == 'aligncenter') {
        iframe.wrap('<div class="flex-container aligncenter"><div class="flex-video" style="padding-bottom:' + padding + '"></div></div>');
      } else {
        iframe.wrap('<div class="flex-video" style="padding-bottom:' + padding + '"></div>');
      }
    } else if (typeof hasAlign !== typeof undefined && hasAlign !== false) {
      if (hasAlign == 'left') {
        iframe.wrap('<div class="flex-container alignleft"><div class="flex-video" style="padding-bottom:' + padding + '"></div></div>');
      } else if (hasAlign == 'right') {
        iframe.wrap('<div class="flex-container alignright"><div class="flex-video" style="padding-bottom:' + padding + '"></div></div>');
      } else if (hasAlign == 'center') {
        iframe.wrap('<div class="flex-container aligncenter"><div class="flex-video" style="padding-bottom:' + padding + '"></div></div>');
      } else {
        iframe.wrap('<div class="flex-video" style="padding-bottom:' + padding + '"></div>');
      }
    } else {
      iframe.wrap('<div class="flex-video" style="padding-bottom:' + padding + '"></div>');
    }
  }
});

$.fn.responsivevideos = function () {
  // in your main.js, homepage.js or subpage.js use $('SELECTORS').responsivevideos(); to specify which containers should be searched for videos to make responsive
  // with class: {{video=http://vimeo.com/25451551}}
  // without class: {{video=https://www.youtube.com/watch?v=r11wAaOLhgo left|center|right}}
  var container = this;
  if (this.text().match(/{{video=(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)?(?:\s+)?([a-zA-Z]+)?}}/g)) {
    var videos = this.text().match(/{{video=(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)?(?:\s+)?([a-zA-Z]+)?}}/g);
    for (i = 0; i < videos.length; i++) {
      var reg = /{{video=(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)?(?:\s+)?([a-zA-Z]+)?}}/;
      var video = reg.exec(videos[i]);
      var videoitem = videos[i].toString();
      var videotext = videoitem;
      var url = video[1];
      var type = video[3];
      var id = video[6];
      if (video[7] != null) {
        var align = 'align' + video[7];
      } else {
        var align = '';
      }

      if (type.indexOf('youtu') > -1) {
        var type = 'youtube';
      } else if (type.indexOf('vimeo') > -1) {
        var type = 'vimeo';
      }

      if (type === 'youtube') {
        this.html(function (index, html) {
          return html.replace(videotext, '<div class="flex-container ' + align + '"><div class="flex-video"><iframe src="https://www.youtube.com/embed/' + id + '?autoplay=0&modestbranding=1&rel=0" frameBorder="0" title="" aria-hidden="true"/></div></div>');
        });
      } else if (type === 'vimeo') {
        this.html(function (index, html) {
          return html.replace(videotext, '<div class="flex-container ' + align + '"><div class="flex-video"><iframe src="https://player.vimeo.com/video/' + id + '" frameBorder="0" title="" aria-hidden="true"/></div></div>');
        });
      }
    }
  }
};
jQuery(document).ready(function ($) {
  $('iframe.responsive-video').each(function () {
    var responsiveVideo = $(this).attr('src');
    $('<div class="flex-container"><div class="flex-video"><iframe src="' + responsiveVideo + '" frameBorder="0" title="" aria-hidden="true"/></div></div>').insertAfter(this);
    $(this).remove();
  });
});