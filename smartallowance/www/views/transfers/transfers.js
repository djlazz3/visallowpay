'Use Strict';
angular.module('App').controller('transfersController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {
    var ref = new Firebase(FURL);
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
    $scope.transferData = {
        sender:"",
        amount:"",
        receiver:""
      };
    $scope.submitTransfer = function(transferData) {
        console.log("posting data....");
        transferData = $scope.transferData;
        console.log(transferData);

        var transferRef = ref.child('transfer');
            //cardRef.child(uid).set(formData);
        transferRef.push(transferData);

        var cardRef = new Firebase(FURL + "/card");

        var allCards;

        cardRef.on('value', function (cardsSnapshot) {
            var cards = cardsSnapshot.val();
            cardIds = Object.keys(cards);
            allCards = cardIds.filter(function (cardId) {
              cards[cardId]["cardId"] = cardId;

              return true;
            }).map(function (cardId) {
              return cards[cardId];
            });
        });

        console.log(allCards);

        for (var i = 0 ; i < allCards.length ; i++) {
            if (allCards[i].cardName == transferData.sender) {
                console.log("it is the sender");
                allCards[i].amount = "88.0";

                console.log(allCards[i].amount);
                console.log(allCards[i]);
                console.log(allCards[i].cardId);
                console.log(FURL + "card/" + allCards[i].cardId);
                var Ref = new Firebase(FURL + "card/" + allCards[i].cardId);
                Ref.set(allCards[i]);
            }

            if (allCards[i].cardName == transferData.receiver) {
                console.log("it is the receiver");
                allCards[i].amount = "99.9";
                console.log(allCards[i].amount);
                var Ref = new Firebase(FURL + "card/" + allCards[i].cardId);
                Ref.set(allCards[i]);
            }

        }

        $scope.transferData = {
            sender:"",
            amount:"",
            receiver:""
          };


      };
});
