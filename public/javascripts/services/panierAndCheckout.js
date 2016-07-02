app.factory("panierAndCheckout",["$http","$window",function($http,$window,$location){

return {

	//Stuff bought from diff people!

	checkout: function($scope){
			if($scope.panier.length !=0){
				if(confirm("Etes vous sur de passer cette commande?"))
				{
					
					if($scope.user.moreInfo.numerosDeTelephone.length != 0)
					{
						for(var i=0;i<$scope.panier.length;i++){
					 	var commande = 	{  
					 					acheteur:$scope.user.local.username, //fix this
										acheteurId:$scope.user._id,
										acheteurContacts:$scope.user.moreInfo.numerosDeTelephone,
										date:new Date(),
										vendeur:$scope.panier[i].vendeur,
										vendeurId:$scope.panier[i].vendeurId,
										vendeurContacts:$scope.panier[i].vendeurContacts,
										produitNom:$scope.panier[i].nom,
										quantite:$scope.panier[i].quantite,
										prix:$scope.panier[i].prix
										}

							$http.post("/nouvelleCommande",commande)
							.success(function(data){
								console.log(data) //After can erase
								$window.location.href= "/userCommandes"
								
							})							
						}
					}
					else{
						alert("Merci de ajouter un numéro de téléphone dans: Profile/Mes Infos, avant de passer votre commande")
					}

					 
				}
			}
	},

	getUserCommandes : function($scope){
				$http.get("/serv_userCommandes").success(function(data){
					$scope.commandes = data
					$scope.commandes.reverse()
				})
	},

	getSellerVentes : function($scope){
				$http.get("/serv_sellerVentes").success(function(data){
					$scope.commandes = data
					$scope.commandes.reverse()
				})
	}



}


}])







