'use strict'

var app = {};

(function(module) {

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
Book.one = [];

// All
Book.loadAll = rows => {
    rows.sort((a, b) => {
        if(a.title < b.title) return -1;
        if(a.title > b.title) return 1;
        return 0;
    });
  
    Book.all = rows.map((info) => new Book(info));
};

// One
Book.loadOne = rows => {
    rows.sort((a,b) => {
        if(a.title < b.title) return -1;
        if(a.title > b.title) return 1;
        return 0;
    });

    Book.one = rows.map((info) => new Book(info));
};

// =============== GETS ===================

// Fetch books from DB
Book.fetchAll = callback => {
    $.get(`${app.ENVIRONMENT.apiURL}/api/v1/books`)  
      .then(function(results) {
          Book.loadAll(results);
          callback();
        })
};

// Fetch books without a description or ISBN
Book.fetchSlim = callback => {
    $.get(`${app.ENVIRONMENT.apiURL}/api/v1/books-slim`)
        .then(results => {
            Book.loadAll(results);
            callback();
        })
};

// Fetch one book
Book.fetchOne = callback => {
    $.get(`${app.ENVIRONMENT.apiURL}/api/v1/books:id`)
        .then(results => {
            Book.loadOne(results);
            callback();
        })
};

// ================ POSTS ================

// Create a new book
Book.prototype.insertNewBook = function(callback) {
    $.post(`${app.ENVIRONMENT.apiURL}/api/v1/books`, {
        title: this.title,
        author: this.author, 
        isbn: this.isbn, 
        image_url: this.image_url, 
        description: this.description
    })
    .then(console.log)
    .then(callback);
};



// Initializes home page
booksApp.initIndexPage = () => {
    $('.book-container').hide();
    $('.book-sbooksApp').show();
    Book.all.forEach(bookInst => $('#book-list').append(bookInst.toHtml()));
};

// Call fetch all on page load
$(document).ready(function() {
    Book.fetchAll(booksApp.initIndexPage);
});

})(app);