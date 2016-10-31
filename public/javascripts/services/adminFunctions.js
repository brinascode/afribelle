app.factory("adminFunctions",["$http","$window","$location",function($http,$window,$location){

return {



		getAllProduits : function($scope){
				$http.get("/getAllProduits").success(function(data){
					
					$scope.allProduits= data//Data is array now
					
				})
				




		},

		getAllBoutiques : function($scope){
				$http.get("/getAllBoutiques").success(function(data){
					
					$scope.allBoutiques= data//Data is array now
					
				})
				

		},




		createBoutique: function($scope,boutique){
				$http.post("/createBoutique",boutique).success(function(data){
					console.log(data)
					$scope.mesBoutiques= data//Data is array now
					$scope.showBoutiqueSection = false
				})
				


		},
        
        getMesBoutiques :function($scope){


        		$http.get("/mesBoutiques").success(function(data){
        			$scope.mesBoutiques = data
        		
        			//You can only create a boutique if you dont already have one
					if($scope.mesBoutiques.length != 0){
						//You already have a boutique
						$scope.showBoutiqueSection = false
						

						}

					else{
						
						$scope.showBoutiqueSection = true
						

					}


        		})

				

        },
        //Modifying boutique

        updateBoutiqueLivraison: function($scope){
        		
        		var postObject = $scope.boutiqueLivraison

        		$http.post("/updateBoutiqueLivraison",postObject).success(function(data){
	        		$scope.mesBoutiques = data
	        		$window.location.href = "/myBoutique"
	        		 
        		})


        },
        changeBoutiqueTheme : function($scope,postObject){
        	$http.post("/changeBoutiqueTheme",postObject).success(function(data){
        		$scope.mesBoutiques[0].themeUrl = postObject.url
        		
        		
        	})

        },


		getMesProduits2 : function($scope,id){
					$scope.loadingMessage = "En charge ..."
		        	$scope.isLoading = true
		        	//My Id will be the boutique's id
				
					$http.post("/mesproduits2",{id:id}).success(function(data){
						$scope.mesProduits = data
						
						$scope.mesProduits.reverse()

						$scope.loadingMessage = ""
	        			$scope.isLoading = false

	        			console.log($scope.mesProduits)
					
				
					
					})
		},

		ajouterProduit : function($scope,nouveauProduit){
			//Matching product to boutique
			nouveauProduit.boutique = $scope.mesBoutiques[0].nom
			nouveauProduit.boutiqueId = $scope.mesBoutiques[0]._id

			nouveauProduit.vendeurId = ""+$scope.user._id+""
			nouveauProduit.vendeurContacts = $scope.user.moreInfo.numerosDeTelephone
			nouveauProduit.livraison = {}
			//nouveauProduit.livraison = $scope.mesBoutiques[0].livraison
			//This does not reach dserver (up=)

		
			//$scope.nouveauProduit.livraison.gratuite = $scope.mesBoutiques[0].livraison.gratuite
			//$scope.nouveauProduit.livraison.payantePrix = $scope.mesBoutiques[0].livraison.payantePrix
			//$scope.nouveauProduit.livraison.payanteLieux = $scope.mesBoutiques[0].livraison.payanteLieux
			
			$scope.isLoading = true
			$scope.loadingMessage = "Ajout de votre article en cours ..."

			$http.post("/ajouterProduit",nouveauProduit).success(function(data){
				$scope.mesProduits = data
				$scope.mesProduits.reverse()

				$scope.isLoading = false
				$scope.loadingMessage = ""
				
			})



		},
		modifyProduitPost : function($scope){
			$http.post("/modifyProduit",$scope.modifying).success(function(data){
				$scope.mesProduits[$scope.modIndex] = data
				$scope.modifMessage = "Changements éffecutés!"
				setTimeout(function(){$scope.modifMessage=""},5000)
				
			})

		},

		effacerProduit : function($scope,$index){
			if(
				confirm("Etes vous sur de vouloir supprimer "+ 
					$scope.mesProduits[$index].nom+"? "+
					"La suppression est irréversible")
				){ 
					$http.post("/effacerProduit",{id:$scope.mesProduits[$index]._id})
					.success(function(data){

								$scope.mesProduits = data
								$scope.mesProduits.reverse()
			    	})
			}

			
		},
		addColor: function($scope,postObject,$index){

				$http.post("/addColor",postObject)
					.success(function(data){

								$scope.mesProduits[$index] = data[0]
								
			    	})

		},
		removeColor: function($scope,postObject,$index){

				$http.post("/removeColor",postObject)
					.success(function(data){

								$scope.mesProduits[$index] = data[0]
								
			    	})

		},

		ajouterImage: function($scope){
			

			var ospry = new Ospry('pk-test-fgp2qoror92tabjz3t2s3mfv'); //Ospry TEST key
				//No more than 4 pics
			if($scope.modifying.imageUrls.length >= 5){
				$scope.imageMessage = 
				"Vous ne pouvez avoir que 5 images de cet article en meme temps"
			}
			else{ 
					$scope.imageMessage="Merci de patienter"
					$('#ajouterImage').submit(function(e) {

				  	e.preventDefault();

				  //How not to upload empty stuff. Does ospry account for empties?
				  	$scope.imageDone = true

				  ospry.up({
				    form: this,
				    imageReady: function(err,metadata){
				    	//You post the metadata's url to the product
				    	var toPost = {
			                       produitId:$scope.modifying._id,
			                       url:metadata.url
	                        		}

				    	$http.post("/addImage",toPost)
		                   .success(function(data){
		                       
		                       $scope.modifying = data
		                       $scope.produits[$scope.modIndex] = data
		                 })

		                 //The first image automatically becomes main Image
		                if($scope.modifying.mainImageUrl =""){

		                    $http.post("/newMainImage",toPost).success(function(data){
		                     	$scope.modifying = data	
		                     	$scope.mesProduits[$scope.modIndex] = data
		                    })
		                 }

		                    $scope.imageDone = false
							$scope.imageMessage="Image ajoutée"
				    },
				  });
				});
			}


		},
		newMainImage : function($scope,$index){
			$scope.imageMessage ="Merci de patienter!"
					var toPost = {
			                       produitId:$scope.modifying._id,
			                       url:$scope.modifying.imageUrls[$index]
	                        		}

		              $http.post("/newMainImage",toPost).success(function(data){
		                  	$scope.modifying = data
		                  	$scope.mesProduits[$scope.modIndex] = data	
		               })	

		},
		effacerImage : function($scope,$index){
					var toPost = {
						produitId:$scope.modifying._id,
						eraseAt : $index
					}
						$http.post("/effacerImage",toPost).success(function(data){
							$scope.modifying = data
		                  	$scope.mesProduits[$scope.modIndex] = data	
						})


		},

		
		deliveryConfirmed: function($scope,commandeId){
			 	var postObject = {_id:commandeId}
			 	console.log(postObject)
				$http.post("/deliveryConfirmed",postObject).success(function(data){
							$window.location.href= "/sellerVentes"
						})

		}

		
}


}])