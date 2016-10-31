app.controller("Aide",["$scope","$location","$window","$http","authen",
	function($scope,$location,$window,$http,authen){


	$scope.commander= false
	$scope.commanderF = function(){
		$scope.commander =!$scope.commander
		
	}

	$scope.livrP= false
	$scope.livrPF = function(){
		$scope.livrP =!$scope.livrP
		
	}


}])

