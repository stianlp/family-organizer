angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope, Users) {
        $scope.memberDetails = {name: '', age: ''};

        $scope.teamMembers = Users.getUsers();

        $scope.add = function() {
            console.log($scope.teamMembers);
            // calling $add on a synchronized array is like Array.push(),
            // except that it saves the changes to our database!
            $scope.teamMembers.$add({
                name: $scope.memberDetails.name,
                age: $scope.memberDetails.age
            });
        };
    })

    .controller('ProfileCtrl', function($scope, $state, Users, Main) {
        $scope.users = Users.getUsers();

        $scope.chooseUser = function(user) {
            Main.setUser(user);
            $state.go('path');
        };
    })

    .controller('PathCtrl', function($scope, Main) {
        $scope.pathTasks = [0, 1, 2, 3];
        $scope.userPosition = Main.getUser().position;
        $scope.pickTask = function(task){

            if ($scope.userPosition === task){
                console.log(task);
            }
            else{
                console.log("big nono");
            }

        };
    })











    .controller('ChatsCtrl', function($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function(chat) {
            Chats.remove(chat);
        }
    })

    .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
