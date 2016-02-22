import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { BooksController } from './books/books.controller';
import { LoginController } from './login/login.controller';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { AuthService } from '../app/services/auth.service';

angular.module('starter', [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngMessages',
  'ngAria',
  'ui.router',
  'ui.bootstrap',
  'kinvey'
]).config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('BooksController', BooksController)
  .controller('LoginController', LoginController)
  .directive('navbar', NavbarDirective)
  .service('AuthService', ($kinvey) => new AuthService($kinvey));
