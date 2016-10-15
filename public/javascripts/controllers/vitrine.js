app.controller("vitrine",
	["$scope","$http","$location","$window","customerToProduct","$routeParams",
	function($scope,$http,$location,$window,customerToProduct,$routeParams)
{

$scope.panier = $scope.$parent.panier
$scope.produits
$scope.user = $scope.$parent.user
$scope.isAuthen = $scope.$parent.isAuthen

//Taking all the products from database for a particular vitrine
$scope.getProduits = customerToProduct.getProduits
$scope.getProduits($scope,$location.path())

//Naming the Page and loading vitrine Pic
$scope.vitrinePic={}

if($location.path() == "/soinsducorps"){
	$scope.pageTitle = "Soins du Corps"
		$scope.vitrinePic.img = "images/models/wow.jpg"
	$scope.vitrinePic.width = "20%"
	$scope.vitrinePic.height ="50%" 
	$scope.backColor="#ff1844"
	
}
if($location.path() == "/soinsdescheuveux"){
	$scope.pageTitle = "Soins des Cheveux"

	$scope.vitrinePic.img = "images/models/hi.jpg"
	$scope.vitrinePic.width = "30%"
	$scope.vitrinePic.height ="50%" 
	$scope.backColor="#ff5353"
	
}
if($location.path() == "/visageetmaquillage"){
	$scope.pageTitle = "Visage et Maquillage"
	$scope.vitrinePic.img = "images/models/visage.jpg"
	$scope.vitrinePic.width = "25%"
	$scope.vitrinePic.height ="30%" 
	$scope.backColor="#4D8FAC"
	
}
if($location.path() == "/parfums"){
	$scope.pageTitle = "Parfums"
	$scope.vitrinePic.img = "images/vitrinePage/parfums.jpg"
	$scope.vitrinePic.width = "20%"
	$scope.backColor="#ff8a80"
}

if($location.path() == "/accessoires"){
	$scope.pageTitle = "Accéssoires"
	$scope.vitrinePic.img = "images/vitrinePage/accessoires.jpg"
	$scope.vitrinePic.width = "20%"
	$scope.backColor="#ff8a80"
}


//Filter:
$scope.filter = {}
$scope.produitFilter = true
$scope.boutiqueFilter = false
$scope.changeFilter = function(){
	$scope.produitFilter = !$scope.produitFilter 
	$scope.boutiqueFilter = !$scope.boutiqueFilter
}
if($scope.produitFilter != true){
		$scope.mainFilterType="Article" //Bugging
	}
	else{

		$scope.mainFilterType="Boutique"
	}




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