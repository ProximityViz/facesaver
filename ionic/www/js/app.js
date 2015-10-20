angular.module('app', [
  'ionic', 
  'app.controllers', 
  'app.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.people', {
    url: '/people',
    views: {
      'tab-people': {
        templateUrl: 'templates/tab-people.html',
        controller: 'PeopleCtrl as people',
        resolve: {
          people: function(ParseFactory) {
            return ParseFactory.getPeople();
          }
        }
      }
    }
  })
  .state('tab.person-detail', {
    url: '/people/:personId',
    views: {
      'tab-people': {
        templateUrl: 'templates/person-detail.html',
        controller: 'PersonCtrl as person',
        resolve: {
          data: function(ParseFactory, $stateParams) {
            return ParseFactory.getPerson($stateParams.personId);
          }
        }
      }
    }
  })

  .state('tab.groups', {
    url: '/groups',
    views: {
      'tab-groups': {
        templateUrl: 'templates/tab-groups.html',
        controller: 'GroupsCtrl as groups',
        resolve: {
          groups: function(ParseFactory) {
            return ParseFactory.getGroups();
          }
        }
      }
    }
  })
  .state('tab.group-detail', {
    url: '/groups/:groupId',
    views: {
      'tab-groups': {
        templateUrl: 'templates/group-detail.html',
        controller: 'GroupDetailCtrl as group'
      }
    }
  })

  .state('tab.new', {
    url: '/new',
    views: {
      'tab-new': {
        templateUrl: 'templates/tab-new.html',
        controller: 'NewCtrl as new'
      }
    }
  })

  .state('tab.game', {
    url: '/game',
    views: {
      'tab-game': {
        templateUrl: 'templates/tab-game.html',
        controller: 'GameCtrl as game'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl as account'
      }
    }
  })

  .state('tab.account-login', {
    url: '/account/login',
    views: {
      'tab-account' : {
        templateUrl: 'templates/account-login.html',
        controller: 'AccountLoginCtrl as login'
      }
    }
  })

  .state('tab.account-register', {
    url: '/account/register',
    views: {
      'tab-account' : {
        templateUrl: 'templates/account-register.html',
        controller: 'AccountRegisterCtrl as register'
      }
    }
  })

  .state('tab.account-password', {
    url: '/account/password',
    views: {
      'tab-account' : {
        templateUrl: 'templates/account-password.html',
        controller: 'AccountPasswordCtrl as password'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/people');

});
angular.module('app.controllers', []);
angular.module('app.services', []);
