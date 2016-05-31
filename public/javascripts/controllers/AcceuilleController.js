app.controller("AcceuilleController",["$scope","$location","$window","$http",
	function($scope,$location,$window,$http){

//***************Panier********************************************
//Le panier pr les articles ajoutés depuis les "views".
//The content is sent to the child controlle: panier.js
$scope.panier = []

//****************User Data**************************
$scope.user={}
$scope.child={}

/* You can try this:

$scope.child = {} //declare it in parent controller (scope)
then in child controller (scope) add:

var parentScope = $scope.$parent;
parentScope.child = $scope;
Now the parent has access to the child's scope.
*/

//To logout of user session
$scope.logout =function(){
	$http.get("/logout").success(function(){
		$scope.isAuthen = false
		$window.location.href="/"
		console.log($scope.isAuthen)
	})
}

//Making function
$scope.getUserInfo = function(){
		//To get the logged in user's info
		$http.get("/userinfo_serv").success(function(data){
			$scope.user = data
		})
		return $scope.user
}
//Calling function
$scope.getUserInfo()



//Answers the question as true or false,when true hides signup/login buttons
$scope.isAuthen 

//Checking if user is authenticated To hide/show buttons:))
$http.get("/isAuthen").success(function(data){
	$scope.isAuthen = data
	
})


}])