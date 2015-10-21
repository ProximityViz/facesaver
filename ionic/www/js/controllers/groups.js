angular.module('app.controllers')
.controller('GroupsCtrl', ['$scope', '$ionicModal', 'ParseFactory', 'groups', // groups is resolved 
									 function($scope,   $ionicModal,   ParseFactory,   groups) {
	console.log('GroupsCtrl initialized');

	this.group = ""; // for adding a new group inside ionicModal

	this.groups = groups;

	$ionicModal.fromTemplateUrl('templates/partials/add-group.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.add = modal;
	});

	this.createGroup = function() {
		ParseFactory.addGroup(this.group).then(function() {
			groups = ParseFactory.getGroups().then(function() {
				$scope.add.hide();
			});
		});
	};

}])
