'use strict'

// TODO: Evaluate for production

function isProduction() {

};

// All instances

Book.all = [];
const bookView = {};

// Render books to HTML

Book.prototype.toHtml = function() {
    var template = Handlebars.compile($('#book-list-template').text());

    return template(this);
};

// Load book instances

Book.loadAll = bookData => {
    bookData.sort((a, b) => {
        if(a.title < b.title) return -1;
        if(a.title > b.title) return 1;
        return 0;
    });
  
    bookData.forEach(bookObject => Book.all.push(new Book(bookObject)))
};

// Fetch books from DB

Book.fetchAll = callback => {
    $.get('/api/v1/books')
      .then(
        function(results) {
          Book.loadAll(results);
          callback();
        }
      )
  };

// Book Constructor

bookView.create = () => {
    let books;
    $('#books').empty();
  
    books = new Book({
        image_url: $('#image_url').val(),
        title: $('#title').val(),
        author: $('#author').val(),
        isbn: $('#isbn').val(),
        // category: $('#category').val(),
        description: $('#description').val()
    });
  
    $('#books').append(books.toHtml());
  
    $('#export-field').show();
    $('#book-json').val(`${JSON.stringify(books)},`);
};

