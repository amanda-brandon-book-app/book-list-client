'use strict'

var app = {};

(function(module) {

const newBook = {};

newBook.create = function() {
    $('#book-list').empty();
    let bookForm = new app.Book({
        title: $('book-title').val(),
        author: $('book-author').val(),
        isbn: $('book-isbn').val(),
        image_url: $('book-image_url').val(),
        description: $('book-description').val()
    });

    bookForm.render = function() {
        var template = Handlebars.compile($('#book-list-template').text());
    
        return template(this);
    };

    $('#book-list').append(bookForm.render());
};

})(app);
