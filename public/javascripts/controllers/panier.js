app.controller("Panier",
	["$scope","$http","$location","$window","authen","panierAndCheckout",
	function($scope,$http,$location,$window,authen,panierAndCheckout)
{
	
$scope.user={}
authen.getUserInfo($scope)

$scope.panier = $scope.$parent.panier
$scope.panierDetails = $scope.$parent.panierDetails





if($scope.panier[0] === undefined){
	$scope.message = "Votre panier est vide. Ajoutez vite des articles! "
}

//Comment ca ajoute au panier? == customerToProduct service !

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