angular.module('app.controllers')
.controller('AccountRegisterCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
	console.log('AccountRegisterCtrl initialized');

	this.user = {};
	$scope.error = {};

	this.register = function() {
		// $ionicLoading

		var user = new Parse.User();
		user.set('username', this.user.email);
		user.set('password', this.user.password);
		user.set('email', this.user.email);

		user.signUp(null, {
			success: function(user) {
				// $ionicLoading.hide();
				$rootScope.user = user;
				$rootScope.isLoggedIn = true;
				$state.go('tab.new', {
					clear: true
				});
			},
			error: function(user, error) {
				// $ionicLoading.hide();
				if (error.code === 125) {
					$scope.error.message = 'Please specify a valid email address';
				} else if (error.code === 202) {
					$scope.error.message = 'The email address is already registered'
				} else {
					$scope.error.message = error.message;
				}
				$scope.$apply();
			}
		});
	};
}])
