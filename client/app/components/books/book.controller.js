import template from './book.html';
const storeName = 'books';

class BookController {
  constructor(book, $kinvey, $uibModalInstance) {
    'ngInject';
    this.book = book;
    this.store = $kinvey.DataStore.getInstance(storeName, $kinvey.DataStoreType.Sync);
    this.$uibModalInstance = $uibModalInstance;
  }

  save(book = {}) {
    return this.store.save(book).then(book => {
      this.$uibModalInstance.close(book);
    });
  }

  cancel() {
    this.$uibModalInstance.close();
  }
}

export default BookController;
