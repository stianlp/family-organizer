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

    })

    .directive ('checkOwnTask', function(){
        return {
            scope: {
                taskText: '=taskText',
                points: '=points',
                updatePoints: '='
            },
            template: '<div><p>{{taskText}}</p><h1>{{points}}</h1><div ng-click="done()">circle</div></div>',
            link: function (scope) {
                scope.done = function() {
                    scope.updatePoints(scope.points);
                };
            }
        };

    });