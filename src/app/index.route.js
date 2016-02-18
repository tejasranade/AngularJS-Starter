export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    })
    .state('books', {
      url: '/',
      templateUrl: 'app/books/books.html',
      controller: 'BooksController',
      controllerAs: 'vm',
      authenticate: true,
      resolve: {
        books: ['$kinvey', function($kinvey) {
          const store = $kinvey.DataStore.getInstance('books', $kinvey.DataStoreType.Sync);
          return store.find();
        }]
      }
    });

  $urlRouterProvider.otherwise('/');
}
