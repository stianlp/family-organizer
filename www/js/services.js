angular.module('starter.services', [])

    .factory('Main', function($firebaseObject, $firebaseArray) {
        var loggedInUser;
        $firebaseObject(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/users/id1')).$loaded().then(function(x) {
            loggedInUser = x;
        });

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
            family = $firebaseArray(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/families/' + famID));


            return family;
        }

        //function getFamilyPath(){
        //    var famID = loggedInUser.familyId;
        //    family = $firebaseArray(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/families/' + famID));
        //
        //}
    })

    .factory('Users', function($firebaseArray, $firebaseObject) {
        var ref = new Firebase('https://incandescent-torch-9810.firebaseio.com/test/users');
        var array = $firebaseArray(ref);

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
            array.$add(userData);
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
