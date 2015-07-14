angular.module('starter.directives', [])
    .directive ('path', function(){
        return {
            scope: {
                val: '=attrval'
            },
            template: '<div>{{ val }}</div>',
            link: function (scope, element) {
                console.log("sdaasdsad")
                console.log(scope.val);

                //element.css("top", "10%")
            }
        };

    })

    .directive ('check-own-task', function(){
        return {
            scope: {
                taskText: '=taskText',
                points: '=pts',
                updatePoints: '&updatePoints'
            },
            template: '<div><p>{{taskText}}</p><h1>{{points}}</h1><div ng-click="done()">circle</div></div>',
            link: function (scope) {
                scope.done = function() {
                    scope.updatePoints(points);
                };
            }
        };

    });