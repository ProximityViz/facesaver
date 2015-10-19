angular.module('app.services')
.factory('ParseFactory', ['$q', function($q) {
	var people = [];

	// define parse models
	var Friend = Parse.Object.extend("Friend");
	// var FriendCollection = Parse.Collection.extend({ model:Friend });

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
				var person = {
					id: results[0].id,
					firstName: results[0].get('firstName'),
					lastName: results[0].get('lastName'),
					screenName: results[0].get('screenName')
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
		console.log(loggedInUser);
		console.log(loggedInUser.id);
		if (!loggedInUser) {
			initSamplePeople();
		} else {
			var query = new Parse.Query(Friend);
			query.equalTo("user", loggedInUser);
			// query.include("lastName");
			query.find({
				success: function(results) {
					console.log(results);
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
					console.log(people);
					return people;
				},
				error: function(object, error) {
					console.log(error);
				}
			});
		}
		return people;
	};

	function addPerson(person, callback) {
		var friend = new Friend();

		friend.set('user', loggedInUser);
		friend.set('firstName', person.firstName);
		friend.set('lastName', person.lastName);
		friend.set('screenName', person.screenName);
		friend.setACL(new Parse.ACL(Parse.User.current())); // read and write by this user only
		friend.save(null, {
			success: function(friend) {
				console.log('success');
				// callback();
				getPeople();
			},
			error: function(friend, error) {
				console.log('error');
			}
		});
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
		getUser: getUser
	}
}])
