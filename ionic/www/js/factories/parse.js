angular.module('app.services')
.factory('ParseFactory', ['$q', function($q) {
	var people = [];
	var groups = [];
	var person;

	// define parse models
	var Friend = Parse.Object.extend("Friend");
	// var FriendCollection = Parse.Collection.extend({ model:Friend });
	var Group = Parse.Object.extend("UserGroup");

	Parse.initialize(PARSE_CREDENTIALS.applicationId, PARSE_CREDENTIALS.javascriptKey);
	var loggedInUser = Parse.User.current();

	function initSamplePeople() {
		people = [
			{
				'id': 0,
				'firstName': 'Bulbasaur',
				'species': 'Seed',
				'groups': ['Poison', 'Grass'],
				'facts': [
					'Weakness to Psychic',
					'Weakness to Flying',
					'Weakness to Ice',
					'Weakness to Fire',
					'Ability: Overgrow',
					'Evolves to Ivysaur'
				]
			},{
				'id': 1,
				'firstName': 'Charmander',
				'species': 'Lizard',
				'groups': ['Fire'],
				'facts': [
					'Ability: Blaze',
					'Weakness to Ground',
					'Weakness to Rock',
					'Weakness to Water',
					'Evolves to Charmeleon'
				]
			},{
				'id': 2,
				'firstName': 'Squirtle',
				'species': 'Tiny Turtle',
				'groups': ['Water'],
				'facts': [
					'Ability: Torrent',
					'Weakness to Electric',
					'Weakness to Grass',
					'Evolves to Wartortle'
				]
			},{
				'id': 3,
				'firstName': 'Pikachu',
				'species': 'Mouse',
				'groups': ['Electric'],
				'facts': [
					'Ability: Static',
					'Weakness to Ground',
					'Evolves to Raichu',
					'Evolves from Pichu'
				]
			}
		];
	}

	function logIn(username, password, callback) {
		Parse.User.logIn(username, password, {
			success: function(user) {
				loggedInUser = user;
				callback(user);
				getPeople();
			},
			error: function(user, error) {
				console.log("Error: " + error.message);
			}
		});
	};

	function signUp(username, password, callback) {
		Parse.User.signUp(username, password, {ACL: new Parse.ACL()}, {
			success: function(user) {
				loggedInUser = user;
				callback(user);
			},
			error: function(user, error) {
				console.log(error);
			}
		});
	};

	function logOut(callback) {
		Parse.User.logOut();
	};

	function getPerson(id) {
		var deferred = $q.defer();
		var query = new Parse.Query(Friend);
		query.equalTo("objectId", id);
		query.find({
			success: function(results) {
				console.log(results);
				person = {
					id: results[0].id,
					firstName: results[0].get('firstName'),
					lastName: results[0].get('lastName'),
					screenName: results[0].get('screenName'),
					groups: results[0].get('groups'),
					facts: results[0].get('facts')
				};
				deferred.resolve(person);
				// return person;
			},
			error: function(object, error) {
				console.log(error);
				deferred.reject(error);
			}
		});

		return deferred.promise;
	};

	function getPeople(callback) {
		var deferred = $q.defer();
		if (!loggedInUser) {
			initSamplePeople();
			deferred.resolve(people);
		} else {
			var query = new Parse.Query(Friend);
			query.equalTo("user", loggedInUser);
			query.find({
				success: function(results) {
					people.length = 0; // empty "people" array
					for (var i = 0; i < results.length; i++) {
						var person = {
							id: results[i].id,
							firstName: results[i].get('firstName'),
							lastName: results[i].get('lastName'),
							screenName: results[i].get('screenName')
						};
						people.push(person);
					};
					deferred.resolve(people);
				},
				error: function(object, error) {
					console.log(error);
					deferred.reject(error);
				}
			});
		}
		return deferred.promise;
	};

	function addPerson(person) {
		var deferred = $q.defer();
		var friend = new Friend();

		friend.set('user', loggedInUser);
		friend.set('firstName', person.firstName);
		friend.set('lastName', person.lastName);
		friend.set('screenName', person.screenName);
		friend.set('groups', person.groups);
		friend.setACL(new Parse.ACL(Parse.User.current())); // read and write by this user only
		friend.save(null, {
			success: function(friend) {
				console.log('success');
				console.log(friend);
				person = friend;
				getPeople();
				deferred.resolve(friend);
			},
			error: function(friend, error) {
				console.log('error');
				deferred.reject(error);
			}
		});
		return deferred.promise;
	};

	function addFact(id, fact) {
		var query = new Parse.Query(Friend);
		query.get(id, {
			success: function(friend) {
				console.log(friend);
				var facts = friend.get('facts');
				if (typeof(facts) === 'undefined') {
					facts = [];
				};
				facts.push(fact);
				console.log(facts);
				friend.set('facts', facts);
				friend.save();
			}
		});
	}

	function getGroups() {
		var deferred = $q.defer();
		if (!loggedInUser) {
			// handle this
			deferred.resolve();
		} else {
			var query = new Parse.Query(Group);
			query.equalTo("user", loggedInUser);
			query.find({
				success: function(results) {
					groups.length = 0; // empty "groups" array
					for (var i = 0; i < results.length; i++) {
						var group = {
							id: results[i].id,
							name: results[i].get('name')
						};
						groups.push(group);
					};
					console.log(groups);
					deferred.resolve(groups);
				},
				error: function(object, error) {
					console.log(error);
					deferred.reject(error);
				}
			});
		}
		return deferred.promise;
	};

	function addGroup(name) {
		var deferred = $q.defer();
		var group = new Group();

		group.set('user', loggedInUser);
		group.set('name', name);
		group.setACL(new Parse.ACL(Parse.User.current()));
		group.save(null, {
			success: function(group) {
				console.log('success');
				getGroups().then(function() {
					deferred.resolve(group);
				});
			},
			error: function(group, error) {
				console.log('error');
				deferred.reject(error);
			}
		});
		return deferred.promise;
	};

	function getUser() {
		if (loggedInUser) {
			return loggedInUser;
		}
	};

	return {
		logIn: logIn,
		signUp: signUp,
		logOut: logOut,
		getPerson: getPerson,
		getPeople: getPeople,
		addPerson: addPerson,
		addFact: addFact,
		getGroups: getGroups,
		addGroup: addGroup,
		getUser: getUser
	}
}])
