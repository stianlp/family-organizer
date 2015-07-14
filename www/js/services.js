angular.module('starter.services', [])

    .factory('Main', function($firebaseObject, $firebaseArray, $q) {
        var loggedInUser;
        var pathLength = 8;

        var family;


        //TODO handshake

        return {
            setUser: setUser,
            getUser: getUser,
            getFamily: getFamily,
            getPathLength: getPathLength
        };

        function setUser(userId) {
            var deferred = $q.defer();
            $firebaseObject(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/users/' + userId))
                .$loaded().then(function(obj) {
                    loggedInUser = obj;
                    deferred.resolve('User set!');
                });
            return deferred.promise;
        }

        function getUser(){
            return loggedInUser;
        }

        //TODO get family members
        function getFamily(){

            var famID = loggedInUser.familyId;
            var deferred = $q.defer();
            $firebaseArray(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/families/' + famID + '/users')).$loaded().then(function (x){
                family = x;
                deferred.resolve(x);
            });

            return deferred.promise;
        }

        function getPathLength(){
            return pathLength;
        }
    })

    .factory('Users', function($firebaseArray, $firebaseObject, $q, Main) {
        var array = $firebaseArray(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/users'));

        return {
            getUsers: getUsers,
            getUser: getUser,
            createUser: createUser
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

    })

    .factory('Families', function($firebaseArray, $firebaseObject, Main) {
        var families = $firebaseArray(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/families'));

        return {
            getFamilies: getFamilies,
            addUserToFamily: addUserToFamily
        };

        function getFamilies(){
            return families;
        }

        function addUserToFamily(userId, familyId){
            $firebaseArray(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/families/' + familyId + '/users'))
                .$loaded().then(function(ref) {
                    ref.$add(userId);
                    var user = Main.getUser();
                    user.familyId = familyId;
                    user.$save();

                });
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
    });
