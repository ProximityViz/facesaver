angular.module('app.controllers')
.controller('NewCtrl', ['ParseFactory', '$rootScope', function(ParseFactory, $rootScope) {
	console.log('NewCtrl initialized');

	this.friend = {};

	this.addFriend = function() {
		// this.friend.user = $rootScope.user.id;
		console.log(this.friend);
		ParseFactory.addPerson(this.friend).success(function(data) {
			// $state.go to friend;
			console.log(data);
		});
	}

}])
