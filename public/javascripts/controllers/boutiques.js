app.controller("boutiques",
	["$scope","$http","$location","$window","customerToProduct","$routeParams",
	function($scope,$http,$location,$window,customerToProduct,$routeParams)
{


$scope.user = $scope.$parent.user
$scope.isAuthen = $scope.$parent.isAuthen
$scope.boutiques = []

//Getting all the boutiques from db
customerToProduct.getBoutiques($scope)


//Voting
$scope.newVote = function($index,produitArray){
	customerToProduct.newVote($scope,$index,produitArray)
}

//Panier
$scope.ajouterAuPanier = function($index){
	customerToProduct.ajouterAuPanier($scope,$index)
} //Cant add same thing twice! 


$scope.helpPics = "images/{{boutique.themeUrl}}"


}])