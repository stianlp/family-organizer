angular.module('starter.controllers', [])

    .controller('LoginCtrl', function($scope, $state, Users, Main) {
        var existingUsers = Users.getUsers();
        $scope.existingUser = { username: ''};
        $scope.newUser = { username: '',
            name: '',
            age: '',
            position: 0,
            role: '',
            points: 0,
            familyId: -1,
            avatar: 'mdi-emoticon',
            goals: [{name:'Bicycle', points: 2000},{name:'Cinema ticket', points: 1000}, {name:'Rayman', points: 4000}]};

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


        function goToPath() {
            Main.setFamily().then(function() {
                $state.go('path');
            });
        }

        /* Join family variables */
        $scope.search = {search:''};
        $scope.join = function(family) {
            Families.addUserToFamily(Main.getUser().$id, family.$id).then(function(data) {
                goToPath();
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
                        goToPath();
                    });
                });
            } else {
                $scope.newFamilyExist = true;
            }
        };
    })

    .controller('PathCtrl', function($scope, $window, $state, Main, Users) {

        $scope.currentUser = Main.getUser();

        $scope.familyPath = new Array(Main.getPathLength());

        Main.getFamily().then(function(familyMembers) {
            $scope.family = familyMembers;
            _.forEach(familyMembers, function(member) {
                member.$watch(function(d) {
                    updateFamilyPath();
                });
            });
            updateFamilyPath();
        });


        function updateFamilyPath() {
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
    })

    .controller('CompleteTaskCtrl', function($scope, $state, $stateParams, $timeout, Main, Users) {
        $scope.currentUser = Main.getUser();
        $scope.yourTask = true;


        if ($stateParams.member.$id !== $scope.currentUser.$id) {
            $scope.yourTask = false;
            $scope.memberName = $stateParams.member.name;
        }
        $scope.noTask = false;
        $scope.checkOff = 1;

        if (!$scope.currentUser.task) {
            $scope.noTask = true;
        }

        $scope.doneTask = function() {
            if ($scope.checkOff === 2) return;

            $scope.checkOff = 2;
            $timeout(function() {
                Users.receivePoints($scope.currentUser, $scope.currentUser.task.points, Main.getPathLength()-1);
                $timeout(function() {
                    $state.go('path');
                },400);
            },800);
        };
    })

    .controller('AssignTaskCtrl', function($scope, Main, Tasks, Users, $timeout) {
        $scope.assignedTask = false;
        Tasks.getTasks().then(function(tasks) {
            $scope.tasks = tasks;
        });

        Main.getFamily().then(function(family) {
            $scope.family = family;
            $scope.famCol = "col-" + family.length/100;
        });

        $scope.selectedTask = -1;
        $scope.selectedFamilyMember = -1;

        $scope.selectTask = function(index) {
            $scope.selectedTask = index;
        };

        $scope.selectFamilyMember = function(index) {
            $scope.selectedFamilyMember = index;
        };

        $scope.assignTask = function() {
            if ($scope.selectedTask === -1 || $scope.selectedFamilyMember === -1) return;
            Users.assignTaskToUser($scope.family[$scope.selectedFamilyMember], $scope.tasks[$scope.selectedTask]);
            $scope.assignedTask = true;
            $timeout(function() {
                $scope.assignedTask = false;
                $scope.selectedTask = -1;
                $scope.selectedFamilyMember = -1;
            },800);

        };
    })

    .controller('ScoreboardCtrl', function($scope, Main, Viral){
        $scope.currentUser = Main.getUser();

        Main.getFamilyName().then(function(x) {

            $scope.familyName = x.$value;

        });

        $scope.getAvatar = function(user){
            return user.avatar;
        };

        $scope.goals = $scope.currentUser.goals;

        $scope.fbClick = Viral.fbClick;
        $scope.twClick = Viral.twClick;

    })

    .controller('FamilyScoreboardCtrl', function($scope, Main, Viral) {
        Main.getFamily().then(function(familyMembers) {
            $scope.familyMembers = familyMembers;
        });

        $scope.fbClick = Viral.fbClick;
        $scope.twClick = Viral.twClick;

    });
