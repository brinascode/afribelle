
app.controller("LogSign",
	["$scope","$http","$location","$window",
	function($scope,$http,$location,$window,$route)
{

$scope.logg 
$scope.sign 
$scope.message
$scope.user2 = {}

//If connected, go to profile. Block access to this page!


//Now the redirecting is done server side
$scope.signup =function(){
		$http.post("/signup",$scope.sign)

			$window.location.href = "/login"
			$scope.message = "Connecte toi avec ton nouveau compte"

		
			
}

$scope.login = function(){
	$http.post("/login",$scope.logg)
		$window.location.href = "/profile"

	
	
}

$scope.facebookAuthen=function(){
	 $window.location.href="/auth/facebook"
}
 

$scope.googleAuthen = function(){

	 $window.location.href="/auth/google"
}


}])




