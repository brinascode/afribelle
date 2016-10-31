app.factory("panierAndCheckout",["$http","$window","$location",function($http,$window,$location){


return {

	//Hide my js code!!
	//Stuff bought from diff people!

	checkout: function($scope){

			if($scope.panier.length !=0){

				if(confirm("Confirmez vous cette commande?"))
				{
					

					if($scope.user.google || $scope.user.local || $scope.user.facebook ){
					
						//Logged in== proceed
							if($scope.user.moreInfo.numerosDeTelephone.length != 0 && $scope.user.moreInfo.nomComplet != undefined)
							{ //Goes through all items in cart to make a commande
								var date = [new Date()]
								date = date.toString() //So it makes it easy to save and later we can
												//unstringify for analytics purposes! But it comes out clean -- how??
								for(var i=0;i<$scope.panier.length;i++){
										
										if($scope.panier[i].livraisonType != null )
										{
											if(!$scope.panier[i].colorChoice || $scope.panier[i].colorChoice.length==0){
													$scope.panier[i].colorChoice = ["Aucune couleur spécifiée"].toString()

											}else{
												//We make the color choice into a string rather than array
											$scope.panier[i].colorChoice = $scope.panier[i].colorChoice.toString()
											}
											
											
											var commande = 	{  
							 					
												acheteurId:$scope.user._id,
												acheteur:$scope.user.moreInfo.nomComplet,
												acheteurContacts:$scope.user.moreInfo.numerosDeTelephone[0], //fix
												date:date,
												vendeur:$scope.panier[i].vendeur,
												vendeurId:$scope.panier[i].vendeurId,
												boutique:$scope.panier[i].boutique,
												boutiqueId:$scope.panier[i].boutiqueId,
												produitNom:$scope.panier[i].nom,
												quantite:$scope.panier[i].quantite,
												prix:$scope.panier[i].prix,
												thisLivraison:$scope.panier[i].livraisonType,
								                //Should i put color codes as well?
												colorChoice:$scope.panier[i].colorChoice


												//livraison is the entire livraison policy of boutique
										       
												}

											$http.post("/nouvelleCommande",commande).success(function(){

												alert("Merci de commander avec AfriBelle!")
											 	$window.location.href= "/userCommandes"
											})

										}
										else{
											alert("Chère cliente, avant de passer votre commande, vous devez choisir un type de livraison pour tout vos articles.")
										}
								}
							}
							else{
								alert("Chère cliente, avant de passer votre commande, vous devez ajouter votre numéro de téléphone dans Profile - Mes Infos.")
								$window.location.href= "/userInfo"
							}

					}
					else
					{
						//Not logged in
						alert("Chère cliente, avant de passer votre commande, vous devez vous inscrire ou vous connecter. Vous devez également choisir un type de livrasion pour tout vos articles. Tout vos articles "+
							"resteront dans le panier!")
						$location.url("/authen")
					}




				
					 
				}
			}
	},

	getUserCommandes : function($scope){
				$scope.loadingMessage = "En charge ..."
				$scope.isLoading = true
				$http.get("/serv_userCommandes").success(function(data){
					$scope.commandes = data
					$scope.commandes.reverse()
						$scope.loadingMessage = ""
						$scope.isLoading = false
					
				})
	},

	getSellerVentes : function($scope){
				$scope.loadingMessage = "En charge ..."
				$scope.isLoading = true
				$http.get("/serv_sellerVentes").success(function(data){
					$scope.commandes = data
					$scope.commandes.reverse()
					$scope.loadingMessage = ""
					$scope.isLoading = false
				})
	}



}


}])







