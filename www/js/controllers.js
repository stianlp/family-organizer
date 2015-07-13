angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope, Users) {
        $scope.memberDetails = {name: '', age: ''};

        $scope.teamMembers = Users.getUsers();

        $scope.add = function() {
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

    .controller('PathCtrl', function($scope, $window, $state, Main) {
        $scope.pathTasks = [0, 1, 2, 3];

        //Main.getUser().$loaded().then(function(x) {
        //    $scope.userPosition = x.position;
        //});
        //
        $scope.userPosition = Main.getUser().position;

        $scope.pickTask = function(task){

            if ($scope.userPosition === task){
                $state.go('task');
                console.log(task);
            }
            else{
                $window.alert("Finsh your task!!");
            }

        };
    })

    .controller('TaskCtrl', function($scope, $window, Main, Users, Tasks) {
        //TODO add logic here
        Tasks.getTask().$loaded().then(function(x) {
            $scope.task = x.task;
        });

        console.log("were here");
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
