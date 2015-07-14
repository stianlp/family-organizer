angular.module('starter.directives', [])
    .directive ('path', function(){
        return {
            scope: {
                members: '=members'

            },
            template: '<div class="memberPosition"><div ng-repeat="member in members">{{member}}</div></div>',
            link: function (scope, element) {
                //console.log("sdaasdsad")
                //console.log(scope.val);

                //if (scope.members.length > 0){
                //    scope.members.forEach(function(entry){
                //        element.append(entry);
                //        //element.css("padding-bottom", "300px");
                //        console.log(entry);
                //    })
                //}

                console.log(scope.members);

                //element.css("top", "10%")
            }
        };

    });