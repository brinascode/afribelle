app.controller("Produit",
	["$scope","$http","$location","$window",function($scope,$http,$location,$window)
{


$scope.yay ="Lovyyyy"

$http.get("/userinfo").success(function(data){
	$scope.user = data
	console.log(data)
})


}])