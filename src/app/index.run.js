export function runBlock($rootScope, $state, AuthService) {
  'ngInject';

  const stateChangeStartListener = $rootScope.$on('$stateChangeStart', function(event, toState) {
    if (toState.authenticate && !AuthService.isAuthenticated()) {
      event.preventDefault();
      $state.go('login');
    }
  });

  $rootScope.$on('$destroy', function() {
    stateChangeStartListener();
  });
}
