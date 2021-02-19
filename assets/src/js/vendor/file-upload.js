//File Upload Input Modifications
function initFileInput() {
  var fileinputs = document.querySelectorAll('input');

  Array.prototype.forEach.call(fileinputs, function (input) {
    console.log('input enter');
    if (input.type == "file") {
      var label = input.previousElementSibling,
        labelVal = label.innerHTML;

      label.classList.add('fileinput-label');

      input.addEventListener('change', function (e) {
        var fileName = '';

        label.classList.add('changed');

        if (this.files && this.files.length > 1) {
          fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
        }
        else {
          fileName = e.target.value.split("\\").pop();
        }

        if (fileName) {
          label.innerHTML = fileName;
        }
        else {
          label.innerHTML = labelVal;
        }
      });

      input.addEventListener('focus', function () { input.classList.add('has-focus'); });
      input.addEventListener('blur', function () { input.classList.remove('has-focus'); });
    }
  });
}