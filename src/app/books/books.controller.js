class BookController {
  constructor(book, $kinvey, $uibModalInstance) {
    'ngInject';
    this.book = book;
    this.$kinvey = $kinvey;
    this.$uibModalInstance = $uibModalInstance;
  }

  save(book = {}) {
    const store = this.$kinvey.DataStore.getInstance('books', this.$kinvey.DataStoreType.Sync);
    return store.save(book).then(book => {
      this.$uibModalInstance.close(book);
    });
  }

  cancel() {
    this.$uibModalInstance.close();
  }
}

export class BooksController {
  constructor (books, $scope, $kinvey, $uibModal, $window) {
    'ngInject';
    this.books = books;
    this.$scope = $scope;
    this.$kinvey = $kinvey;
    this.$uibModal = $uibModal;
    this.$window = $window;
    this.activate();
  }

  activate() {
    this.refresh();
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
      templateUrl: 'app/books/book.html',
      controller: BookController,
      controllerAs: 'vm',
      resolve: {
        book: function() {
          return {};
        }
      }
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

    const store = this.$kinvey.DataStore.getInstance('books', this.$kinvey.DataStoreType.Sync);
    return store.removeById(book._id).catch(() => {
      this.books.push(book);
    });
  }

  refresh() {
    const store = this.$kinvey.DataStore.getInstance('books', this.$kinvey.DataStoreType.Sync);
    store.pull().then(books => {
      this.books = books;
      this.$scope.$digest();
    }).catch(error => {
      this.$window.alert(error.message);
    });
  }

  sync() {
    const store = this.$kinvey.DataStore.getInstance('books', this.$kinvey.DataStoreType.Sync);
    store.sync().then(result => {
      this.$window.alert(`Pulled successfully ${result.pull.length} entities.`);
      this.$window.alert(`Pushed successfully ${result.push.success.length} entities and failed to push ${result.push.error.length} entities.`);
    });
  }
}
