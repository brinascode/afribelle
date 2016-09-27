app.factory("customerToProduct",["$http","$routeParams",function($http,$routeParams)
{


return {
	//For boutiques display 
	getBoutiques: function($scope){

		if($scope.boutiques.length == 0){
				$scope.loadingScreen = "En charge ..."
			}


		$http.get("/serv_Boutiques").success(function(data){

			$scope.loadingScreen = ""
			$scope.boutiques = data
			$scope.boutiques.sort(function() { return 0.5 - Math.random() }); 
		})

	},

	//Single Boutique
	getBoutique:function($scope,$routeParams){

		if($scope.boutique.length == 0 && $scope.produits.length == 0){
				$scope.isLoading = true
				$scope.loadingScreen = "En charge ..."
			}
			
		//Get the boutique info first, then its produits
		$http.post("/boutique",$routeParams).success(function(data){
			$scope.boutique = data //Data is an array now
			$scope.isLoading = false
			$scope.loadingScreen = ""
			
		})
		
		//Now get the produits from this boutique
		$http.post("/boutiqueProduits",$routeParams).success(function(data){
				$scope.produits = data
				$scope.isLoading = false
				$scope.loadingScreen = ""
		})

	},


	//Produits d'une vitrine
	getProduits: function($scope,route){
			if(!$scope.produits){
				$scope.loadingScreen = "En charge ..."
			}


			$http.get(route+"Produits").success(function(data){
				$scope.produits = data
				$scope.loadingScreen = ""
				$scope.produits.sort(function() { return 0.5 - Math.random() }); 

				if($scope.produits.length == 0){
					$scope.noProduits = "Arrive bientot!"
				}


			})

			


			
	},

	//Page produit
	getProduit:function($scope,$routeParams){
			//Is http post the best way to do this?
		$http.post("/produit",$routeParams).success(function(data){
			$scope.produit = data //Data is an array now
		})


	},

	ajouterAuPanier : function($scope,$index){
		//Cant add twice! Validated :)
		//You can add from : Vitrine, Product Page
	
		var proceed = 0

		
		//Adding from the vitrine is the standard so to add from product page you change the page var to match the vitrine var
		if($scope.produit){ 
			
			 $scope.produits = $scope.produit
		}


		//Going through cart to make sure that product is not already inside it
		for(var i=0;i<=$scope.panier.length;i++)
		{	
			if($scope.panier[i] &&
				$scope.produits[$index] &&
				$scope.panier[i]._id == $scope.produits[$index]._id)
			{
				proceed +=1 //If already in basket proceed == 1
			}
			
		}
		
		//If proceed is not 1, meaning product is not in basket:
		if(proceed < 1){
			$scope.produits[$index].quantite = 1  //Setting generic quantity value
			$scope.panier.push($scope.produits[$index])


			//Le total de la commande: (takes from diff scopes, all are fed from acceuille controller)
			$scope.$parent.panierDetails.totalCommande += parseInt($scope.produits[$index].prix)
			console.log($scope.$parent.panierDetails.totalCommande)

			//Add to session storage: (sessionStorage can only hold Strings remember?)
			sessionStorage.panier = JSON.stringify($scope.panier)
			
			//	Tell them when their browser sucks if they don't have sessionStorage!!
		}

	
		
	},

	newVote: function($scope,$index){
		if($scope.isAuthen === true){ 


		//Voting from product page
		if($scope.produit){ 
		
			 $scope.produits = $scope.produit
		}


		var produit = $scope.produits[$index]
		var produitId = $scope.produits[$index]._id
		var votedFor = $scope.user.votedFor
		$scope.voteAllowed = 0
			

			//if you have already voted, you cant again
		for(var i=0;i<=votedFor.length; i++){
			if(votedFor[i] === produitId){
				$scope.voteAllowed +=1
			}
		}

			if($scope.voteAllowed===0){
				console.log($scope.voteAllowed)
				$http.post("/newVote",{_id:produitId}).success(function(data){
					
					$scope.produits[$index] = data.produit
					$scope.user = data.user
				

				})
			}
			else{
				
				$http.post("/unVote",{_id:produitId}).success(function(data){
					$scope.produits[$index] = data.produit
					$scope.user = data.user
					
					
				})

				
			}
			
		}	

	},
	getComments : function($scope,id){	
				
				//Is http post the only way to pass dataN

				var postObject = {discussionId:id}

				$http.post("/comments",postObject).success(function(data){
					
					$scope.comments = data
					$scope.comments.reverse()
				})
	},

	postComment : function($scope,comment,$routeParams){


				if(comment.body != ""){ 


					if($scope.user.facebook != undefined ){
						comment.auteur = $scope.user.facebook.name
					}else{
						comment.auteur = $scope.user.local.username
					}

					//Commenting a boutique or a produit?
					if($scope.produit != undefined){
						comment.discussionId = $scope.produit[0]._id
					}
					else{
						 comment.discussionId = $routeParams.id
					}
		
				
					comment.date = new Date().toString() //to string dsnt do anything
					comment.profilePic = $scope.user.moreInfo.profilePic

					$http.post("/postComment",comment).success(function(data){
						$scope.comments = data
						$scope.comments.reverse()
					})

				}


	}

}




}])