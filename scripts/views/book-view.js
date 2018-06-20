'use strict'

// All instances
var bookView = {};

// IFFE
(function(module){

// Append books to HTML
bookView.initIndexPage = () => {
    $('.book-container').hide();
    $('.book-view').show();
    Book.all.forEach(bookInst => $('#book-list').append(bookInst.toHtml()));
};

// Closes IFFE
})(bookView);