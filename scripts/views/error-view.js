'use strict'

var error = {};

(function(module) {

const errorView = {};

// Error catch
errorView.initErrorPage = (err) => {
    $('.container').hide();
    $('.error-view').show();
    $('#error-message').empty();
    Handlebars.compile($('#error-template').text(err));
    $('error-msg').append(template(err));
};

module.errorView = errorView;

})(error);