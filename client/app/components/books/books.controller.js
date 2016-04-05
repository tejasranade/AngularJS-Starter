import bookController from './book.controller';
import bookTemplate from './book.html';
const storeName = 'books';

class BooksController {
  constructor($scope, $kinvey, $uibModal, $window) {
    'ngInject';
    this.books = [];
    this.$scope = $scope;
    this.store = $kinvey.DataStore.getInstance(storeName, $kinvey.DataStoreType.Sync);
    this.$uibModal = $uibModal;
    this.$window = $window;
    this.activate();
  }

  activate(bookId) {
    return this.refresh();
  }

  view(book = {}) {
    return this.$uibModal.open({
      animation: true,
      template: bookTemplate,
      controller: bookController,
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
      template: bookTemplate,
      controller: bookController,
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

    return this.store.removeById(book._id).catch(() => {
      this.books.push(book);
    });
  }

  refresh() {
    return this.store.pull().then(books => {
      this.books = books;
      this.$scope.$digest();
    }).catch(error => {
      this.$window.alert(error.message);
    });
  }

  sync() {
    return this.store.sync().then(result => {
      this.$window.alert(`Pushed successfully ${result.push.success.length} entities and failed to push ${result.push.error.length} entities.`);
      this.$window.alert(`Pulled successfully ${result.pull.length} entities.`);
    });
  }
}

export default BooksController;


