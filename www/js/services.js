angular.module('starter.services', [])

    .factory('Main', function($firebaseObject) {
        var loggedInUser = $firebaseObject(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/users/id1'));

        console.log(loggedInUser);

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
            getUser: getUser
        };

        function getUsers(){
            return array;
        }

        function getUser(id){
            var ref2 = new Firebase('https://incandescent-torch-9810.firebaseio.com/test/users/' + id);
            var selUser = $firebaseObject(ref2);
            return selUser;
        }

    })

    .factory('Tasks', function($firebaseArray, $q) {
        var array = $firebaseArray(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/tasks'));

        return {
            getTask: getTask
        };

        function getTask() {
            var deferred = $q.defer();
            array.$loaded().then(function(x) {
                deferred.resolve(x);
            });
            return deferred.promise;
        }

    });

