angular.module('starter.services', [])

    .factory('Main', function($firebaseObject) {
        var loggedInUser;
        $firebaseObject(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/users/id1')).$loaded().then(function(x) {
           loggedInUser = x;
        });

        //TODO get family members
        //TODO handshake

        return {
            setUser: setUser,
            getUser: getUser
        };

        function setUser(user) {
            console.log("Set the user to:" + user.name);
            loggedInUser = user;
        }

        function getUser(){
            return loggedInUser;
        }
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
