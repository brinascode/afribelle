app.controller("Panier",
	["$scope","$http","$location","$window",function($scope,$http,$location,$window)
{


 $scope.panier= $scope.$parent.panier
if($scope.panier[0] === undefined){
	$scope.message = "Ton panier est vide. Ajoute vite des articles! "
}

}])