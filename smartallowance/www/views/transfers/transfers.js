'Use Strict';
angular.module('App').controller('transfersController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {
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
});
