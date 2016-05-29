app.controller("LogSign",
	["$scope","$http","$location","$window",function($scope,$http,$location,$window,$route)
{


$scope.logg 
$scope.sign 
$scope.message

$scope.signup =function(){
$http.post("/signup",$scope.sign).success(function(data){
console.log(data)
if(data){
	$window.location.href="/profile"
}

})
}

$scope.login = function(){
$http.post("/login",$scope.logg).success(function(data){
if(data){
	//Fix here. We want stuff in shopping cart to stayby not reloading page. Or is local storage better?
	//Cause page HAS to refresh in order for Acceuille Controller to understand that there is authen user
	$window.location.href="/profile"

}
else{
$scope.message = "Something went wrong. Please try again"
}
})
}



}])