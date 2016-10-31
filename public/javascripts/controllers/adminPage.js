app.controller("adminPage",
	["$scope","$http","$location","$window","adminFunctions",
	function($scope,$http,$location,$window,adminFunctions)
{

$scope.user = $scope.$parent.user

if($scope.$parent.user.moreInfo == undefined){
	 $window.location.href="/boutiques"
}



$scope.allBoutiques = []
adminFunctions.getAllBoutiques($scope)

$scope.boutiqueId = ""
$scope.mesProduits = []

$scope.getMesProduits2 = function(){
	adminFunctions.getMesProduits2($scope,$scope.boutiqueId)
	
}


//get all boutiques
//get boutique Id you want
//get all the shop's products
	
	//So far can only modify products and not boutique.boutiqueLivraison...
	//can use the console for tht


//*************Modifer un produit***********************************
//In factory
$scope.modifSection = false
$scope.modifications = {}

$scope.hideModifSection = function(){
	$scope.modifSection = !$scope.modifSection
}

$scope.modifyProduit = function($index){
		//Data binding makes unsaved changes stay
		//for a while
	$scope.modifSection = true
	$scope.modifying = $scope.mesProduits[$index]
	$scope.modIndex = $index


}

$scope.modifyProduitPost = function(){
	//Stop from posting empty stuff

	if(typeof $scope.modifying.colorCodes != undefined){
		$scope.modifying.colorCodes = $scope.modifying.colorCodes.toString()
	}
	adminFunctions.modifyProduitPost($scope)
}

//Choice of colors 
$scope.colorPicked =""
$scope.chooseColors = function(){
	//They put num of colors
	//Make a colorCodes array for each color 
	//Add colors in its spot in the Color Codes array (all this to use ng-repeat!)
	
	//If no colors have been selected, make their spots in array
	

		for(i=0;i<$scope.modifying.colorsNum;i++){
			if($scope.modifying.colorCodes[i] === undefined){
				$scope.modifying.colorCodes.push(i)
			}
		}
		
		$scope.addColor= function($index){
			var postObject = {}
			postObject.id = modifying._id 
			postObject.color = colorPicked
			adminFunctions.addColor($scope,postObject,$index)
		}

}

//If you can just add colors theres no need to number the colors available
//The $index is the index of the product in the actual product list
//Stuff will link up to the closest $index
$scope.addColor= function($index){
			var postObject = {}
			postObject.id = $scope.modifying._id 
			postObject.color = $scope.colorPicked
			adminFunctions.addColor($scope,postObject,$index)
		}

$scope.removeColor= function($index){
	//Index misunderstanding
			var postObject = {}
			postObject.id = $scope.modifying._id 
			postObject.colorIndex = $index
			adminFunctions.removeColor($scope,postObject,$index)
		}


//Images

$scope.ajouterImage = function(){
	adminFunctions.ajouterImage($scope)
}

$scope.newMainImage = function($index){
	adminFunctions.newMainImage($scope,$index)
}

$scope.effacerImage = function($index){
	adminFunctions.effacerImage($scope,$index)
}







/*
$scope.allProduits = []
$scope.openedProduit = []
$scope.isProduitOpen = false
$scope.modifyProduit = {}
adminFunctions.getAllProduits($scope)

$scope.openProduit = function($index){
	
	$scope.isProduitOpen = true
	$scope.openedProduit.push($scope.allProduits[$index])
	$scope.modifyProduit = $scope.allProduits[$index]

}
*/


}])