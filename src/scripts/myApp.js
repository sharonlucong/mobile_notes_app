var app = angular.module('NoteApp', [
    'ngRoute',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'mobile-angular-ui',
    'mobile-angular-ui.gestures',
    'firebase',
    'mp.datePicker',
    'ngSanitize'
]);

app.config(function($routeProvider, $stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('signIn', {
            url: '/',
            templateUrl: '/templates/signIn.html',
        })
        .state('home', {
            url: '/home',
            templateUrl: '/templates/home.html',
            controller: 'NoteCtrl'
        })
        .state('home.cardView', {
            url: '/cardView',
            templateUrl: '/templates/note_card.html',
        })
        .state('home.listView', {
            url: '/listView',
            templateUrl: '/templates/note_list.html',
        });

});


app.controller('MainController', ['$scope', '$firebaseSimpleLogin', '$state', 'LoginService',

    function($scope, $firebaseSimpleLogin, $state, LoginService) {
        // Init Firebase
        var ref = new Firebase("https://sweltering-torch-3118.firebaseio.com/");
        var loginObj = $firebaseSimpleLogin(ref);

        // Init Login Status
        $scope.loggedIn = LoginService.get();

        // Initialized the user object
        $scope.user = {
            username: "",
            password: ""
        };

        // Sign In auth function
        $scope.signin = function() {
            $scope.hasError = false;
            var email = $scope.user.username;
            var password = $scope.user.password;
            if (email && password) {
                // Sign In Logic
                loginObj.$login('password', {
                        email: email,
                        password: password
                    })
                    .then(function(user) {
                        // Success callback
                        console.log('Authentication successful');
                        console.log('Username and password found');

                        $scope.userEmailId = user.email;
                        LoginService.set(true);
                        $scope.loggedIn = LoginService.get();
                        $scope.hasError = false;
                        $state.go('home.cardView');

                    }, function(error) {
                        // Failure callback
                        $scope.hasError = true;
                        LoginService.set(false);
                        $scope.loggedIn = LoginService.get();
                        console.log('Authentication failure');
                    });
            }
        };
    }
]);
