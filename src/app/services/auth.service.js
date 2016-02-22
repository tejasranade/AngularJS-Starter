const initializedSymbol = Symbol();
const authenticatedSymbol = Symbol();

export class AuthService {
  constructor($kinvey) {
    'ngInject';
    this.$kinvey = $kinvey;
    this[initializedSymbol] = false;
    this[authenticatedSymbol] = false;
  }

  init() {
    return this.$kinvey.User.getActiveUser().then(user => {
      if (user) {
        this[authenticatedSymbol] = true;
      }

      this[initializedSymbol] = true;
    });
  }

  isInitialized() {
    return this[initializedSymbol];
  }

  isAuthenticated() {
    return this[authenticatedSymbol];
  }

  login(username, password) {
    const user = new this.$kinvey.User();
    return user.login(username, password).then(user => {
      this[authenticatedSymbol] = true;
      return user;
    });
  }

  loginWithMIC() {
    const user = new this.$kinvey.User();
    return user.loginWithMIC('http://localhost:3000/').then(user => {
      this[authenticatedSymbol] = true;
      return user;
    });
  }

  logout() {
    return this.$kinvey.User.getActiveUser().then(user => {
      return user.logout();
    }).then(() => {
      this[authenticatedSymbol] = false;
    });
  }
}
