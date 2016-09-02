app.controller("produit",
	["$scope","$http","$location","$window","$routeParams","customerToProduct",
	function($scope,$http,$location,$window,$routeParams,customerToProduct)
{

//Fix refresh, causedby angular giving :id

//Maybe put all this into service? To share common euhhh...
$scope.panier = $scope.$parent.panier
$scope.user = $scope.$parent.user
$scope.isAuthen = $scope.$parent.isAuthen

//Get produit of particular type (from route id)
$scope.produit = [] //only one item in but still Array
$scope.getProduit = customerToProduct.getProduit
$scope.getProduit($scope,$routeParams)

//Voting
$scope.newVote = function(){
	customerToProduct.newVote($scope,0)
}

//Panier
$scope.ajouterAuPanier = function(){
	customerToProduct.ajouterAuPanier($scope,0)
} //Cant add same thing twice! 



//Comments

$scope.comments =[]

$scope.getComments = function(){
	var id = $routeParams.id
	customerToProduct.getComments($scope,id)
}
$scope.getComments()



$scope.newComment = {}
$scope.postComment = function(){
	customerToProduct.postComment($scope,$scope.newComment)
}


}])