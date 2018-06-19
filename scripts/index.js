'use strict'

// TODO: Evaluate for production

function isProduction() {

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