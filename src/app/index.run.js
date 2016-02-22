export function runBlock($rootScope, $state, AuthService) {
  'ngInject';

  const stateChangeStartListener = $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    if (!AuthService.isInitialized()) {
      event.preventDefault();
      AuthService.init().then(() => {
        $state.go(toState, toParams);
      });
    } else if (toState.authenticate && !AuthService.isAuthenticated()) {
      event.preventDefault();
      $state.go('login');
    }
  });

  $rootScope.$on('$destroy', function() {
    stateChangeStartListener();
  });
}
