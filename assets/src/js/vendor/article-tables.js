// in your main.js, homepage.js or subpage.js use $('SELECTORS').responsiveTables();
// the container will be searched for tables to make responsive
$.fn.responsiveTables = function () {
  var tableContainer = this;
  jQuery(document).ready(function ($) {
    if (!$('body').hasClass('dnnEditState')) {
      $('table', tableContainer).each(function () {
        // $('table:not(.pagenation > table')', tableContainer).each(function () {
        var responsiveTable = $(this);

        responsiveTable.removeAttr('border').removeAttr('cell-spacing').removeAttr('cellpadding');

        if (responsiveTable.find('thead').length === 0 && responsiveTable.find('tbody>tr>th').length === 0) {
          responsiveTable.find('tbody').before('<thead><tr></tr></thead>');
          responsiveTable.find('thead tr').append(responsiveTable.find('tbody tr:first td'));
          // responsiveTable.find('thead tr td').replaceWith('<th>' + $(this).text() + '</th>');
          $('thead td', responsiveTable).each(function () {
            $(this).replaceWith('<th>' + $(this).text() + '</th>');
          });
          responsiveTable.find('tbody tr:first').remove();
        } else if (responsiveTable.find('tbody>tr>th').length > 0) {
          responsiveTable.find('tbody').before('<thead><tr></tr></thead>');
          responsiveTable.find('thead tr').append(responsiveTable.find('th'));
          responsiveTable.find('tbody tr:first').remove();
        }

        if (!$(responsiveTable).parents('.search-results').length) {
          $(responsiveTable).addClass('responsive-table').attr('style', '');
        }

        $('td', responsiveTable).each(function () {
          var responsiveTableCell = $(this);
          var responsiveTableHeader = responsiveTableCell.closest('table').find('th').eq(responsiveTableCell.index()).text();
          $(responsiveTableCell).wrapInner('<span class="cell-content"></span>').prepend('<span class="cell-heading">' + responsiveTableHeader + '</span>');
        });
      });
    }
  });
}