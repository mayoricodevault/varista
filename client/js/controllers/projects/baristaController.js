'use strict';

xively.controller('baristaController', function ($scope, $location, $anchorScroll,localStorageService,Socket,$http) {
    
    $scope.people = [];
    $scope.currentPerson=[];
    
    //watch change local Storage;
    var oldPeople=localStorageService.get('people');
    $scope.people=oldPeople || [];
    $scope.$watch('people',function(){
        localStorageService.set('people',$scope.people);
    },true);
    
    //view current person 
    if($scope.people.length>0)
    {
        $scope.currentPerson=$scope.people[0];
    }
    
    
    Socket.on('register', function(data){
       $scope.addPerson(data);
    });
    
    
    //add person
    $scope.addPerson = function(data) {
        $scope.people.push(data);
    };
    
    //served 
    $scope.served = function() {
        var oldList = $scope.people;
        $scope.people = [];
        for(var i=1; i<oldList.length ;i++){
          $scope.people.push(oldList[i]);
          $scope.currentPerson=$scope.people[0];
        }
    };
    
    //personUp
    
    $scope.personUp = function(index) {
        var i=1;
        for ( i =index-1 ;i>=0; i--) {
                var temp = $scope.people[i];
                $scope.people[i] = $scope.people[i+1];
                $scope.people[i+1] = temp;
        }
       $scope.currentPerson=$scope.people[i+1];
    };
     
    /*---------------------Weather controller---------------------------------*/

	
	$scope.zip =$scope.currentPerson.zipcode;
	$http.get('https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20weather.forecast%20WHERE%20location%3D%22' + $scope.zip + '%22&format=json&diagnostics=true&callback=')
		.success(function(data){
			$scope.weather = data.query.results.channel
			$scope.forecast = data.query.results.channel.item.forecast
			$scope.tempIndex = (parseInt($scope.weather.item.condition.temp) - parseInt($scope.forecast[0].low)) / (parseInt($scope.forecast[0].high) - parseInt($scope.forecast[0].low)) * 100
			
	})
	/*-----------------End Weather ********************************************/ 
     
       
});