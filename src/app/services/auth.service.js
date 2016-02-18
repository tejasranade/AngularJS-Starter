export class AuthService {
  constructor($kinvey, $localStorage) {
    'ngInject';
    this.$kinvey = $kinvey;
    this.$localStorage = $localStorage;
  }

  isAuthenticated() {
    return this.$localStorage.authenticated;
  }

  login(username, password) {
    const user = new this.$kinvey.User();
    return user.login(username, password).then(user => {
      this.$localStorage.authenticated = true;
      return user;
    });
  }

  logout() {
    return this.$kinvey.User.logout().then(() => {
      this.$localStorage.authenticated = false;
    });
  }
}
