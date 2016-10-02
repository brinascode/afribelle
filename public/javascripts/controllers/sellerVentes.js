app.controller("sellerVentes",["$scope","panierAndCheckout","sellerFunctions",function($scope,panierAndCheckout,sellerFunctions){

$scope.commandes

$scope.getSellerVentes = panierAndCheckout.getSellerVentes
$scope.getSellerVentes($scope)
	
$scope.deliveryConfirmed = function($index){
	if(confirm("Confirmez vous avoir éffectué la livraison pour cette commande?")){
		var commandeId = $scope.commandes[$index]._id
	sellerFunctions.deliveryConfirmed($scope,commandeId)
	}
	
}


}])


