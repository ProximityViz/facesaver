angular.module('app.controllers')
.controller('PeopleCtrl', ['$ionicLoading', '$state', 'people', 
									 function($ionicLoading,   $state,   people) {
	console.log('PeopleCtrl initialized');

	this.people = people;

	console.log(this.people);

	this.goToPerson = function(id) {
		console.log("test");
		$ionicLoading.show();
		$state.go('tab.person-detail/:personId',{personId: id}).then(function() {
			$ionicLoading.hide();
		});
	};
}])
