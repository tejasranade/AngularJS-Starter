import angular from 'angular';
import Books from './books/books';
import Login from './login/login';

const componentModule = angular.module('app.components', [
  Books.name,
  Login.name
]);

export default componentModule;
