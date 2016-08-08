app.controller("Panier",
	["$scope","$http","$location","$window","panierAndCheckout",
	function($scope,$http,$location,$window,panierAndCheckout)
{


$scope.panier = $scope.$parent.panier


if($scope.panier[0] === undefined){
	$scope.message = "Votre panier est vide. Ajoutez vite des articles! "
}



$scope.retirerDuPanier= function($index){

	$scope.panier.splice([$index],1)
	//Remove from session storage:
	sessionStorage.panier = JSON.stringify($scope.$parent.panier)
	console.log(sessionStorage)
}

$scope.checkout = function(){

	panierAndCheckout.checkout($scope)
}


$scope.totalBoutiques 



}])