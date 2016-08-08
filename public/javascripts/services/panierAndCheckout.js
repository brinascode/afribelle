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
								for(var i=0;i<$scope.panier.length;i++){
										
										if($scope.panier[i].livraisonType != null)
										{
											var commande = 	{  
							 					
												acheteurId:$scope.user._id,
												acheteur:$scope.user.moreInfo.nomComplet,
												acheteurContacts:$scope.user.moreInfo.numerosDeTelephone,
												date:new Date(),
												vendeur:$scope.panier[i].vendeur,
												vendeurId:$scope.panier[i].vendeurId,
												boutique:$scope.panier[i].boutique,
												boutiqueId:$scope.panier[i].boutiqueId,
												vendeurContacts:$scope.panier[i].vendeurContacts,
												produitNom:$scope.panier[i].nom,
												quantite:$scope.panier[i].quantite,
												prix:$scope.panier[i].prix,
										        livraison:$scope.panier[i].livraisonType,
										        detailsLivraison:$scope.panier[i].livraison

												}

											

												
												var req = {
														method:"POST",url:"/nouvelleCommande",data:commande,headers:{"Content-Type": "application/json"}
												}

											$http(req).then(function(data){
												alert("Merci de commander avec AfriBelle!")
											 	$window.location.href= "/userCommandes"
											})

										}
										else{
											alert("Merci de spécifier votre type delivraison pour tous vos articles")
										}
								}
							}
							else{
								alert("Merci d'ajouter un numéro de téléphone et votre nom complet dans votre Profile (Mes Infos) avant de passer votre commande. Vos articles resteront dans votre panier.")
								$window.location.href= "/userInfo"
							}

					}
					else
					{
						//Not logged in
						alert("Merci de vous inscrire/connecter avant de faire des achats. Vos articles "+
							"resteront dans le panier.")
						$location.url("/authen")
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







