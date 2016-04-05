import angular from 'angular';
import uiRouter from 'angular-ui-router';
import booksComponent from './books.component';

const booksModule = angular.module('books', [
  uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
  'ngInject';

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('books', {
      url: '/',
      template: '<books></books>',
      authenticate: true
    });
})
.component('books', booksComponent);

export default booksModule;
