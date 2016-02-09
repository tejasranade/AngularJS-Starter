export function config ($logProvider, $kinveyProvider) {
  'ngInject';
  $logProvider.debugEnabled(true);

  $kinveyProvider.init({
    appKey: 'kid_WJt3WXdOpx',
    appSecret: '7cfd74e7af364c8f90b116c835f92e7d'
  });
}
