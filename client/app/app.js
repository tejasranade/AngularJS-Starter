import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap'
import Kinvey from 'kinvey-angular-sdk'
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import './app.scss';

angular.module('app', [
    uiRouter,
    uiBootstrap,
    Kinvey.name,
    Common.name,
    Components.name
  ])
  .config(($kinveyProvider, $locationProvider) => {
    'ngInject';

    // Initialize kinvey
    $kinveyProvider.init({
      appKey: 'kid_byGoHmnX2',
      appSecret: '9b8431f34279434bbedaceb2fe6b8fb5'
    });

    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
  })
  .component('app', AppComponent)
  .run(($rootScope, $state, $kinvey) => {
    'ngInject';

    // Redirect to the login state if there is not an active user
    const stateChangeStartListener = $rootScope.$on('$stateChangeStart', (event, toState) => {
      const activeUser = $kinvey.User.getActiveUser();
      if (toState.authenticate && !activeUser) {
        event.preventDefault();
        $state.go('login');
      }
    });

    $rootScope.$on('$destroy', () => stateChangeStartListener());
  });
