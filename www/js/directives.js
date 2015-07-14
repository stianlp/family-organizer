angular.module('starter.directives', [])
    .directive ('path', function(){
        return {
            scope: {
                members: '=members',
                user: '=user',
                open: '=open'
            },
            template: '<div class="memberPosition"><div ng-repeat="member in members" ng-click="openIt(member)">{{member}}</div></div>',
            link: function (scope) {
                console.log(scope.user);
                scope.openIt = function(member) {
                    if (member === scope.user.$id) {
                        console.log("clicked my user");
                        scope.open = true;
                        console.log(scope.open);
                        scope.$evalAsync();

                    } else {
                        console.log('clciked something else');
                    }
                };
            }
        };

    })

    .directive ('checkOwnTask', function(){
        return {
            scope: {
                taskText: '=',
                //points: '=points',
                updatePoints: '=',
                open: '='

            },
            template: '<div><p>{{taskText}}</p><h1>{{points}}</h1><div ng-click="done()">circle</div></div>',
            link: function (scope) {

                scope.$watch('open', function() {
                    console.log(scope.open);
                });
                scope.done = function() {
                    console.log('hey');
                    scope.updatePoints(10);
                };
            }
        };

    });