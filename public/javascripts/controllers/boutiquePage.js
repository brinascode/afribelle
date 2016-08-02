app.controller("boutiquePage",
	["$scope","$http","$location","$window","customerToProduct","$routeParams",
	function($scope,$http,$location,$window,customerToProduct,$routeParams)
{


$scope.user = $scope.$parent.user
$scope.isAuthen = $scope.$parent.isAuthen

$scope.boutique = []
$scope.produits = []

//Taking the boutique in question from db + its produits
customerToProduct.getBoutique($scope,$routeParams)



//Voting
$scope.newVote = function($index){
	customerToProduct.newVote($scope,$index)
}

//Panier
$scope.ajouterAuPanier = function($index){
	customerToProduct.ajouterAuPanier($scope,$index)
} 



//Comments
$scope.comments =[]

$scope.getComments = function(){
	var id = $routeParams.id

	customerToProduct.getComments($scope,id)
}


$scope.showComments = function(){
$scope.showComments = true
$scope.getComments()

}


$scope.newComment = {}
$scope.postComment = function(){
	customerToProduct.postComment($scope,$scope.newComment,$routeParams)
}







}])