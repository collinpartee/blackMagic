angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('PlaylistsCtrl', function ($scope, $timeout) {
    $scope.gif = false;
    $scope.questionAsked = false;
    
    var score = 0;
    var quizLength = 3;

    $scope.currQuestion = "none";
    
    var sportsQuestions = [
        {
            question: 'Whats my name',
            choice1: 'Mark',
            choice2: 'LaTavius',
            choice3: 'Collin',
            choice4: 'DeMarcus',
            description: 'My name is Collin. I was born 1992 STL baby!',
            answer: '3'
        },
        {
            question: 'Whats my bitch name',
            choice1: 'Queen',
            choice2: 'Shonda',
            choice3: 'Fonda',
            choice4: 'Ashley',
            description: 'My bitch name is queen. We met in 2012 in Sparc Architecture.',
            answer: '1'
        },
        {
            question: 'Whats my nigga name',
            choice1: 'Quantrell',
            choice2: 'Rocky',
            choice3: 'Wayne',
            choice4: 'Brandon',
            description: 'My nigga name is Brandon. We meet in 2006 in honors Bio. Fuck Mrs. McGahee.',
            answer: '4'
        },
        {
            question: 'Whats my nigga bitch',
            choice1: 'Morgan',
            choice2: 'Katie',
            choice3: 'Bitch',
            choice4: 'Gem',
            description: 'My nigg bitch name is Kaite. They meet like last year in Target. They have been dating ever since.',
            answer: '2'
        }

    ];
    
    function showGif() {
//        $scope.currQuestion = sportsQuestions[chosenQuestion] ;
        
        $scope.gif = true;

        $timeout(function hideTheGif() {
            $scope.gif = false;
        }, 2000);

    }

    $scope.askQuestion = function () {
        var chosenQuestion = Math.floor(Math.random() * (sportsQuestions.length - 0)) + 0;
        console.log(chosenQuestion);

        $scope.currQuestion = sportsQuestions[chosenQuestion] ;
        
        $scope.questionAsked = true;
        
        $scope.gif = true;

        $timeout(function hideTheGif() {
            $scope.gif = false;
        }, 2000);

    }

    $scope.answerQuestion = function () {
        $scope.questionAsked = false;
        
        $scope.gif = true;

        $timeout(function hideTheGif() {
            $scope.gif = false;
        }, 2000);

    }

    





})

.controller('PlaylistCtrl', function ($scope, $stateParams) {});