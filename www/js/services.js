angular.module('starter.services', [])

    .factory('Main', function($firebaseObject, $firebaseArray) {
        var loggedInUser;

        var family;
        var famPath = [];


        //TODO handshake

        return {
            setUser: setUser,
            getUser: getUser,
            getFamily: getFamily,
            //getFamilyPath: getFamilyPath
        };

        function setUser(user) {
            console.log("Set the user to:" + user.name);
            loggedInUser = user;
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
                console.log(x);
                deferred.resolve(x);
            });

            return deferred.promise;
        }

        //function getFamilyPath(){
        //    var famID = loggedInUser.familyId;
        //    family = $firebaseArray(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/families/' + famID));
        //
        //}

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
            var selUser = $firebaseObject(ref2);
            return selUser;
        }

        function createUser(userData) {
            var deferred = $q.defer();
            array.$add(userData).then(function(ref) {
                Main.setUser(array[array.$indexFor(ref.key())]);
                deferred.resolve('Success');
            });
            return deferred.promise;
        }

    })

    .factory('Families', function($firebaseArray, $firebaseObject) {
        var families = $firebaseArray(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/families'));

        return {
            getFamilies: getFamilies,
            addUserToFamily: addUserToFamily
        };

        function getFamilies(){
            return families;
        }

        function addUserToFamily(userId, familyId){
            console.log(userId, familyId);
            //var family = $firebaseObject(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/families/' + familyId));
            //family.users.$add(userId)
        }
        //
        //function createUser(userData) {
        //    array.$add(userData);
        //}

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
