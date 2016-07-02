app.factory("sellerFunctions",["$http",function($http){

return {

		getMesProduits : function($scope){
					$http.get("/mesproduits").success(function(data){
					$scope.mesProduits = data
					$scope.mesProduits.reverse()
					console.log(data)
					})
		},

		ajouterProduit : function($scope,nouveauProduit){
			$http.post("/ajouterProduit",nouveauProduit).success(function(data){
			$scope.mesProduits = data
			$scope.mesProduits.reverse()
			

			})

		},
		modifyProduitPost : function($scope){
			$http.post("/modifyProduit",$scope.modifying).success(function(data){
				$scope.mesProduits[$scope.modIndex] = data
				console.log(data)
			})
			$scope.message2 = "Changements enregistrés"
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