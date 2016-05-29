app.controller("AcceuilleController",["$scope","$location","$window","$http",
	function($scope,$location,$window,$http){

//***************Panier********************************************
//Le panier pr les articles ajoutés depuis les "views".
//The content is sent to the child controlle: panier.js
$scope.panier = []

//****************User Data**************************
$scope.user





			$http.get("/userinfo_serv").success(function(data){
				$scope.user = data
				console.log(data)
			//Make sure user extra info is complete
			if(data.moreInfo === null)
			{   //This is not great, fix itt!!!!
				$scope.completedInfo = false
				$scope.message1  = "Tu dois remplir ces informations avant de commencer à vendre et faire des achats"
			}	
			else
			{
				$scope.completedInfo = true
				
			}
			})





//Answers the question as true or false,when true hides signup/login buttons
$scope.isAuthen 

//Checking if user is authenticated To hide/show buttons:))
$http.get("/isAuthen").success(function(data){
	$scope.isAuthen = data
	console.log(data)
})

$scope.logout =function(){
	$http.get("/logout").success(function(){
		$scope.isAuthen = false
		$window.location.href="/"
		console.log($scope.isAuthen)
	})
}




}])