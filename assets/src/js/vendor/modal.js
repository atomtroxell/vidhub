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
	$('.modal-overlay').click(function () {
		$('html, body').removeClass('modal-open');
		$(this).removeClass('show-modal');
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
		if (modalLink !== undefined) {
			modalLink.focus();
			modalLink = undefined;
		}
	});

	// dont close modal if clicking anything but close button
	$('.modal-content *:not(.close-modal)').click(function (e) {
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