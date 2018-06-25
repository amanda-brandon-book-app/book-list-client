'use strict'

var app = app || {};

// IFFE
(function(module){
    
// All instances
var bookView = {};

// ============ reset page ============

function resetter() {
    $('.container').hide();
    $('.menu').slideUp(100);
};

// ============ Page inits ============

// Initializes home page
bookView.initIndexPage = function(ctx, next) {
    resetter();
    $('.book-view').show();
    $('#book-list').show();
    module.Book.all.forEach(book => $('#book-list').append(book.toHtml()));
    next();
};

// Initializes detail page
bookView.initDetailPage = function(ctx, next) {
    resetter();
    $('.detail-view').show();
    let template = Handlebars.compile($('#book-detail-template').text());
    $('.book-detail').append(template(ctx.book));

    $('#update-button').on('click', function() {
        page(`/books/${(this).data('id')}/update`);
    })
    next();
};

// Initializes create book form
bookView.initCreateBook = function() {
    resetter();
    $('.create-view').show();
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        let book = {
            title: event.target.title.value,
            author: event.target.author.value,
            isbn: event.target.isbn.value,
            image_url: event.target.image_url.value,
            description: event.target.description.value
        }
        module.Book.create(book);
    });
};

// Initializes update book form
bookView.initUpdateForm = function() {
    resetter();
    $('.update-view').show();
    $('#update-form input[name="title"]').val(ctx.book.title);
    $('#update-form input[name="author"]').val(ctx.book.author);
    $('#update-form input[name="isbn"]').val(ctx.book.isbn);
    $('#update-form input[name="image_url]').val(ctx.book.image_url);
    $('#update-form input[name="description]').val(ctx.book.description);

    $('#update-form').on('submit', function(event) {
        event.preventDefault();

        let book = {
            book_id: ctx.book.book_id,
            title: event.target.title.value,
            author: event.target.author.value,
            isbn: event.target.isbn.value,
            image_url: event.target.image_url.value,
            description: event.target.description.value
        };

        module.Book.update(book, book.book_id);
    });
};

// Closes IFFE
module.bookView = bookView;
})(app);