// create modal markup
// <div class="modal" id="uniqueModalID" aria-label="Unique Modal Title" aria-hidden="true">
// 	<div class="modal-content">
//		<h1>Sample Modal Title</h1>
//		<span class="close-modal" aria-label="Close Modal">×</span>
// 	</div>
// </div>
// create modal link
// <a class="open-modal" href="#uniqueModalID">Open Sample Modal</a>
// OR to open a modal without moving its content in the dom
// <a class="open-modal modal-inline" href="#uniqueModalID">Open Sample Modal</a>
jQuery(document).ready(function ($) {

	// global variables
	var modalLink = undefined;
	var modal;
	var modalURL;
	var modalID;
	var modalCopy;
	var modalFocus;
	var modalHeight;

	// add overlay
	$('body').append('<div class="modal-overlay" tabindex="-1"></div>');

	// collect all modals
	var modals = [];
	$('.modal').each(function () {
		$(this).attr('hidden', 'hidden').attr('role', 'dialog').attr('tabindex', '-1');
		modals.push($(this).attr('id'));
	});

	// if url has hash for modal open that modal
	if (window.location.hash) {
		var modalHash = window.location.hash.substr(1);
		if (jQuery.inArray(modalHash, modals) != '-1') {
			modalURL = '#' + modalHash;
			modalID = modalHash;
			modalCopy = $(modalURL).clone();
			modalHeight = $(modalURL).attr('data-modal-height');
			if (typeof modalHeight !== typeof undefined && modalHeight !== false) {
				$(modalURL).css({
					height: modalHeight + 'px',
					'min-height': 'calc(' + modalHeight + 'px - 40px)'
				})
			}
			if ($(modalURL).hasClass('modal-inline')) {
				$(modalURL).parent().addClass('modal-inline-parent');
				$('html, body').toggleClass('modal-open');
				$('.modal-overlay').toggleClass('show-modal modal-inline');
				$(modalURL).toggleClass('show-modal');
				$(modalURL).removeAttr('hidden').attr('aria-hidden', 'false').attr('tabindex', '0');
				$('.modal-content .close-modal').addClass('modal-inline').attr('tabindex', '0');
				$(modalURL).focus();
				modalFocus = $(modalURL + ' > .modal-content');
				focusable(modalFocus);
			} else {
				modalCopy = $(modalURL).clone();
				$(modalURL).replaceWith('<span data-modalid="' + modalID + '" aria-hidden="true" hidden></span>');
				modal(modalURL);
			}
		}
	}

	$(document).on('click', '.open-modal', function (e) {
		e.preventDefault();
		// set variables
		modalLink = $(this);
		modalURL = $(this).attr('href');
		modalID = modalURL.replace(/^#/, '');
		modalHeight = $(modalURL).attr('data-modal-height');

		// open modal if it exists in modals array
		if (jQuery.inArray(modalID, modals) != '-1') {
			if (typeof modalHeight !== typeof undefined && modalHeight !== false) {
				$(modalURL).css({
					height: modalHeight + 'px',
					'min-height': 'calc(' + modalHeight + 'px - 40px)'
				})
			}
			if ($(modalLink).hasClass('modal-inline')) {
				$(modalURL).parent().addClass('modal-inline-parent');
				$('html, body').toggleClass('modal-open');
				$('.modal-overlay').insertAfter(modalURL).toggleClass('show-modal modal-inline');
				$(modalURL).toggleClass('show-modal');
				$(modalURL).removeAttr('hidden').attr('aria-hidden', 'false').attr('tabindex', '0');
				$('.close-modal', modalURL).addClass('modal-inline').attr('tabindex', '0');
				$(modalURL).focus();
				modalFocus = $(modalURL + ' > .modal-content');
				focusable(modalFocus);
			} else {
				modalCopy = $(modalURL).clone();
				$(modalURL).replaceWith('<span data-modalid="' + modalID + '" aria-hidden="true" hidden></span>');
				modal(modalURL);
			}
		}
	});

	// modal
	function modal() {
		$('.modal-overlay').after(modalCopy);
		$('html, body').toggleClass('modal-open');
		$('.modal-overlay').toggleClass('show-modal');
		$(modalURL).toggleClass('show-modal');
		$(modalURL).removeAttr('hidden').attr('aria-hidden', 'false').attr('tabindex', '0');
		$('.modal-content .close-modal').attr('tabindex', '0');
		$(modalURL).focus();
		modalFocus = $(modalURL + ' > .modal-content');
		focusable(modalFocus);
	}

	// find focusable items
	function focusable() {
		var modalFocusable = $('span.close-modal, a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]', modalFocus);
		var modalFocusableFirst = modalFocusable.first();
		var modalFocusableLast = modalFocusable.last();
		modalFocusableLast.on('keydown', function (e) {
			if ((e.which === 9 && !e.shiftKey)) {
				e.preventDefault();
				modalFocusableFirst.focus();
			}
		});
		modalFocusableFirst.on('keydown', function (e) {
			if ((e.which === 9 && e.shiftKey)) {
				e.preventDefault();
				modalFocusableLast.focus();
			}
		});
	}

	// focus to modal content
	$(document).keydown(function (e) {
		if ($(e.target).is('.modal')) {
			if (e.keyCode === 9) {
				modalFocus = $(modalURL + ' > .modal-content');
				focusable(modalFocus);
			}
		}
	});

	// close when clicking overlay / outside of modal window
	$('.modal-overlay').on('click', function () {
		$('html, body').removeClass('modal-open');
		$(this).removeClass('show-modal');
		if (!$(this).hasClass('modal-inline')) {
			modalCopy.remove();
			$('span[data-modalid="' + modalID + '"]').replaceWith(modalCopy);
			$(modalURL).attr('hidden', 'hidden').attr('aria-hidden', 'true').attr('tabindex', '-1');
			$('.modal').removeClass('show-modal');
		} else {
			// modalCopy.remove();
			$(modalURL).parent().removeClass('modal-inline-parent');
			$(modalURL).removeClass('show-modal');
			$(modalURL).attr('hidden', 'hidden').attr('aria-hidden', 'true').attr('tabindex', '-1');
		}
		if (modalLink !== undefined) {
			// modalCopy.remove();
			modalLink.focus();
			modalLink = undefined;
		}
	});

	// dont close modal if clicking anything but close button
	$('.modal-content *:not(.close-modal)').on('click', function (e) {
		e.stopPropagation();
	});

	// close modal with button
	$(document).on('click', '.close-modal', function () {
		$('html, body').removeClass('modal-open');
		$('.modal-overlay').removeClass('show-modal');
		if (!$(this).hasClass('modal-inline')) {
			modalCopy.remove();
			$('span[data-modalid="' + modalID + '"]').replaceWith(modalCopy);
			$(modalURL).attr('hidden', 'hidden').attr('aria-hidden', 'true').attr('tabindex', '-1');
			$('.modal').removeClass('show-modal');
		} else {
			$(modalURL).parent().removeClass('modal-inline-parent');
			$(modalURL).removeClass('show-modal');
			$(modalURL).attr('hidden', 'hidden').attr('aria-hidden', 'true').attr('tabindex', '-1');

		}
		if (modalLink != undefined) {
			// modalCopy.remove();
			modalLink.focus();
			modalLink = undefined;
		}
	});

	// close modal if close is focused and enter key pressed
	// focus to modal content
	$(document).keydown(function (e) {
		if ($(e.target).is('.close-modal')) {
			if (e.keyCode === 13) {
				$('html, body').removeClass('modal-open');
				$('.modal-overlay').removeClass('show-modal');
				if (!$('.modal-overlay').hasClass('modal-inline')) {
					modalCopy.remove();
					$('span[data-modalid="' + modalID + '"]').replaceWith(modalCopy);
					$(modalURL).attr('hidden', 'hidden').attr('aria-hidden', 'true').attr('tabindex', '-1');
					$('.modal').removeClass('show-modal');
				} else {
					$(modalURL).parent().removeClass('modal-inline-parent');
					$(modalURL).removeClass('show-modal');
					$(modalURL).attr('hidden', 'hidden').attr('aria-hidden', 'true').attr('tabindex', '-1');
				}
				if (modalLink !== undefined) {
					modalLink.focus();
					modalLink = undefined;
				}
			}
		}
	});

	// close modal with escape key
	$(document).on('keyup', function (e) {
		if (e.keyCode === 27) {
			e.preventDefault();
			if ($('body').hasClass('modal-open')) {
				$('html, body').removeClass('modal-open');
				$('.modal-overlay').removeClass('show-modal');
				if (!$('.modal-overlay').hasClass('modal-inline')) {
					modalCopy.remove();
					$('span[data-modalid="' + modalID + '"]').replaceWith(modalCopy);
					$(modalURL).attr('hidden', 'hidden').attr('aria-hidden', 'true').attr('tabindex', '-1');
					$('.modal').removeClass('show-modal');
				} else {
					$(modalURL).parent().removeClass('modal-inline-parent');
					$(modalURL).removeClass('show-modal');
					$(modalURL).attr('hidden', 'hidden').attr('aria-hidden', 'true').attr('tabindex', '-1');
				}
				if (modalLink !== undefined) {
					modalLink.focus();
					modalLink = undefined;
				}
			}
		}
	});
});
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
//# sourceMappingURL=main.js.map
