app.controller("userInfo",["$scope","$http","$location","$window","authen","userModifs",
	function($scope,$http,$location,$window,authen,userModifs){



$scope.user={}
authen.getUserInfo($scope)


$scope.completedInfo = false
$scope.moreInfoNew = {}
$scope.message

	$scope.nomCompletNew
		$scope.newNomComplet = function(){

			userModifs.newNomComplet($scope,$scope.nomCompletNew)
			
				
		}


		//Not A number + Doesnt update parent!
		$scope.newUserTelephone= function(){ //Validated
			if($scope.moreInfoNew && $scope.moreInfoNew.telephone.toString().length===8){ 
				userModifs.newUserTelephone($scope)
				
				
			}else{
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