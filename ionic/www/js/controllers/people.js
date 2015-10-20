angular.module('app.controllers')
.controller('PeopleCtrl', ['people', function(people) {
	console.log('PeopleCtrl initialized');

	this.people = people;

	console.log(this.people);
}])
