// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'firebase', 'starter.controllers', 'starter.services', 'starter.directives'])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            /* OUR states, delete remove other states later */
            //TODO remove other states


            .state('start', {
                url: "/start",
                templateUrl: "templates/start.html",
                controller: 'LoginCtrl'
            })

            .state('join-create-family', {
                url: "/join-create-family",
                templateUrl: "templates/join-create-family.html",
                controller: 'JoinCreateFamilyCtrl'
            })

            .state('create-family', {
                url: "/create-family",
                templateUrl: "templates/create-family.html",
                controller: 'JoinCreateFamilyCtrl'
            })

            .state('join-family', {
                url: "/join-family",
                templateUrl: "templates/join-family.html",
                controller: 'JoinCreateFamilyCtrl'
            })

            .state('path', {
                url: "/path",
                templateUrl: "templates/path.html",
                controller: 'PathCtrl'
            })

            .state('complete-task', {
                url: "/comlete-task",
                templateUrl: "templates/complete-task.html",
                controller: 'CompleteTaskCtrl'
            })

            .state('scoreboard', {
                url: "/scoreboard",
                templateUrl: "templates/scoreboard.html",
                controller: 'ScoreboardCtrl'
            })

            .state('familyScoreboard', {
                url: "/familyScoreboard",
                templateUrl: "templates/familyScoreboard.html",
                controller: 'FamilyScoreboardCtrl'
            })

            .state('familyScoreboardFromPersonal', {
                url: "/familyScoreboard",
                templateUrl: "templates/familyScoreboardFromPersonal.html",
                controller: 'familyScoreboardCtrl'
            })

            .state('assign-task', {
                url: "/assign-task",
                templateUrl: "templates/assign-task.html",
                controller: 'AssignTaskCtrl'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/start');

    });
