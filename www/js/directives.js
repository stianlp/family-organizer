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
            scope: {},
            template: '<div></div>',
            link: function (scope, element) {
                console.log("checkown task")
            }
        };

    });