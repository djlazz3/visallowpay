'Use Strict';
angular.module('App').controller('homeController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {
  var ref = new Firebase(FURL);
  console.log(ref.getAuth())
  var userId = ref.getAuth() != null ? ref.getAuth().uid : null;
  if (userId == null) { console.log("User is not authenticated"); }
  var profileRef = new Firebase(FURL + "/profile" + "/" + userId);

  var cardRef = new Firebase(FURL + "/card");

  var currentUsersCards = cardRef.orderByChild("uid").equalTo(userId);
  cardRef.on('value', function (cardsSnapshot) {
    var cards = cardsSnapshot.val(),
    cardIds = Object.keys(cards);

    $scope.currentUserCards = cardIds.filter(function (cardId) {
      var cardInfo = cards[cardId];
      if (String(cardInfo.uid) == String(userId)) {
        return true;
      }
      return false;
    }).map(function (cardId) {
      return cards[cardId];
    });

  });

  profileRef.on("value", function(snap) {
	  	console.log(snap.val());
        var users = snap.val();
        var key = Object.keys(users);

		      $scope.currentUserName = users.name;
  }, function (errorObject) {
	  	console.log("The read failed: " + errorObject.code);
  });

  $scope.logOut = function () {
      Auth.logout();
      $location.path("/login");
  }

  var randomAmount = parseFloat(Math.random() * (10000 - 100) + 100).toFixed(2);

  $scope.formData = {
        uid: userId,
        cardName: "",
        cardNumber: "",
        expirationDate: "",
        CVV: "",
        amount: randomAmount
    };

  $scope.submitAddCardForm = function(formData) {
        console.log("posting data....");
        formData = $scope.formData;
        console.log(formData);

        var cardRef = ref.child('card');
     		//cardRef.child(uid).set(formData);
        cardRef.push(formData);

        var randomAmount = parseFloat(Math.random() * (10000 - 100) + 100).toFixed(2);

        $scope.formData = {
              uid: userId,
              cardName: "",
              cardNumber: "",
              expirationDate: "",
              CVV: "",
              amount: randomAmount
          };

    };


}
);

angular.module('App').controller('addCardController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {


}
);
