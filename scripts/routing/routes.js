'use strict'

page('/', (ctx, next) => app.Book.fetchAll(() => app.bookView.initIndexPage(ctx, next)));

page('/books/new', ctx => app.bookView.initCreateBook(ctx));

page('/books/:book_id/update', (ctx, next) => app.Book.fetchOne(ctx, next), ctx => app.bookView.initUpdateForm(ctx));

page('/books/:book_id', (ctx, next) => app.Book.fetchOne(ctx, () => app.bookView.initDetailPage(ctx, next)));

page();