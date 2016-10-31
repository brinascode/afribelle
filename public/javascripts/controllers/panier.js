app.controller("Panier",
	["$scope","$http","$location","$window","authen","panierAndCheckout",
	function($scope,$http,$location,$window,authen,panierAndCheckout)
{
	
$scope.user={}
authen.getUserInfo($scope)

$scope.panier = $scope.$parent.panier
$scope.panierDetails = $scope.$parent.panierDetails



console.log($scope.panier)


if($scope.panier[0] === undefined){
	$scope.message = "Votre panier est vide. Ajoutez vite des articles!"
}

//Comment ca ajoute au panier? == customerToProduct service !

$scope.retirerDuPanier= function($index){

	$scope.panier.splice([$index],1)
	//Remove from session storage:
	sessionStorage.panier = JSON.stringify($scope.$parent.panier)
	console.log(sessionStorage)
}

$scope.chooseColor = function(parentInd,$index){
	//Make an array for your selected colors
	

	//If the colorChoice array isnt defined yet, we make it
	if(!$scope.panier[parentInd].colorChoice){
		var array = []
		$scope.panier[parentInd].colorChoice = array
	
	}else{
		var array = $scope.panier[parentInd].colorChoice
	}
	
	//If clicked color already in array we remove
	//(If you click twice it removes)
	if(array.indexOf($index+1) !== -1){
		var index = array.indexOf($index+1)
		console.log(array.indexOf($index+1))
		array.splice(index,1)

	}
	else{
		array.push($index+1) 
	}

	// $index+1 So that no color is color 0
	
}

$scope.checkout = function(){

	panierAndCheckout.checkout($scope)
}


$scope.totalBoutiques 



}])