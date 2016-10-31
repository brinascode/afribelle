
app.controller("LogSign",
	["$scope","$http","$location","$window",
	function($scope,$http,$location,$window,$route)
{

$scope.logg 
$scope.sign 
$scope.message ="Pour passer votre commande, vous devez vous connecter/inscrire"+
" Entrez votre nom d'utilisateur et mot de passe suivi de 'Se connecter' pour accéder à votre compte."+
" Pour créer un compte, entrez votre nouveau nom d'utilisateur et mot de passe suivi de 'S'inscrire'"
$scope.user2 = {}

//If connected, go to profile. Block access to this page! -- Not done!



//Makeshift page Anchor
	var el = document.getElementById("scrollHere1");
    el.scrollIntoView(true);


setTimeout(function(){
	var objectLength = JSON.stringify($scope.$parent.user.local)
	var user = $scope.$parent.user.local
	

	if(sessionStorage.signUpAttempt == "1" && user !== undefined){
		alert("Inscription réussie! Vous pouvez accéder à votre profile")
		$scope.showM2=true
		$scope.message2 ="Inscription réussie! Vous pouvez accéder à votre profile"
		sessionStorage.signUpAttempt = "0"
	}
	else if(sessionStorage.signUpAttempt == "1" && user == undefined){
		alert("Merci de choisir un autre nom d'utilisateur, celui ci est déjà pris ")
		$scope.showM2=true
		$scope.message2 ="Merci de choisir un autre nom d'utilisateur, celui ci est déjà pris "
		//2 types of not workingm!!
		sessionStorage.signUpAttempt = "0"
	}


	if(sessionStorage.loginAttempt == "1" && user !== undefined){
		alert("Connection réussite! Vous pouvez accéder à votre profile")
		$scope.showM2=true
		$scope.message2 ="Connection réussite! Vous pouvez accéder à votre profile"
		sessionStorage.loginAttempt = "0"
	}
	else if(sessionStorage.loginAttempt == "1" && user == undefined){
		alert("Connection échouée. Vérifiez que vous écrit votre nom d'utilisateur ou mot de passe correctement")
		//2 types of not workingm!!)
		$scope.showM2=true
		$scope.message2 ="Connection échouée. Vérifiez que vous écrit votre nom d'utilisateur ou mot de passe correctement"
		//2 types of not workingm!!
		//En cas d'oublie 
		sessionStorage.loginAttempt = "0"
	}


},1000)




//Now the redirecting is done server side
$scope.signup =function(){
		$http.post("/signup",$scope.sign)

		var myF = function(){
				sessionStorage.setItem("loginMessage","hey")
				sessionStorage.signUpAttempt = "1"
				location.reload()
		}
		myF()
		
}

$scope.login = function(){
	$http.post("/login",$scope.sign)

	var myF= function(){
				sessionStorage.setItem("loginMessage","hey")
				sessionStorage.loginAttempt = "1"
				location.reload() 
	}
	myF()
		

}

$scope.facebookAuthen=function(){
	 $window.location.href="/auth/facebook"
}
 

$scope.googleAuthen = function(){

	 $window.location.href="/auth/google"
}


}])




