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

    .controller('LoginCtrl', function($scope, $state, Users, Main) {
        var existingUsers = Users.getUsers();
        $scope.existingUser = { username: ''};
        $scope.newUser = { username: '',
                            name: '',
                            age: '',
                            position: 0,
                            role: '',
                            familyId: -1};

        $scope.existingUserNotExist = false;
        $scope.newUserExist = false;

        function family() {
            console.log(Main.getUser());
            if (Main.getUser().familyId !== -1) {
                console.log('dsadas', typeof Main.getUser().familyId);
                $state.go('path');
            } else {
                $state.go('join-create-family');
            }
        }


        $scope.login = function() {
            var index = _.findIndex(existingUsers, function(user) {
                return user.username === $scope.existingUser.username;
            });

            if (index !== -1) {
                $scope.existingUserNotExist = false;
                //TODO some bug here!!!
                Main.setUser(existingUsers[index].$id).then(function() {
                    family();
                });
            } else {
                $scope.existingUserNotExist = true;
            }
        };

        $scope.create = function() {
            var index = _.findIndex(existingUsers, function(user) {
                return user.username === $scope.newUser.username;
            });

            if (index === -1) {
                $scope.newUserExist = false;
                Users.createUser($scope.newUser).then(function(data) {
                    console.log(data);
                    Main.setUser(data.$id).then(function() {
                        family();
                    });
                });
            } else {
                $scope.newUserExist = true;
            }
        };
    })

    .controller('JoinCreateFamilyCtrl', function($scope, $state, Main, Families) {
        $scope.existingFamilies = Families.getFamilies();


        /* Join family variables */
        $scope.search = '';
        $scope.join = function(family) {
            Families.addUserToFamily(Main.getUser().$id, family.$id).then(function(data) {
                $state.go('path');
            });
        };

        /* Create family variables */
        $scope.newFamily = { username: '',
                             name: ''};
        $scope.newFamilyExist = false;

        $scope.create = function() {
            var index = _.findIndex($scope.existingFamilies, function(family) {
                return family.username === $scope.newFamily.username;
            });

            if (index === -1) {
                $scope.newFamilyExist = false;
                Families.createFamily($scope.newFamily).then(function(familyData) {
                    Families.addUserToFamily(Main.getUser().$id, familyData.$id).then(function() {
                        $state.go('path');
                    });
                });
            } else {
                $scope.newFamilyExist = true;
            }
        };
    })

    .controller('PathCtrl', function($scope, $window, $state, Main, Users) {
        $scope.pathTasks = [0, 1, 2, 3];
        $scope.getTheClass = function(task) {
            return 'pos' + task;
        };

        $scope.pickTask = function(task){

            if ($scope.userPosition === task){
                $state.go('task');
            }
            else{
                $window.alert("Finsh your task!!");
            }

        };

        Main.getFamily().then(function(familyMembers) {

            //TODO: combine arrays
            var familyPath = new Array($scope.pathTasks.length);
            for (var i=0; i<familyPath.length; i++){
                familyPath[i] = [];
            }


            familyMembers.forEach(function(entry){


                Users.getUser(entry.$value).then(function (x){
                    familyPath[x.position].push(x.$id);

                    console.log(familyPath)

                });

                //familyPath[entry.position].push(entry.name);
            });


        });



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
