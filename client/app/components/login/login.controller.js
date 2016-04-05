const micRedirectUri = 'http://localhost:3000/';

class LoginController {
  constructor($state, $kinvey) {
    'ngInject';
    this.$state = $state;
    this.user = new $kinvey.User();
  }

  login(username, password) {
    return this.user.login(username, password).then(() => {
      this.$state.go('books');
    });
  }

  loginWithMIC() {
    return this.user.loginWithMIC(micRedirectUri).then(() => {
      this.$state.go('books');
    }).catch(error => {
      alert(error.message);
    });
  }
}

export default LoginController
