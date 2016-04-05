import angular from 'angular';
import Navbar from './navbar/navbar';

const commonModule = angular.module('app.common', [
  Navbar.name
]);

export default commonModule;
