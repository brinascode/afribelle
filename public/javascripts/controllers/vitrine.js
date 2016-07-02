app.controller("vitrine",
	["$scope","$http","$location","$window","customerToProduct","$routeParams",
	function($scope,$http,$location,$window,customerToProduct,$routeParams)
{

$scope.produits
$scope.user = $scope.$parent.user
$scope.isAuthen = $scope.$parent.isAuthen

//Taking all the products from database for a particular vitrine
$scope.getProduits = customerToProduct.getProduits
$scope.getProduits($scope, $location.path())



//Location path is good :))

//Voting
$scope.newVote = function($index,produitArray){
	customerToProduct.newVote($scope,$index,produitArray)
}

//Panier
$scope.ajouterAuPanier = function($index){
	customerToProduct.ajouterAuPanier($scope,$index)
} //Cant add same thing twice! 






}])