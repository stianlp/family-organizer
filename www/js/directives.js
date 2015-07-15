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

    .directive ('familyMemberOnPath', function($timeout){
        return {
            scope: {
                member: '=member',
                user: '=user',
                updatePoints: '=updatePoints'
            },
            templateUrl: 'templates/family-member-on-path.html',
            link: function (scope) {
                scope.taskIsOpen =  false;
                scope.checkOff = 1;
                scope.openTask = function() {
                    if (scope.member.$id === scope.user.$id) {
                        scope.taskIsOpen = true;
                    }
                };

                scope.doneTask = function() {
                    if (scope.checkOff === 2) return;

                    scope.checkOff = 2;
                    $timeout(function() {
                        scope.taskIsOpen = false;
                        scope.updatePoints(scope.user.task.points);
                    },800);

                };
            }
        };
    });