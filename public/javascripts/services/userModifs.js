app.factory("userModifs",["$http","$window",function($http,$window){


return {

	newNomComplet : function($scope,nomCompletNew){

			var postObject = {nomComplet:nomCompletNew}
			$http.post("/newNomComplet",postObject).success(function(data){
				$scope.user = data
			
				//Cause a page refresh !!$window.refresh()
			}) 


	},

	newUserTelephone: function($scope){

			$http.post("/newUserTelephone",$scope.moreInfoNew).success(function(data){
				$scope.user = data
			//Cant modify parent from child!!
				//Cause a page refresh !!$window.refresh()
			}) 
			
	},
	removeUserTelephone: function($scope,$index){
		
			$http.post("/removeUserTelephone",{indice:$index}).success(function(data){
				$scope.user = data
				
			})
	}


}


}])

//Will be functions of main controller then! 