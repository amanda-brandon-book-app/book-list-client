'use strict'

var app = app || {};

// (function(module) {

// const newBook = {};

// Post event listener
$('#post-button').on('click', handleNewForm);

// Post event handler
function handleNewForm(e) {
    e.preventDefault();
    let bookForm = {};

    bookForm.title = $('book-title').val()
    bookForm.author = $('book-author').val(),
    bookForm.isbn = $('book-isbn').val(),
    bookForm.image_url = $('book-image_url').val(),
    bookForm.description = $('book-description').val()
    $.post(`${app.ENVIRONMENT.apiURL}/api/v1/books`, bookForm)
        .then(data => console.log(data))
};
// module.newBook = newBook;

// })(app);
