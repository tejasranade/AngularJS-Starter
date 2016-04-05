import template from './books.html';
import controller from './books.controller';
import './books.scss';

let booksComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default booksComponent;
