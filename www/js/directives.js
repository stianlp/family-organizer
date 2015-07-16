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
    .directive ('progressBar', function(){
    return {
        scope: {
            goal: '=goal',
            userPoints: '=userPoints'

        },
        //template: '<progress max="100" ng-value="userPoints/goal.points*100"> <div class="progress-bar"> <span ng-style="width: {value}%;"></span> </div></progress>',
        template: '<div class="progr-background" ><div class="progr-bar" ng-style="setStyle(userPoints/goal.points*100)"></div></div>',
        link: function (scope) {
            scope.setStyle = function (x){
                if (x<25) {
                    return {width: + x + '%', backgroundColor: "#ef473a"};
                }
                else if (x<75) {
                    return {width: + x + '%', backgroundColor: "#ffc900"};
                }
                else if (x < 100) {
                    return {width: + x + '%', backgroundColor: "#33cd5f"};
                }
                else {
                    return {width: + x + '%', backgroundColor: "#387ef5"};
                }

            }
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
    })