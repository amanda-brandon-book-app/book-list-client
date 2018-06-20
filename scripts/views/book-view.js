'use strict'

// All instances
var bookView = {};

// IFFE
(function(module){

// Creates book objects
function Book(bookObj) {
    Object.keys(bookObj).forEach(key => this[key] = bookObj[key]);
};

// Render books to HTML
Book.prototype.toHtml = function() {
    var template = Handlebars.compile($('#book-list-template').text());
    
    return template(this);
};

// Load book instances
Book.all = [];

Book.loadAll = rows => {
    rows.sort((a, b) => {
        if(a.title < b.title) return -1;
        if(a.title > b.title) return 1;
        return 0;
    });
  
    Book.all = rows.map((info) => new Book(info));
};

// Fetch books from DB
// Replace hard code with template literal after testing
// `${app.ENVIRONMENT.apiURL}/api/v1/books`
Book.fetchAll = callback => {
    $.get('http://localhost:3000/api/v1/books')  
      .then(function(results) {
          Book.loadAll(results);
          callback();
        })
};

// Append books to HTML
bookView.initIndexPage = () => {
    $('.book-container').hide();
    $('.book-view').show();
    Book.all.forEach(bookInst => $('#book-list').append(bookInst.toHtml()));
};

// Call fetch all on page loade
$(document).ready(function() {
    Book.fetchAll(bookView.initIndexPage);
});

// Closes IFFE
})(bookView);