app.controller("userInfo",["$scope","$http","$location","$window","authen","userModifs",
	function($scope,$http,$location,$window,authen,userModifs){



$scope.user={}
authen.getUserInfo($scope)


$scope.completedInfo = false
$scope.moreInfoNew = {telephone:225}
$scope.message

	$scope.nomCompletNew
		$scope.newNomComplet = function(){

			userModifs.newNomComplet($scope,$scope.nomCompletNew)
			
				
		}


		//Not A number + Doesnt update parent!
		$scope.newUserTelephone= function(){ //Validated
			if($scope.moreInfoNew && $scope.moreInfoNew.telephone){ 

				//Make it into a string to take out 225 and also use length property
				var stringedNum = $scope.moreInfoNew.telephone.toString()
				var afterSlice = stringedNum.slice(3) //Take out 225

				
				//If without the 225 
				if(afterSlice.length === 8){
					console.log(afterSlice)
					
					//Update the num now :)
					$scope.moreInfoNew.telephone = afterSlice //Didnt put  parseInt  cause it ignores 0 as well (just like toString)
					userModifs.newUserTelephone($scope)
				}
				else{
					$scope.message = "Veuillez entrez un numéro de telephone Ivoirien valide s'il vous plait"
				}
				
				
			}
			 
			else{
				
				$scope.message = "Veuillez entrez un numéro de telephone Ivoirien valide s'il vous plait"

			}

			
		}



		$scope.removeUserTelephone = function($index){
			userModifs.removeUserTelephone($scope,$index)
	
		} 


		$scope.changeAvatar = function(url){
		var postObject = {url:url}
		userModifs.changeAvatar($scope,postObject)
	

		}





}])

//When you pass parameters to service function, you wrap it up with a native scope 
//function cause from the DOM you cant send params to service function