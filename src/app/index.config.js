export function config ($logProvider, $kinveyProvider) {
  'ngInject';
  $logProvider.debugEnabled(true);

  $kinveyProvider.init({
    appKey: 'kid_byGoHmnX2',
    appSecret: '9b8431f34279434bbedaceb2fe6b8fb5'
  });
}
