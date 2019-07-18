'use strict';

$(document).ready(function () {

    // Load file
    $('#input-file').change(function () {
        let file = $(this).prop('files')[0];
        $('#filename').val(file.name);

        let reader = new FileReader();
        reader.onload = function (event) { $('#text-box').val(event.target.result) };
        reader.onerror = function (event) { alert(`Error: ${event.target.error.code}`) };
        reader.readAsText(file);
    });

    // Save file
    $('#save-file').click(function () {
        let text = $('#text-box').val();
        let filename = $('#filename').val() || 'file.txt';

        $('<a>', {
            href: 'data:text/plain;charset=utf-8,' + encodeURIComponent(text),
            download: filename,
            css: { 'display': 'none' },
            click: function () { this.click(); } // execute the default click function
        }).appendTo('body').click().remove();
    });

    // Change color
    $('#color-picker').change(function () {
        $('option', this).each(function () {
            $('#text-box').removeClass($(this).val());
        });

        let newColor = $(':selected', this).val();
        $('#text-box').addClass(newColor);
    });

    // Drag and drop file
    $('#text-box').on('dragenter', function (event) {
        event.stopPropagation();
        event.preventDefault();
    });

    $('#text-box').on('dragover', function (event) {
        event.stopPropagation();
        event.preventDefault();
    });

    $('#text-box').on('drop', function (event) {
        event.stopPropagation();
        event.preventDefault();

        let file = event.originalEvent.dataTransfer.files[0];
        $('#filename').val(file.name);

        let reader = new FileReader();
        reader.onload = function (event) { $('#text-box').val(event.target.result) };
        reader.onerror = function (event) { alert(`Error: ${event.target.error.code}`) };
        reader.readAsText(file);
    });

});
