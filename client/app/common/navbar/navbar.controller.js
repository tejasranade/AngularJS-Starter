class NavbarController {
  constructor ($state, $kinvey) {
    'ngInject';
    this.$state = $state;
    this.$kinvey = $kinvey;
  }

  isAuthenticated() {
    const activeUser = this.$kinvey.User.getActiveUser();
    return !!activeUser;
  }

  logout() {
    if (!this.isAuthenticated()) {
      alert('There is not an active user to logout.');
      return;
    }

    const activeUser = this.$kinvey.User.getActiveUser();
    if (activeUser) {
      return activeUser.logout().then(() => {
        this.$state.go('login');
      });
    }
  }
}

export default NavbarController;
