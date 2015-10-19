angular.module('app.controllers')
.controller('AccountPasswordCtrl', ['$scope', '$state', function($scope, $state) {
	console.log('AccountPasswordCtrl initialized');

	this.user = {};

	$scope.error = {};

	$scope.state = {
		success: false
	};

	this.reset = function() {
		// ionicLoading

		Parse.User.requestPasswordReset(this.user.email, {
			success: function() {
				// $ionicLoading.hide();
				$scope.state.success = true;
				$scope.$apply();
			},
			error: function(error) {
				// $ionicLoading.hide()
				if (error.code === 125) {
					$scope.error.message = 'Email address does not exist';
				} else {
					$scope.error.message = 'An unknown error has occurred. Please try again.';
				}
				$scope.$apply();
			}
		});
	};

	this.login = function() {
		$state.go('tag.account-login');
	};

}])
