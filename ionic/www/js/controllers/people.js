angular.module('app.controllers')
// .controller('PeopleCtrl', ['people', function(people) {
.controller('PeopleCtrl', ['ParseFactory', function(ParseFactory) {
	console.log('PeopleCtrl initialized');

	this.people = ParseFactory.getPeople();

	console.log(this.people);
}])
