angular.module('starter.services', [])

    .factory('Main', function($firebaseObject) {
        var loggedInUser;
       $firebaseObject(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/users/id1')).$loaded().then(function(x) {
           loggedInUser = x;
        });
        //var loggedInUser = $firebaseObject(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/users/id1'));

        //TODO get family members


        //TODO handshake
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

    .factory('Tasks', function($firebaseObject, $q) {
        var array = $firebaseObject(new Firebase('https://incandescent-torch-9810.firebaseio.com/test/tasks/task1'));

        return {
            getTask: getTask
        };

        function getTask() {
            //var deferred = $q.defer();
            //array.$loaded().then(function(x) {
            //    deferred.resolve(x);
            //});
            //return deferred.promise;
            return array;
        }

    });

