angular.module('starter.directives', [])
    .directive ('path', function(){
        return {
            scope: {
                val: '='
            },
            template: '<div>{{ val }}</div>',
            link: function (scope) {
                console.log(scope.val);
            }
        };

    });