export function NavbarDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/navbar/navbar.html',
    scope: {},
    controller: NavbarController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class NavbarController {
  constructor ($state, AuthService) {
    'ngInject';
    this.$state = $state;
    this.AuthService = AuthService;
  }

  isAuthenticated() {
    return this.AuthService.isAuthenticated();
  }

  logout() {
    if (!this.AuthService.isAuthenticated()) {
      alert('There is not an active user to logout.');
      return;
    }

    return this.AuthService.logout().then(() => {
      this.$state.go('login');
    });
  }
}
