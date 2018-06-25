'use strict'

var app = app || {};

(function(module) {

// Error callback
function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
};

// ========== Constructor & Rendering ==========

// Creates book objects
function Book(bookObj) {
    Object.keys(bookObj).forEach(key => this[key] = bookObj[key]);
};

// Render books to HTML
Book.prototype.toHtml = function() {
    var template = Handlebars.compile($('#book-list-template').text());
    return template(this);
};

// =========== Load book instances ===========

Book.all = [];

// All
Book.loadAll = rows => {
    rows.sort((a, b) => {
        if(a.title < b.title) return -1;
        if(a.title > b.title) return 1;
        return 0;
    });
  
    Book.all = rows.map((info) => new Book(info));
};

// =============== GETS ===================

// Fetch books from DB
Book.fetchAll = callback => {
    $.get(`${app.ENVIRONMENT.apiURL}/api/v1/books`)  
    .then(function(results) {
        Book.loadAll(results);
    })
    .then(callback())
    .catch(errorCallback);     
};

// Fetch one book
Book.fetchOne = (ctx, callback) => {
    $.get(`${app.ENVIRONMENT.apiURL}/api/v1/books/${ctx.params.book_id}`)
    .then(function(results) {
        ctx.book = results[0]
    })
    .then(callback())
    .catch(errorCallback);
};

// ================ POST ================

Book.create = book => 
    $.post(`${app.ENVIRONMENT.apiURL}/api/v1/books`, book)
    .then(() => page('/'))
    .catch(errorCallback);

// =============== UPDATE ===============

Book.update = (book, bookNum) =>
    $.ajax({
        url: `${app.ENVIRONMENT.apiURL}/api/v1/books/${bookNum}`,
        method: 'PUT',
        data: book
    })
    .then(() => page(`/books/${book_id}`))
    .catch(errorCallback);

// =============== DELETE ===============

Book.delete = id =>
    $.ajax({
        url: `${app.ENVIRONMENT.apiURL}/api/v1/books/${id}`,
        method: 'DELETE'
    })
    .then(() => page('/'))
    .catch(errorCallback);

module.Book = Book;

})(app);