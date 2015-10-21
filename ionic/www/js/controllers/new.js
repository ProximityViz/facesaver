angular.module('app.controllers')
.controller('NewCtrl', ['ParseFactory', '$rootScope', '$state', '$ionicLoading', 'groups', // groups is resolved
								function(ParseFactory,   $rootScope,   $state,   $ionicLoading,   groups) {
	console.log('NewCtrl initialized');

	this.friend = {};

	// autocomplete for groups
	this.readonly = false;
	this.selectedGroup = null;
	this.selectedGroups = [];
	this.searchText = null;
	this.querySearch = querySearch;
	this.groups = groups;
	groups.map(function(group) {
		group._lowername = group.name.toLowerCase();
		return group;
	});

	console.log(groups);

	function querySearch (query) {
		var results = query ? this.groups.filter(createFilterFor(query)) : [];
		console.log(this.selectedGroups);
		groupsToSave(this.selectedGroups);
		return results;
	}

	function createFilterFor(query) {
		var lowercaseQuery = angular.lowercase(query);
		return function filterFn(group) {
			return (group._lowername.indexOf(lowercaseQuery) === 0);
		};
	}

	function groupsToSave(groups) {
		// how should they be sorted?
		var savedGroups = [];
		for (var i = 0; i < groups.length; i++) {
			var group = {
				'id': groups[i].id,
				'name': groups[i].name
			};
			savedGroups.push(group);
		};
		console.log(savedGroups);
		return savedGroups;
	}

	this.addFriend = function() {
		$ionicLoading.show();
		this.friend.groups = groupsToSave(this.selectedGroups);
		// this.friend.user = $rootScope.user.id;
		var friendParseInfo = ParseFactory.addPerson(this.friend).then(function(response) {
			var friendParseInfo = response;
			console.log(friendParseInfo.id);
			$state.go('tab.people').then(function() {
				$ionicLoading.hide();
				$state.go('tab.person-detail/:personId',{personId: friendParseInfo.id});
			});
		});
		// $state.go to friend;
	}

}])
