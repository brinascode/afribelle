app.factory("userModifs",["$http","$window",function($http,$window){


return {

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
				console.log(data)
			})
	}


}


}])

//Will be functions of main controller then! 