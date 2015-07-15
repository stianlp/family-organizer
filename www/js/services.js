angular.module('starter.services', [])

    .factory('Main', function($firebaseObject, $firebaseArray, $q, Users) {
        var pathLength = 8;

        var loggedInUser;
        var loggedInUsersFamily = [];


        return {
            setUser: setUser,
            getUser: getUser,
            getFamily: getFamily,
            getPathLength: getPathLength
        };

        /* Private helper function to set up family members */
        function setFamily() {
            var deferred = $q.defer();
            $firebaseArray(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/families/' + loggedInUser.familyId + '/users'))
                .$loaded().then(function (family) {
                    _.forEach(family, function(memberId) {
                        Users.getUser(memberId.$value).then(function (member) {
                            loggedInUsersFamily.push(member);
                            deferred.resolve('Family set');
                        });
                    });
            });
            return deferred.promise;
        }

        function setUser(userId) {
            var deferred = $q.defer();
            $firebaseObject(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/users/' + userId))
                .$loaded().then(function(obj) {
                    loggedInUser = obj;
                    setFamily().then(function() {
                        deferred.resolve('User set!');
                    });
                });
            return deferred.promise;
        }

        function getUser(){
            return loggedInUser;
        }

        function getFamily() {
            var deferred = $q.defer();
            deferred.resolve(loggedInUsersFamily);
            return deferred.promise;
        }

        function getPathLength(){
            return pathLength;
        }
    })

    .factory('Users', function($firebaseArray, $firebaseObject, $q) {
        var array = $firebaseArray(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/users'));

        return {
            getUsers: getUsers,
            getUser: getUser,
            createUser: createUser,
            receivePoints: receivePoints
        };

        function getUsers(){
            return array;
        }

        function getUser(id){
            var ref2 = new Firebase('https://incandescent-torch-9810.firebaseio.com/test/users/' + id);

            var deferred = $q.defer();
            $firebaseObject(ref2).$loaded().then(function(x){
                deferred.resolve(x);
            });

            return deferred.promise;
        }

        function createUser(userData) {
            var deferred = $q.defer();
            array.$add(userData).then(function(ref) {
                deferred.resolve(array[array.$indexFor(ref.key())]);
            });
            return deferred.promise;
        }

        function receivePoints(user, points, reset) {
            user.points += points;
            if (user.position === reset) {
                user.position = 0;
            } else {
                user.position += 1;
            }
            user.$save();
        }

    })

    .factory('Families', function($firebaseArray, $firebaseObject, Main, $q) {
        var families = $firebaseArray(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/families'));

        return {
            getFamilies: getFamilies,
            addUserToFamily: addUserToFamily,
            createFamily: createFamily
        };

        function getFamilies(){
            return families;
        }

        function addUserToFamily(userId, familyId) {
            var deferred = $q.defer();
            $firebaseArray(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/families/' + familyId + '/users'))
                .$loaded().then(function(ref) {
                    ref.$add(userId);
                    var user = Main.getUser();
                    user.familyId = familyId;
                    user.$save();
                    deferred.resolve('Added to family');
                });
            return deferred.promise;
        }

        function createFamily(familyData) {
            var deferred = $q.defer();
            families.$add(familyData).then(function(ref) {
                deferred.resolve(families[families.$indexFor(ref.key())]);
            });
            return deferred.promise;
        }
    })

    .factory('Tasks', function($firebaseObject) {
        var array = $firebaseObject(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/tasks/task1'));

        return {
            getTask: getTask
        };

        function getTask() {
            return array;
        }
    })

    .factory('Scoreboard', function($firebaseObject) {


    })
