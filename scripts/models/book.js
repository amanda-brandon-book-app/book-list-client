'use strict'

// var app = app || {};

// (function(module) {

var booksApp = {};
    
Book.all = [];
Book.slim = [];
Book.one = [];
    
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

// All
Book.loadAll = rows => {
    rows.sort((a, b) => {
        if(a.title < b.title) return -1;
        if(a.title > b.title) return 1;
        return 0;
    });
  
    Book.all = rows.map((info) => new Book(info));
};

// Slim
Book.loadSlim = rows => {
    rows.sort((a, b) => {
        if(a.title < b.title) return -1;
        if(a.title > b.title) return 1;
        return 0;
    });
  
    Book.slim = rows.map((info) => new Book(info));
};

// One
Book.loadOne = rows => {
    Book.one = rows.map((info) => new Book(info));
};

// =============== GETS ===================

// Fetch books from DB
booksApp.fetchAll = callback => {
    $.get(`${app.ENVIRONMENT.apiURL}/api/v1/books`)  
      .then(function(results) {
          Book.loadAll(results);
          callback();
        })
};

// Fetch books without a description or ISBN
booksApp.fetchSlim = callback => {
    $.get(`${app.ENVIRONMENT.apiURL}/api/v1/books-slim`)
        .then(results => {
            Book.loadSlim(results);
            callback();
        })
};

// Fetch one book
booksApp.fetchOne = callback => {
    $.get(`${app.ENVIRONMENT.apiURL}/api/v1/books/${id}`)
        .then(results => {
            Book.loadOne(results);
            callback();
        })
};

// ================ POSTS ================

// Initializes home page
booksApp.initIndexPage = () => {
    $('.book-container').hide();
    $('.book-booksApp').show();
    Book.all.forEach(bookInst => $('#book-list').append(bookInst.toHtml()));
};

// Call fetch all on page load
$(document).ready(function() {
    booksApp.fetchAll(booksApp.initIndexPage);
});

// module.booksApp = booksApp;

// })(app);