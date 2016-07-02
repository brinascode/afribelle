app.controller("userCommandes",["$scope","panierAndCheckout",
	function($scope,panierAndCheckout){

$scope.user = $scope.$parent.user
$scope.commandes = []

$scope.getUserCommandes = panierAndCheckout.getUserCommandes
$scope.getUserCommandes($scope)



}])