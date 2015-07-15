angular.module('starter.directives', [])
    .directive ('familyMembersOnPath', function(){
        return {
            scope: {
                members: '=members',
                user: '=user',
                updatePoints: '=updatePoints'
            },
            templateUrl: 'templates/family-members-on-path.html',
            link: function (scope) {
            }
        };

    })

    .directive ('familyMemberOnPath', function(){
        return {
            scope: {
                member: '=member',
                user: '=user',
                updatePoints: '=updatePoints'
            },
            templateUrl: 'templates/family-member-on-path.html',
            link: function (scope) {
                scope.taskIsOpen =  false;
                scope.openTask = function() {
                    console.log(scope.member, scope.user);
                    if (scope.member === scope.user.$id) {
                        console.log("clicked my user");
                        scope.taskIsOpen = true;

                    } else {
                        console.log('clciked something else');
                    }
                };

                scope.done = function() {
                    console.log('task is done');
                    scope.updatePoints(scope.user.task.points);
                    scope.taskIsOpen = false;
                };
            }
        };
    });

    //.directive ('checkOwnTask', function(){
    //    return {
    //        scope: {
    //            taskText: '=',
    //            //points: '=points',
    //            updatePoints: '=',
    //            open: '='
    //
    //        },
    //        template: '<div><p>{{taskText}}</p><h1>{{points}}</h1><div ng-click="done()">circle</div></div>',
    //        link: function (scope) {
    //
    //            scope.$watch('open', function() {
    //                console.log(scope.open);
    //            });
    //            scope.done = function() {
    //                console.log('hey');
    //                scope.updatePoints(10);
    //            };
    //        }
    //    };