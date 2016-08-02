app.controller("userInfo",["$scope","$http","$location","$window","userModifs",
	function($scope,$http,$location,$window,userModifs){


$scope.user = $scope.$parent.user

$scope.completedInfo = false
$scope.moreInfoNew = {}
$scope.message


$scope.nomCompletNew
$scope.newNomComplet = function(){

	userModifs.newNomComplet($scope,$scope.nomCompletNew)
		$window.location.href = "/userInfo"
}


//Not A number + Doesnt update parent!
$scope.newUserTelephone= function(){ //Validated
	if($scope.moreInfoNew && $scope.moreInfoNew.telephone.toString().length===8){ 
		userModifs.newUserTelephone($scope)
		console.log($scope.moreInfoNew.telephone)
		$window.location.href = "/userInfo"
	}else{
		$scope.message = "Veuillez entrez un numéro de telephone Ivoirien valide s'il vous plait"
		
	}

	
}

$scope.removeUserTelephone = function($index){
	userModifs.removeUserTelephone($scope,$index)
	$window.location.href = "/userInfo"
} 


}])

//When you pass parameters to service function, you wrap it up with a native scope 
//function cause from the DOM you cant send params to service function