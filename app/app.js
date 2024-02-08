const myAnimalApp = angular.module('myAnimalApp', ['ngRoute', 'ngAnimate'])

myAnimalApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true)

  $routeProvider
    .when('/', {
      templateUrl: 'app/views/home.html',
      controller: 'AnimalController',
    })
    .when('/contact', {
      templateUrl: 'app/views/contact.html',
      controller: 'ContactController',
    })
    .when('/contact-success', {
      templateUrl: 'app/views/contact-success.html',
      controller: 'ContactController',
    })
    .when('/directory', {
      templateUrl: 'app/views/directory.html',
      controller: 'AnimalController',
    })
    .otherwise({
      redirectTo: '/',
    })
}]);

myAnimalApp.directive('randomAnimal', [function () {
  return {
    restrict: 'E',
    scope: {
      animals: '=',
      title: '=',
    },
    transclude: true,
    replace: true,
    templateUrl: 'app/views/random.html',
    controller: function ($scope) {
      $scope.random = Math.floor(Math.random() * 5)
    },
  }
}])

myAnimalApp.controller('AnimalController', ['$scope', '$http', function ($scope, $http) {
  $scope.message = 'Ayo! My name is AnimalController.'
  $scope.addAnimal = function () {
    $scope.animals.push({
      name: $scope.newAnimal.name,
      color: $scope.newAnimal.color,
      rate: parseInt($scope.newAnimal.rate),
      available: true,
    })
    $scope.newAnimal.name = ''
    $scope.newAnimal.color = ''
    $scope.newAnimal.rate = ''
  }


  $scope.removeAnimal = function (animal) {
    const removedAnimal = $scope.animals.indexOf(animal)
    $scope.animals.splice(removedAnimal, 1)
  }

  $scope.removeAll = function () {
    $scope.animals = []
  }

  $http.get('app/data/animals.json').success(function (response) {
    $scope.animals = response
  })
}])

myAnimalApp.controller('ContactController', ['$scope', '$location', function ($scope, $location) {
  $scope.sendMessage = function () {
    $location.path('/contact-success')
  }
}])
