angular.module('app.controllers')
.controller('AccountCtrl', ['ParseFactory', '$state', function(ParseFactory, $state) {
	console.log('AccountCtrl initialized');

	this.user = ParseFactory.getUser();

	if (typeof(this.user) === "undefined") {
		this.loggedIn = false;
	} else {
		this.loggedIn = true;
	}

	this.logOut = function() {
		ParseFactory.logOut();
		$state.go('tab.account-login', {
			clear: true
		});
	};

}])
