class AddBookController {
  constructor($uibModalInstance, $kinvey) {
    'ngInject';
    this.$uibModalInstance = $uibModalInstance;
    this.$kinvey = $kinvey;
    this.book = {};
  }

  save(book = {}) {
    const booksDataStore = this.$kinvey.DataStore.getInstance('books');
    return booksDataStore.save(book).then(book => {
      this.$uibModalInstance.close(book);
    });
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

class BookController {
  constructor(book, $uibModalInstance) {
    'ngInject';
    this.book = book;
    this.$uibModalInstance = $uibModalInstance;
  }

  ok() {
    this.$uibModalInstance.close();
  }
}

export class BooksController {
  constructor ($scope, $kinvey, $uibModal) {
    'ngInject';
    this.books = [];
    this.$scope = $scope;
    this.$kinvey = $kinvey;
    this.$uibModal = $uibModal;
    this.activate();
  }

  activate() {
    const booksDataStore = this.$kinvey.DataStore.getInstance('books', Kinvey.DataStoreType.Cache);
    booksDataStore.find().then(response => {
      // response.cache contains the books in the device's cache
      this.books = response.cache;

      // Execute the network request to retrieve an new or update books
      return response.networkRequest.execute();
    }).then(books => {
      // Books is a merge of any new or updated books from the network and
      // existing books that had not changed from the cache
      this.books = books;
    });
  }

  view(book = {}) {
    return this.$uibModal.open({
      animation: true,
      templateUrl: 'app/books/book.html',
      controller: BookController,
      controllerAs: 'vm',
      resolve: {
        book: function() {
          return book;
        }
      }
    }).result;
  }

  add() {
    return this.$uibModal.open({
      animation: true,
      templateUrl: 'app/books/addBook.html',
      controller: AddBookController,
      controllerAs: 'vm'
    }).result.then(book => {
      this.books.push(book);
      return book;
    });
  }

  delete(book = {}) {
    for (let i = 0, len = this.books.length; i < len; i++) {
      if (this.books[i]._id && book._id === this.books[i]._id) {
          this.books.splice(i, 1);
          break;
      }
    }

    const booksDataStore = this.$kinvey.DataStore.getInstance('books');
    return booksDataStore.removeById(book._id).catch(() => {
      this.books.push(book);
    });
  }
}
