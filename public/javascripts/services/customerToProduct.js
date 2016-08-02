app.factory("customerToProduct",["$http","$routeParams",function($http,$routeParams)
{


return {
	//For boutiques display 
	getBoutiques: function($scope){

		$http.get("/serv_Boutiques").success(function(data){
			console.log(data)
			$scope.boutiques = data
			$scope.boutiques.sort(function() { return 0.5 - Math.random() }); 
		})

	},
	//Single Boutique
	getBoutique:function($scope,$routeParams){
			
		$http.post("/boutique",$routeParams).success(function(data){
			$scope.boutique = data //Data is an array now
		})
			//Now get the produits from this boutique
			$http.post("/boutiqueProduits",$routeParams).success(function(data){
				$scope.produits = data
			})

	},


	//Produits d'une vitrine
	getProduits: function($scope,route){

			$http.get(route+"Produits").success(function(data){
				$scope.produits = data
			
				$scope.produits.sort(function() { return 0.5 - Math.random() }); 


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
	
		var proceed = 0

		//To add to cart from product page
		if($scope.produit){ //Make sure its not stupid!
			console.log("true")
			 $scope.produits = $scope.produit
		}


			//Checking that product not already in cart
		for(var i=0;i<=$scope.$parent.panier.length;i++)
		{	
			//Pour ajouter d'une vitrine
			if($scope.$parent.panier[i] &&
				$scope.produits[$index] &&
				$scope.$parent.panier[i]._id == $scope.produits[$index]._id)
			{
				proceed +=1 //If already in basket then dont read
			}
			
		}
		
		if(proceed < 1){
			$scope.produits[$index].quantite = 1  //Setting quantity value
			$scope.$parent.panier.push($scope.produits[$index])

			//Add to session storage:
			sessionStorage.panier = JSON.stringify($scope.$parent.panier)
			console.log(sessionStorage)
			//	Tell them when their browser sucks!
		}
		
	},

	newVote: function($scope,$index){
		if($scope.isAuthen === true){ 


		//Voting from product page
		if($scope.produit){ 
			console.log("true")
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
					
					console.log(data)
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
		
					console.log(comment.discussionId)
					comment.date = new Date().toString() //dsnt do anything

					$http.post("/postComment",comment).success(function(data){
						$scope.comments = data
						$scope.comments.reverse()
					})

				}


	}

}




}])