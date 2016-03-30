export class AuthService {
  constructor($kinvey) {
    'ngInject';
    this.$kinvey = $kinvey;
  }

  isAuthenticated() {
    const user = this.$kinvey.User.getActiveUser();
    return user ? true : false;
  }

  login(username, password) {
    const user = new this.$kinvey.User();
    return user.login(username, password).then(user => {
      return user;
    });
  }

  loginWithMIC() {
    const user = new this.$kinvey.User();
    return user.loginWithMIC('http://localhost:3000/').then(user => {
      return user;
    });
  }

  logout() {
    const user = this.$kinvey.User.getActiveUser();
    return user.logout();
  }
}
