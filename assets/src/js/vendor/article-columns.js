jQuery(document).ready(function ($) {
  function makeColumns() {
    $(':not(.col-2) + .col-2, * > .col-2:first-of-type').each(function () {
      $(this).nextUntil(':not(.col-2)').addBack().wrapAll('<div class="columns" />');
    });
    $(':not(.col-3) + .col-3, * > .col-3:first-of-type').each(function () {
      $(this).nextUntil(':not(.col-3)').addBack().wrapAll('<div class="columns" />');
    });
    $(':not(.col-4) + .col-4, * > .col-4:first-of-type').each(function () {
      $(this).nextUntil(':not(.col-4)').addBack().wrapAll('<div class="columns" />');
    });
    $(':not(.col-5) + .col-5, * > .col-5:first-of-type').each(function () {
      $(this).nextUntil(':not(.col-5)').addBack().wrapAll('<div class="columns" />');
    });
    $(':not(.col-6) + .col-6, * > .col-6:first-of-type').each(function () {
      $(this).nextUntil(':not(.col-6)').addBack().wrapAll('<div class="columns" />');
    });
  }
  makeColumns();
});