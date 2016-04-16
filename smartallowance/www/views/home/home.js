'Use Strict';
angular.module('App').controller('homeController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {
  var ref = new Firebase(FURL);
  var profileRef = new Firebase(FURL + "/profile");
  console.log(ref.getAuth())
  var userId = ref.getAuth() != null ? ref.getAuth().uid : null;
  if (userId == null) { console.log("User is not authenticated"); }

  profileRef.on("value", function(snap) {
	  	console.log(snap.val());
        var users = snap.val();
        var key = Object.keys(users);
		$scope.currentUserName = users[key[0]].name;
  }, function (errorObject) {
	  	console.log("The read failed: " + errorObject.code);
  });

  $scope.logOut = function () {
      Auth.logout();
      $location.path("/login");
  }

}
);
