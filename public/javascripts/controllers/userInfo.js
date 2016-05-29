app.controller("userInfo",["$scope","$http","$location","$window",
	function($scope,$http,$location,$window){

//User info

$scope.user = $scope.$parent.user
$scope.completedInfo = false
$scope.moreInfoNew = {}

			//iFno extra info available
			if($scope.user.moreInfo === null)
			{   //This is not great, fix itt!!!!
				$scope.completedInfo = false
				$scope.message1  = "Tu dois remplir ces informations avant de commencer à vendre et faire des achats"
			}	
			else
			{
				$scope.completedInfo = true
			}



$scope.updateMoreInfo = function(){
//Validate before sending!
$http.post("/addMoreInfo",$scope.moreInfoNew).success(function(data){
	//Here the data is served as an object
	$scope.user.moreInfo = data
	console.log(data)

	//Make sure user extra info is complete
			if(data = null)
			{   //This is not great, fix itt!!!!
				$scope.completedInfo = false
				$scope.message1  = "Tu dois remplir ces informations avant de commencer à vendre et faire des achats"
			}	
			else
			{
				$scope.completedInfo = true
				
			}
})
}


}])