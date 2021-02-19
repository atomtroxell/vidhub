// automatic accessible nav
// include this file in your gulp file and then initialize on any PARENT element of any/or multiple navs

// parameters
// desktop: pixel value without the 'px', set to desktop nav size
// spans: 'show'|'hide',
// level2position: 'horizontal-left'|'horizontal-right'|'vertical-top'|'vertical-bottom',
// level3position: 'horizontal-left'|'horizontal-right'|'vertical-top'|'vertical-bottom'

// example
// $('.nav-primary').accessibleNav({
// desktop: 1025,
//   spans: 'hide',
//   level2position: 'vertical-bottom',
//   level3position: 'horizontal-right'
// });

(function ($) {
  $.fn.accessibleNav = function (options) {

    // default plugin settings
    var settings = $.extend({
      desktop: 1025,
      spans: 'show',
      level2position: 'vertical-bottom',
      level3position: 'horizontal-right'
    }, options);

    // gather plugin settings
    var accessibleNavContainer = this;
    var desktop = settings.desktop;
    var screen;

    if ($(window).width() >= desktop) {
      var spans = settings.spans;
      var level2position = settings.level2position;
      var level3position = settings.level3position;
    } else {
      spans = 'show';
      level2position = 'vertical-bottom';
      level3position = 'vertical-bottom';
    }

    var resizeTimer;
    $(window).on('resize', function (e) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        screen = $(window).width();
      }, 100);
    });

    // insert togglers
    function togglers() {
      // add focusable spans to each list item with a child list
      $('li', accessibleNavContainer).each(function () {
        if ($(this).hasClass('has_children')) {
          var togglerLabel = $('> a', this).text();
          $('> a', this).after('<span class="toggler" tabindex="0" aria-label="Press enter to view child pages of ' + togglerLabel + '"></span>');
        }
      });
    }

    // toggler click functions
    function togglerClick() {
      // open and close subnav when toggler is clicked
      if (screen >= desktop) {
        $('span.toggler').on('click', function () {
          if ($(this).next('ul').hasClass('open')) {
            $(this).removeClass('open');
            $(this).parent('li').removeClass('open');
            $(this).next('ul').removeClass('open').hide();
            $(this).focus();
          } else {
            $('span.toggler').not(this).removeClass('open');
            $(this).addClass('open');
            $(this).parent('li').addClass('open');
            $(this).next('ul').addClass('open').show();
          }
        });
      } else {
        $('span.toggler').on('click', function () {
          if ($(this).next('ul').hasClass('open')) {
            $(this).removeClass('open');
            $(this).parent('li').removeClass('open');
            $(this).next('ul').removeClass('open').hide();
            $(this).focus();
          } else {
            $(this).addClass('open');
            $(this).parent('li').addClass('open');
            $(this).next('ul').addClass('open').show();
          }
        });
      }

    }

    // toggler key functions
    function togglerKeys() {
      // open subnav if enter key is pressed when toggler is focused
      $('span.toggler').on('keypress', function (e) {
        if (e.which === 13) {
          if ($(this).next('ul').hasClass('open')) {
            $(this).prev('a').removeClass('focus');
            $(this).parent('li').removeClass('open');
            $(this).parent().children('ul').removeClass('open').hide();
            $(this).focus();
          } else {
            $(this).prev('a').addClass('focus');
            $(this).parent('li').addClass('open');
            $(this).parent().children('ul').addClass('open').show();
            $($(this).next('ul').find('a')[0]).focus();
          }
        }
      });
      // close subnav if escape key is pressed when toggler is focused
      $('span.toggler').on('keyup', function (e) {
        if (e.keyCode === 27) {
          $(this).parent('li').removeClass('open');
          $(this).prev('a').removeClass('focus');
          $(this).parent().children('ul').removeClass('open').hide();
        }
      });
      // if span parameter is set to 'hide'
      if (spans === 'hide') {
        // hide togglers
        $('span.toggler', accessibleNavContainer).hide();
        // when tab is pressed if a nav item with children is focus show the toggler or if focusout hide the toggler
        $(document).keyup(function (e) {
          if (e.which === 9 && !e.shiftKey) {
            // if ($('li.has_children > a', accessibleNavContainer).is(':focus')) {
            //   console.log('focused');
            //   $('li.has_children > a').next('span.toggler').addClass('visible').show();
            // }
            $('li.has_children > a', accessibleNavContainer).each(function () {
              if ($(this).is(':focus')) {
                $(this).next('span.toggler').addClass('visible').show();
              }
            });
            $('span.toggler', accessibleNavContainer).on('focusout', function (e) {
              if (!$(this).prev('a').hasClass('focus')) {
                $(this).removeClass('visible').hide();
              }
            });
          }
        });
      }
    }

    // link key functions
    function linkKeys() {
      // arrows to focus through subnav
      $('.ul2 a, .ul3 a', accessibleNavContainer).on('keydown', function (e) {
        if (e.keyCode === 40) {
          $(this).parent('li').next('li').find('a').focus();
          e.preventDefault();
        } else if (e.keyCode === 38) {
          $(this).parent('li').prev('li').find('a').focus();
          e.preventDefault();
        }
      });
      // if a subnav element is focused and escape key is pressed, collapse that subnav and focus back on the toggler
      $(document).on('keyup', function (e) {
        $('.ul2 a, .ul3 a, .ul2 span.toggler, .ul3 span.toggler', accessibleNavContainer).each(function () {
          if ($(this).is(':focus')) {
            if (e.keyCode === 27) {
              $(this).closest('ul').removeClass('open').toggle().removeAttr('style').parent('li').find('a.focus').removeClass('focus').next('span.toggler').focus();
            }
          }
        });
      });
      // if first link in level2 subnav is focused and appropriate key is pressed, collapse that subnav and focus back on the toggler
      $($('.ul2 > li > a, .ul3 > li > a', accessibleNavContainer)[0]).on('keydown', function (e) {
        if (level2position === 'vertical-bottom') {
          if (e.keyCode === 38) {
            $(this).closest('ul').removeClass('open').hide().removeAttr('style').parent('li').find('a.focus').removeClass('focus').next('span.toggler').focus();
            e.preventDefault();
          }
        } else if (level2position === 'vertical-top') {
          if (e.keyCode === 40) {
            $(this).closest('ul').removeClass('open').hide().removeAttr('style').parent('li').find('a.focus').removeClass('focus').next('span.toggler').focus();
            e.preventDefault();
          }
        } else if (level2position === 'horizontal-left') {
          if (e.keyCode === 39) {
            $(this).closest('ul').removeClass('open').hide().removeAttr('style').parent('li').find('a.focus').removeClass('focus').next('span.toggler').focus();
            e.preventDefault();
          }
        } else if (level2position === 'horizontal-right') {
          if (e.keyCode === 37) {
            $(this).closest('ul').removeClass('open').hide().removeAttr('style').parent('li').find('a.focus').removeClass('focus').next('span.toggler').focus();
            e.preventDefault();
          }
        } else {
          if (e.keyCode === 38) {
            $(this).closest('ul').removeClass('open').hide().removeAttr('style').parent('li').find('a.focus').removeClass('focus').next('span.toggler').focus();
            e.preventDefault();
          }
        }
      });
      // if first link in level3 subnav is focused and up key is pressed, collapse that subnav and focus back on the toggler
      // $($('.ul3 > li > a', accessibleNavContainer)[0]).on('keydown', function (e) {
      //   if (level3position === 'vertical-bottom') {
      //     if (e.keyCode === 38) {
      //       $(this).closest('ul').removeClass('open').hide().removeAttr('style').parent('li').find('a.focus').removeClass('focus').next('span.toggler').focus();
      //       e.preventDefault();
      //     }
      //   } else if (level3position === 'vertical-top') {
      //     if (e.keyCode === 40) {
      //       $(this).closest('ul').removeClass('open').hide().removeAttr('style').parent('li').find('a.focus').removeClass('focus').next('span.toggler').focus();
      //       e.preventDefault();
      //     }
      //   } else if (level3position === 'horizontal-left') {
      //     if (e.keyCode === 39) {
      //       $(this).closest('ul').removeClass('open').hide().removeAttr('style').parent('li').find('a.focus').removeClass('focus').next('span.toggler').focus();
      //       e.preventDefault();
      //     }
      //   } else if (level3position === 'horizontal-right') {
      //     if (e.keyCode === 37) {
      //       $(this).closest('ul').removeClass('open').hide().removeAttr('style').parent('li').find('a.focus').removeClass('focus').next('span.toggler').focus();
      //       e.preventDefault();
      //     }
      //   } else {
      //     if (e.keyCode === 38) {
      //       $(this).closest('ul').removeClass('open').hide().removeAttr('style').parent('li').find('a.focus').removeClass('focus').next('span.toggler').focus();
      //       e.preventDefault();
      //     }
      //   }
      // });
      // when focusing out of last link or toggler in list
      // ul2
      $('.ul2 > li:last-child > a, .ul3 > li:last-child > a').on('focusout', function () {
        if ($(this).next('span.toggler').length) {
          $(this).next('span.toggler').focus();
        } else {
          if (spans === 'hide') {
            $(this).closest('ul').parent('li').find('span.toggler').removeClass('visible').hide();
          }
          $(this).closest('ul').removeClass('open').hide().removeAttr('style').parent('li').find('a.focus').removeClass('focus').parent('li').next('li > a').focus();
          $(this).closest('li.has_children').removeClass('open');
        }
      });
      $('.ul2 > li:last-child > a + span.toggler, .ul3 > li:last-child > a + span.toggler').on('focusout', function () {
        if (spans === 'hide') {
          $(this).closest('ul').parent('li').find('span.toggler').removeClass('visible').hide();
        }
        $(this).closest('ul').removeClass('open').hide().removeAttr('style').parent('li').find('a.focus').removeClass('focus').parent('li').next('li > a').focus();
      });
      // ul3
      // $('.ul3 > li:last-child > a').on('focusout', function () {
      //   if ($(this).next('span.toggler').length) {
      //     $(this).next('span.toggler').focus();
      //   } else {
      //     // $(this).closest('ul').parent('li').find('span.toggler').removeClass('visible').hide();
      //     $(this).closest('ul').removeClass('open').hide().removeAttr('style').parent('li').find('a.focus').removeClass('focus').parent('li').next('li > a').focus();
      //   }
      // });
      // $('.ul3 > li:last-child > a + span.toggler').on('focusout', function () {
      //   $(this).closest('ul').parent('li').find('span.toggler').removeClass('visible').hide();
      //   $(this).closest('ul').removeClass('open').hide().removeAttr('style').parent('li').find('a.focus').removeClass('focus').parent('li').next('li > a').focus();
      // });
    }

    // clicks outside of the nav elements
    function outsideClicks() {
      // when clicking outside of any element within or OF nav-primary, close the subnavs
      $(document).click(function (event) {
        if (!$(event.target).closest(accessibleNavContainer).length) {
          if ($('.ul3, .ul2', accessibleNavContainer).is(':visible')) {
            $('.ul3, .ul2', accessibleNavContainer).removeClass('open').hide().removeAttr('style');
          }
          // if span parameter is set to 'hide'
          if (spans === 'hide') {
            $('span.toggler').hide();
          }
        }
      });
    }

    // initialize functions in order
    togglers();
    togglerClick();
    togglerKeys();
    linkKeys();
    outsideClicks();
  };
}(jQuery));