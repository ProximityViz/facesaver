angular.module('app.controllers')
.controller('GroupsCtrl', ['$scope', '$ionicModal', '$ionicLoading', 'ParseFactory', 'groups', // groups is resolved 
									 function($scope,   $ionicModal,   $ionicLoading,   ParseFactory,   groups) {
	console.log('GroupsCtrl initialized');

	this.group = ""; // for adding a new group inside ionicModal

	this.groups = groups;

	$ionicModal.fromTemplateUrl('templates/partials/add-group.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.add = modal;
	});

	this.createGroup = function() {
		$ionicLoading.show();
		ParseFactory.addGroup(this.group).then(function() {
			$ionicLoading.hide();
			$scope.add.hide();
		});
	};

}])
