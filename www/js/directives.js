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
                    if (scope.member.$id === scope.user.$id) {
                        scope.taskIsOpen = true;
                    }
                };

                scope.doneTask = function() {
                    scope.updatePoints(scope.user.task.points);
                    scope.taskIsOpen = false;
                };
            }
        };
    });