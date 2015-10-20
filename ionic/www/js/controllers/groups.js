angular.module('app.controllers')
.controller('GroupsCtrl', ['$scope', '$ionicModal', 'ParseFactory', 'groups', // groups is resolved 
									 function($scope,   $ionicModal,   ParseFactory,   groups) {
	console.log('GroupsCtrl initialized');

	this.group = ""; // for adding a new group

	console.log(groups);

	this.groups = groups;

	$ionicModal.fromTemplateUrl('templates/partials/add-group.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.add = modal;
	});

	this.createGroup = function() {
		// parse factory, create group
		ParseFactory.addGroup(this.group);
		$scope.add.hide();
	};

}])
