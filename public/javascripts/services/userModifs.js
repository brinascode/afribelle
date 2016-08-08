app.factory("userModifs",["$http","$window",function($http,$window){
$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";


return {

	newNomComplet : function($scope,nomCompletNew){

			var postObject = {nomComplet:nomCompletNew}
			$http.post("/newNomComplet",postObject).success(function(data){
				$scope.user = data
				$window.location.href = "/userInfo"
			}) 


	},

	newUserTelephone: function($scope){

			$http.post("/newUserTelephone",$scope.moreInfoNew).success(function(data){
				$scope.user = data
			//Cant modify parent from child!!
					$window.location.href = "/userInfo"
			}) 
			
	},
	removeUserTelephone: function($scope,$index){
		
			$http.post("/removeUserTelephone",{indice:$index}).success(function(data){
				$scope.user = data
					$window.location.href = "/userInfo"
				
			})
	},
	changeAvatar : function($scope,postObject){

		$http.post("/changeAvatar",postObject).success(function(data){
			$scope.user = data
			$window.location.href = "/userInfo"
		})
	}


}


}])

//Will be functions of main controller then! 