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
                            points: 0,
                            familyId: -1};

        $scope.existingUserNotExist = false;
        $scope.newUserExist = false;

        function family() {
            if (Main.getUser().familyId !== -1) {
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

        /* Comment this line if you want to refresh from path view*/
        //$scope.currentUser = Main.getUser();
        /* Uncomment this stuff if you want to refresh from path view */
        Main.setUser('-JuCNS9h-T7Yi3PHa07B').then(function(user) {
            $scope.currentUser = user;
            $scope.currentUser.task = {task: 'Clean you bathroom', points: 14};

            $scope.familyPath = new Array(Main.getPathLength());

            Main.getFamily().then(function(familyMembers) {
                $scope.family = familyMembers;
                console.log(familyMembers)
                _.forEach(familyMembers, function(member) {
                    member.$watch(function(d) {
                        updateFamilyPath();
                    });
                });
                updateFamilyPath();
            });

        });

        function updateFamilyPath() {
            console.log('dsadsadas')
            $scope.familyPath = new Array(Main.getPathLength());
            _.forEach($scope.family, function(member) {
                if ($scope.familyPath[member.position] === undefined) {
                    $scope.familyPath[member.position] = [];
                }
                $scope.familyPath[member.position].push(member);
            });
        }

        $scope.getPositionClass = function(task) {
            return 'pos' + task;
        };

        $scope.updatePoints = function(points) {
            Users.receivePoints($scope.currentUser, points, Main.getPathLength()-1);
        };

    })

    .controller('TaskCtrl', function($scope, $window, Main, Users, Tasks) {
        //TODO add logic here
        Tasks.getTask().$loaded().then(function(x) {
            $scope.task = x.task;
        });
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
    })



    .controller('ScoreboardCtrl', function($scope, Main, Users){
        $scope.currentUser = Main.getUser();

        $scope.points = $scope.currentUser.points;

        Main.getFamilyName().then(function(x) {

            $scope.familyName = x.$value;

            console.log($scope.familyName);
        });




    });
