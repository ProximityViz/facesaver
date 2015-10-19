angular.module('app.services')
.factory('ParseFactory', ['$rootScope', function($rootScope) {
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

	function getPeople(callback) {
		console.log(loggedInUser);
		console.log(loggedInUser.id);
		if (!loggedInUser) {
			initSamplePeople();
		} else {
			var query = new Parse.Query(Friend);
			query.equalTo("user", "RUxBysnq8D");
			query.find({
				success: function(results) {
					people = results;
					console.log(results);
					return people;
				},
				error: function(object, error) {
					console.log(error);
				}
			});
		}
		return people;
	};

	function addPerson(person) {
		var Friend = Parse.Object.extend("Friend");
		var friend = new Friend();

		friend.save({
			firstName: person.firstName,
			lastName: person.lastName,
			screenName: person.screenName,
			user: {
				__type: 'Pointer',
				className: 'User',
				objectId: $rootScope.user.id
			}
		},{
			success: function(friend) {
				console.log('success');
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
		getPeople: getPeople,
		addPerson: addPerson,
		getUser: getUser
	}
}])
