app.controller("AcceuilleController",["$scope","$location","$window","$http","authen",
	function($scope,$location,$window,$http,authen){


	$scope.navBarHide = true
	$scope.navBarToggle = function(){
		$scope.navBarHide = !$scope.navBarHide 
	}

	$scope.imgAlt = "Image de l'article en charge. Si ce message persiste, veuillez rafraichir la page ou vérifier que votre connection à internet fonctionne correctement."
//***************  Panier********************************************

//Content to the child controller: panier.js
$scope.panier = []
$scope.panierDetails = {}


//If theres something in the storage cart, give it to cart
if(sessionStorage.panier)
{
$scope.panier = JSON.parse(sessionStorage.getItem("panier"))
}

//****************User Data and functions**************************


//Is userAuthenticated? To hide/show buttons:))
$scope.isAuthen
authen.isAuthen($scope)

//User data
$scope.user={}
authen.getUserInfo($scope)


//To logout of user session
$scope.logout = authen.logout //dont put () or else it will execute function


//**********************Shared functionality*************************
//Page produit 
//The id is angular giventhats why therefresh looks like that. Do some nodejs something
//bout that

//Erasing comments?


//Pas Plus de phots(4 par produit)
//Pictures

//Acceuille
//Photos qui défilent
//Authen --definately fb

//Commandes: What happens after order is passed

//Production:
//Mongo, Heroku, Ospry 
//Hide Angularjs and code
//Testing

//Livraison:zone
//Nombres de produits

//Promo page

//La cliente doit confirmer ---avant que la vendeuse recoivent
//Delivery limit
//La vendeuse doit deliver IN TIME!! 

/*

-Betina's Cousin
-Faikat's Mom
-Sarah's Sister
-Amah's mom
Get list of friends!!
Piero's Sister---
Piero: Brings customers:

Customers

Blessing-Customer

****Cliente

-Livraison a la maison
-Contacter la cliente
-Retour Policy***:
Days pour signaler
-Shop like --- more choice
-


****Vendeuse
-Louer un mall/magasin
Moins cher
-Abidjanwide customers 
-High Profit
-Specialised-- Regroupé. 
-Facebook: une page, beaucoup de jaimes au moins 1000 et promouvoir toujours
			a la fun ca deviens plus cher
Groupes facebook: Moins de focus on the product
				Moins de clientele
				Plus proféssionel 









*/


}])

