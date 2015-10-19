angular.module('app.controllers')
.controller('PersonCtrl', ['data', function(data) { // data comes from resolve
	console.log('PersonCtrl initialized');

	this.person = data;
	console.log(data);

}])
