export function config ($logProvider, $kinveyProvider) {
  'ngInject';
  $logProvider.debugEnabled(true);

  $kinveyProvider.init({
    appKey: '<app-key>',
    appSecret: '<app-secret>'
  });
}
