app.controller("userInfo",["$scope","$http","$location","$window","userModifs",
	function($scope,$http,$location,$window,userModifs){


$scope.user = $scope.$parent.user

$scope.completedInfo = false
$scope.moreInfoNew = {}
$scope.message



//Not A number + Doesnt update parent!
$scope.newUserTelephone= function(){ //Validated
	if($scope.moreInfoNew){ 
		userModifs.newUserTelephone($scope)
		console.log($scope.moreInfoNew)

	}else{
		$scope.message = "Veuillez entrez un numéro de telephone valide s'il vous plait"
		console.log(parse($scope.moreInfoNew))
	}

	$window.location.href = "/userInfo"
}

$scope.removeUserTelephone = function($index){
	userModifs.removeUserTelephone($scope,$index)
	$window.location.href = "/userInfo"
} 


}])

//When you pass parameters to service function, you wrap it up with a native scope 
//function cause from the DOM you cant send params to service function