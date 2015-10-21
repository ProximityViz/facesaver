angular.module('app.controllers')
.controller('PersonCtrl', ['data', 'ParseFactory', '$stateParams', 
									 function(data,   ParseFactory,   $stateParams) { // data comes from resolve
	console.log('PersonCtrl initialized');

	this.showFactInput = false;
	this.fact = "";
	this.person = data;
	if (typeof(this.person.facts) === 'undefined') {
		this.person.facts = [];
	};
	console.log(data);

	this.addFact = function(fact) {
		this.person.facts.push(fact);
		ParseFactory.addFact($stateParams.personId, fact);
		this.fact = "";
	}

}])
