
xively.controller('baristamenuController', ['$scope', 'Socket','localStorageService' ,'$http',function($scope, Socket,localStorageService,$http){
    Socket.connect();
    
    Socket.on('register', function(data){
       $scope.addPerson(data);
    });
    
    $scope.people = [];
    
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
    
    $scope.black = false;
    $scope.mocha = false;
    $scope.iced = false;
    $scope.latte = false;
    $scope.cappuccino = false;
    $scope.other = false;
    
    
    $scope.defaultValues = function() {
       $scope.blacks = true; 
    };
    
    $scope.isActive = function(value) {
        switch (value) {
            case 1: return $scope.black;
            case 2: return $scope.mocha;
            case 3: return $scope.iced;
            case 4: return $scope.latte;
            case 5: return $scope.cappuccino;
            case 6: return $scope.other;
            
            default:
                // code
                break;
        }
    };
    
    $scope.activate = function(value) {
        $scope.black = false;
        $scope.mocha = false;
        $scope.iced = false;
        $scope.latte = false;
        $scope.cappuccino = false;
        $scope.other = false;
           
        switch (value) {
            case 1:
                $scope.black = true;  $scope.currentPerson.favcoffe="black";
                break;
            case 2: $scope.mocha = true; $scope.currentPerson.favcoffe="mocha";
                 break;
            case 3: $scope.iced = true; $scope.currentPerson.favcoffe="iced coffee";
                 break;
            case 4: $scope.latte = true; $scope.currentPerson.favcoffe="latte";
                break;
            case 5: $scope.cappuccino = true; $scope.currentPerson.favcoffe="cappuccino";
                 break;
            case 6: $scope.other = true; $scope.currentPerson.favcoffe="other";
                 break;
            default:
                // code
                break;
        }
        
    };
    
    // Start SideMenu
    
  
    
    //view current person
    if($scope.people.length>0)
    {
        $scope.currentPerson=$scope.people[0];
    }
    
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

	
//	$scope.zip =$scope.currentPerson.zipcode;
//	$http.get('https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20weather.forecast%20WHERE%20location%3D%22' + $scope.zip + '%22&format=json&diagnostics=true&callback=')
//		.success(function(data){
//			$scope.weather = data.query.results.channel
//			$scope.forecast = data.query.results.channel.item.forecast
//			$scope.tempIndex = (parseInt($scope.weather.item.condition.temp) - parseInt($scope.forecast[0].low)) / (parseInt($scope.forecast[0].high) - parseInt($scope.forecast[0].low)) * 100
			
//	})
	/*-----------------End Weather ********************************************/ 
     
}]);