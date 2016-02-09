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
    return this.$kinvey.User.login(username, password).then(user => {
      this.$localStorage.authenticated = true;
      return user;
    });
  }

  logout() {
    return this.$kinvey.User.getActive().then(user => {
      if (user) {
        return user.logout();
      }

      throw new Error('There is not an active user to logout.');
    }).then(() => {
      this.$localStorage.authenticated = false;
    });
  }
}
