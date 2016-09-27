app.controller("myBoutique",
	["$scope","$http","$location","$window","sellerFunctions",
	function($scope,$http,$location,$window,sellerFunctions)
{

$scope.user = $scope.$parent.user
$scope.message


//Load the boutiques 
$scope.mesBoutiques = []
$scope.getMesBoutiques = function(){
	sellerFunctions.getMesBoutiques($scope)
}
$scope.getMesBoutiques()




//Créer sa boutique:
$scope.nomBoutique 
$scope.boutiqueMsg 
$scope.createBoutique = function(){
	if( $scope.nomBoutique.length == 0 ){

		$scope.boutiqueMsg = "Veuillez entrer un nom de boutique"
	}
	else{

			if(confirm("Voulez vous vraiment renommer votre boutique ainsi: " + $scope.nomBoutique+" ? Vous ne"+
			" pourrez plus changer ce nom"))
			{
				sellerFunctions.createBoutique($scope,{
				nom:$scope.nomBoutique,
				vendeurId:$scope.user._id,
				themeUrl:"themesBoutiques/tLipsBack.png"
				})
			}	
    }
			
}


//Modify boutique
$scope.modButtonMessage = "Modifier la boutique"
$scope.modBoutique = function(){

	$scope.showModBoutique = !$scope.showModBoutique
	if($scope.showModBoutique === true){
		$scope.modButtonMessage = "Fermer"
	}
	else{
		$scope.modButtonMessage = "Modifier la boutique"
	}


}

//Politique de Livraison

$scope.boutiqueLivraison 

$scope.updateBoutiqueLivraison = function(){
	sellerFunctions.updateBoutiqueLivraison($scope)
}




//Themes
$scope.changeBoutiqueTheme = function(url){
	boutiqueId = $scope.mesBoutiques[0]._id
	 
	 var postObject = {
		url:url,
		id:boutiqueId
	}
	sellerFunctions.changeBoutiqueTheme($scope,postObject)
	
}


//************Gets the produits *******
$scope.mesProduits=[]
$scope.getMesProduits  = sellerFunctions.getMesProduits
$scope.getMesProduits($scope)



//*****************Pour ajouter un nouveau produit (updates the product list)
$scope.produitSection = false
$scope.toggleProduitSection = function(){
	$scope.produitSection = !$scope.produitSection
}
$scope.message= "Avant d'ajouter d'article, assurez vous d'avoir entré votre nom complet et un numéro de téléphone dans: Profile/Mes Infos"
//In factory
$scope.nouveauProduit = {}




$scope.ajouterProduit = function(nouveauProduit) //Validated! 
{ 
	if($scope.user){
		if($scope.user.moreInfo.nomComplet){
	$scope.nouveauProduit.vendeur=""+$scope.user.moreInfo.nomComplet+""
	}
	else{
  	$scope.nouveauProduit.vendeur=""+$scope.user.facebook.name+""
	}

	
	

	if(nouveauProduit.nom && nouveauProduit.type && nouveauProduit.details && $scope.mesBoutiques[0].livraison && 
	   nouveauProduit.prix && $scope.user.moreInfo.numerosDeTelephone.length != 0
	   && $scope.mesProduits.length < 51) 
	  //It needs a reload to check for nums
	{  
		
			
			sellerFunctions.ajouterProduit($scope,nouveauProduit) 

			
			$scope.message ="Produit ajouté! Naviguez vers le bas de la page"
    }else{
    	$scope.message = "S'il vous plait veuillez: "+
    	"1. Remplir tous les champs "+
    	"2. Vérifier que vous avez ajouté votre nom complet et un numéro de téléphone dans :'Profile/Mes Infos' "+
    	"3.Verifier que vous avez ajouter une politique de livraison à votre boutique" +
    	"4.Verifier que vous ne vendez pas plus de 50 produits en meme temps"
    }//tous or tout
	}
	
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
	$scope.modifSection = !$scope.modifSection
}

$scope.modifyProduit = function($index){//Data binding makes unsaved changes stay
										//for a while
	$scope.modifSection = true
	$scope.modifying = $scope.mesProduits[$index]
	$scope.modIndex = $index


}

$scope.modifyProduitPost = function(){
	//Stop from posting empty stuff
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