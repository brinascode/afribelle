app.factory("sellerFunctions",["$http",function($http){

return {

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
						$scope.showBoutiqueSection = false
						}

					else{
						
						$scope.showBoutiqueSection = true
						console.log($scope.showBoutiqueSection )

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


		getMesProduits : function($scope){
					$http.get("/mesproduits").success(function(data){
					$scope.mesProduits = data
					$scope.mesProduits.reverse()
					
					})
		},

		ajouterProduit : function($scope,nouveauProduit){
			//Matching product to boutique
			nouveauProduit.boutique = $scope.mesBoutiques[0].nom
			nouveauProduit.boutiqueId = $scope.mesBoutiques[0]._id
			
			$http.post("/ajouterProduit",nouveauProduit).success(function(data){
			$scope.mesProduits = data
			$scope.mesProduits.reverse()
			

			})

		},
		modifyProduitPost : function($scope){
			$http.post("/modifyProduit",$scope.modifying).success(function(data){
				$scope.mesProduits[$scope.modIndex] = data
				
			})
			$scope.message2 = "Changements éffecutés"
		},

		effacerProduit : function($scope,$index){
			if(
				confirm("Etes vous sur de vouloir supprimer "+ 
					$scope.mesProduits[$index].nom+"? "+
					"La suppression est irréversible")
				){ 
					$http.post("/effacerProduit",$scope.mesProduits[$index])
					.success(function(data){

								$scope.mesProduits = data
								$scope.mesProduits.reverse()
			    	})
			}

			
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


		}

}


}])