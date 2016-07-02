app.factory("authen",["$http","$window",function($http,$window){

return { 
	logout: function(){
			$http.get("/logout").success(function(){
				//$scope.isAuthen = false
				$window.location.href="/"
			})
	},
	isAuthen:function($scope){
			$http.get("/isAuthen").success(function(data){
			 $scope.isAuthen = data
			 
			})
	},
	getUserInfo:function($scope){
			$http.get("/userinfo_serv").success(function(data){
				$scope.user = data
			})
	}
	



}

}])

