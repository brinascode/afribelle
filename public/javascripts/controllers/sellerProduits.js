app.controller("sellerProduits",
	["$scope","$http","$location","$window","sellerFunctions",
	function($scope,$http,$location,$window,sellerFunctions)
{

$scope.user = $scope.$parent.user
$scope.message

//************Gets the produits *******
$scope.mesProduits=[]
$scope.getMesProduits  = sellerFunctions.getMesProduits
$scope.getMesProduits($scope)

//*****************Pour ajouter un nouveau produit (updates the product list)
//In factory
$scope.nouveauProduit = {}


$scope.ajouterProduit = function(nouveauProduit) //Validated! 
{ 
	if($scope.$parent.user.local.username){
	$scope.nouveauProduit.vendeur=""+$scope.user.local.username+""
	}
	else{
  	$scope.nouveauProduit.vendeur=""+$scope.user.facebook.name+""
	}

	$scope.nouveauProduit.vendeurId=""+$scope.user._id+""
	$scope.nouveauProduit.vendeurContacts = $scope.user.moreInfo.numerosDeTelephone


	if(nouveauProduit.nom && nouveauProduit.type && nouveauProduit.details && 
	   nouveauProduit.prix && nouveauProduit.livraison &&
	  $scope.user.moreInfo.numerosDeTelephone.length != 0
	   && $scope.mesProduits.length < 51) 
	  //It needs a reload to check for nums
	{  
			sellerFunctions.ajouterProduit($scope,nouveauProduit) 

			
			$scope.message ="Produit ajouté!"
    }else{
    	$scope.message = "Veuillez: "+
    	"1. Remplir tous les champs s'il vous plait "+
    	"2. Vérifier que vous "+ 
    	"avez ajouté un numéro de téléphone dans :'Mes Infos' "+
    	"3.Verifier que vous ne vendez pas plus de 50 produits en meme temps"
    }//tous or tout
}


//************************Pour supprimer un produit *************
//In factory
$scope.effacerProduit = function($index){
	sellerFunctions.effacerProduit($scope,$index)
	
}

//*************Modifer un produit***********************************
//In factory
$scope.modifSection = false
$scope.modifications = {}

$scope.hideModifSection = function(){
	$scope.modifSection = false
}

$scope.modifyProduit = function($index){//Data binding makes unsaved changes stay
										//for a while
	$scope.modifSection = true
	$scope.modifying = $scope.mesProduits[$index]
	$scope.modIndex = $index


}

$scope.modifyProduitPost = function(){
	sellerFunctions.modifyProduitPost($scope)
}


$scope.ajouterImage = function(){
	sellerFunctions.ajouterImage($scope)
}

$scope.newMainImage = function($index){
	sellerFunctions.newMainImage($scope,$index)
}

$scope.effacerImage = function($index){
	sellerFunctions.effacerImage($scope,$index)
}





	



}])