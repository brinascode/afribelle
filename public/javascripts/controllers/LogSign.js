
app.controller("LogSign",
	["$scope","$http","$location","$window",
	function($scope,$http,$location,$window,$route)
{

$scope.logg 
$scope.sign 
$scope.message ="Pour passer votre commande, vous devez vous connecter/inscrire"+
"Entrez votre nom d'utilisateur et mot de passe suivi de 'Se connecter' pour accéder à votre compte."+
" Pour créer un compte, entrez votre nouveau nom d'utilisateur et mot de passe suivi de 'S'inscrire'"
$scope.user2 = {}

//If connected, go to profile. Block access to this page! -- Not done!



//Now the redirecting is done server side
$scope.signup =function(){
		$http.post("/signup",$scope.sign).success(
			location.reload())

			
			$scope.message = "Connecte toi avec ton nouveau compte"

		
			
}

$scope.login = function(){
	$http.post("/login",$scope.sign).success(
										location.reload())
		

	
	
}

$scope.facebookAuthen=function(){
	 $window.location.href="/auth/facebook"
}
 

$scope.googleAuthen = function(){

	 $window.location.href="/auth/google"
}


}])




