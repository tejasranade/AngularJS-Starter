export class LoginController {
  constructor($state, AuthService) {
    'ngInject';
    this.$state = $state;
    this.AuthService = AuthService;
  }

  login(username, password) {
    return this.AuthService.login(username, password).then(() => {
      this.$state.go('books');
    });
  }
}
