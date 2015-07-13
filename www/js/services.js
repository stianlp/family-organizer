angular.module('starter.services', [])


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

            //var selUser = $firebaseArray(ref2).$loaded().then(function(x) {
            //    console.log(x.$getRecord(id))
            //})
            //
            //

            var selUser = $firebaseObject(ref2);
            return selUser;
        }

    });
