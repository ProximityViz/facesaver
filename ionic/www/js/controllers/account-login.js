angular.module('app.controllers')
.controller('AccountLoginCtrl', ['$scope', 'ParseFactory', '$state', function($scope, ParseFactory, $state) {
	console.log('AccountLoginCtrl initialized');

	this.user = {
		username: null,
		password: null
	};

	$scope.error = {};

	this.login = function() {
		// ionicLoading

		ParseFactory.logIn(this.user.username, this.user.password, function(user) {
			$state.go('tab.new', {
				clear: true
			});
		});


		// var user = this.user;
		// Parse.User.logIn(('' + user.username).toLowerCase(), user.password, {
		// 	success: function(user) {
		// 		// $ionicLoading.hide();
		// 		$rootScope.user = user;
		// 		$rootScope.isLoggedIn = true;
		// 		$state.go('tab.new', {
		// 			clear: true
		// 		});
		// 	},
		// 	error: function(user, error) {
		// 		// $ionicLoading.hide();
		// 		if (error.code === 101) {
		// 			$scope.error.message = 'Invalid login credentials';
		// 		} else {
		// 			$scope.error.message = 'An unexpected error has occurred. Please try again.';
		// 		}
		// 		$scope.$apply();
		// 	}
		// })
	};

	this.forgot = function() {
		$state.go('tab.account-password');
	};

}])
