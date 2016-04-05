import template from './navbar.html';
import controller from './navbar.controller';
import './navbar.scss';

const navbarComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default navbarComponent;