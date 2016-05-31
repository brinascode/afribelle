app.controller("sellerProduits",
	["$scope","$http","$location","$window",function($scope,$http,$location,$window)
{


//************Gets the produits the user has online already.
$scope.mesProduits=[]
$http.get("/mesproduits").success(function(data){
	$scope.mesProduits = data
	console.log(data)
})


//************************Pour supprimer un produit *************
$scope.effacerProduit = function(index){
	$http.post("/effacerProduit",$scope.mesProduits[index]).success(
		function(data){
			$scope.mesProduits = data
		})
}
//*****************Pour ajouter un nouveau produit (updates the product list)
$scope.nouveauProduit = {}
if($scope.$parent.user.local.username){
	$scope.nouveauProduit.vendeur=""+$scope.$parent.user.local.username+""
}
else{
  $scope.nouveauProduit.vendeur=""+$scope.$parent.user.facebook.name+""
}


$scope.nouveauProduit.vendeurId=""+$scope.$parent.user._id+""
//Later fix the validation, and make them confirm. 
//If they have already 15 prods,they cant sell more!

$scope.ajouterProduit = function(nouveauProduit)
{
			$http.post("/ajouterProduit",nouveauProduit).success(function(data){
			$scope.mesProduits = data
			})
      
} 
//******************************************Ajouter une Image**********************

var ospry = new Ospry('pk-test-fgp2qoror92tabjz3t2s3mfv'); //Ospry TEST key

//Showing and hiding the addImage Section
$scope.addImageSection = false

$scope.addImageToName // get name of product we're adding to
$scope.addImageToId // getid of said product --given after looping

$scope.doAddImage = function(){
	$scope.addImageSection = true

}


$scope.addImage = function(){
	$scope.loadingMessage = "Merci de patienter pendant qu'on télécharge l'image"
	
	//Loop through to get the id of the product we want to post to
	for(var i=0;i<$scope.mesProduits.length;i++){
			//If you find the name in the array, get the id
		if($scope.mesProduits[i].nom === $scope.addImageToName)
		{ 
				$scope.addImageToId = $scope.mesProduits[i]._id
				console.log("good")
		}
	}
	 
	$('#up-form').submit(function(e) {
			  e.preventDefault();
			  ospry.up({
			    form: this,
			    imageReady: function(err,metadata){
			    	//You post the metadata's url to the product
			    	$http.post("/addImage",
                      {
                       produitId:$scope.addImageToId,
                       url:metadata.url
                        })
	                       .success(function(data){
	                       $scope.mesProduits = data
	                     })

						 console.log("Success!")
			    },
			  });
			});
	
}




}])