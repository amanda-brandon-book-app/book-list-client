'use strict'

var error = {};

(function(module) {

// Error catch
errorView.initErrorPage = (err) => {
    $('.container').hide();
    $('.error-view').show();
    $('#error-message').empty();
    Handlebars.compile($('#error-template').text(err));
};

})(error);