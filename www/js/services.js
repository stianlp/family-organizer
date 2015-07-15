angular.module('starter.services', [])

    .factory('Main', function($firebaseObject, $firebaseArray, $q, Users) {
        var pathLength = 8;

        var loggedInUser;
        var loggedInUsersFamily = [];


        return {
            setUser: setUser,
            getUser: getUser,
            setFamily: setFamily,
            getFamily: getFamily,
            getPathLength: getPathLength,
            getFamilyName: getFamilyName
        };

        function setFamily() {
            var deferred = $q.defer();
            if (loggedInUser && loggedInUser.familyId !== -1) {
                $firebaseArray(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/families/' + loggedInUser.familyId + '/users'))
                    .$loaded().then(function (family) {
                        _.forEach(family, function(memberId) {
                            Users.getUser(memberId.$value).then(function (member) {
                                loggedInUsersFamily.push(member);
                                deferred.resolve('Family set');
                            });
                        });
                });
            } else {
                deferred.resolve('-1 no family to set');
            }
            return deferred.promise;
        }

        function setUser(userId) {
            var deferred = $q.defer();
            $firebaseObject(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/users/' + userId))
                .$loaded().then(function(obj) {
                    loggedInUser = obj;
                    setFamily().then(function() {
                        deferred.resolve(obj);
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

        function getFamilyName(){
            var famID = loggedInUser.familyId;
            var deferred = $q.defer();
            $firebaseObject(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/families/' + famID + '/name')).$loaded().then(function (x){
                console.log(x);
                deferred.resolve(x);
            });

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
            receivePoints: receivePoints,
            getPoints: getPoints
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

        function getPoints(id) {
            var ref2 = new Firebase('https://incandescent-torch-9810.firebaseio.com/test/users/' + id);

            $firebaseObject(ref2).$loaded().then(function(x){
                return (x.points);
            });

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

    .factory('Tasks', function($firebaseArray, $q) {
        var tasks = $firebaseArray(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/tasks'));

        console.log(tasks);

        return {
            getTask: getTask,
            getTasks: getTasks
        };


        //TODO remove or change?
        function getTask() {
            return tasks;
        }

        function getTasks() {
            var deferred = $q.defer();
            tasks.$loaded().then(function(ref) {
                console.log(ref);
                deferred.resolve(ref);
            });
            return deferred.promise;
        }
    })

    .factory('Scoreboard', function($firebaseObject) {


    })
