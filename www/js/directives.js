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
            template: '<div class="progr-background" ><div class="progr-bar" ng-style="{ \'width\': {{userPoints/goal.points*100}} + \'%\'}"></div></div>',
            link: function (scope) {
            }
        };

    })

    .directive ('familyMemberOnPath', function(){
        return {
            scope: {
                member: '=member'
            },
            templateUrl: 'templates/family-member-on-path.html'
        };
    });