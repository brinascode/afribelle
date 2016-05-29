var app = angular.module("Bintou",["ngRoute"])

app.config(function($routeProvider,$locationProvider){

$routeProvider
.when("/acceuille",{
controller:"AcceuilleController", //This controller is at the same time the page controller
templateUrl:"templates/acceuille.html"
})
.when("/authen",{
	controller:"LogSign",
	templateUrl:"templates/authen.html"
})
.when("/signup",{
	controller:"LogSign",
	templateUrl:"templates/signup.html"
})
.when("/login",{
	controller:"LogSign",
	templateUrl:"templates/login.html"
})
.when("/vitrinesoinsducorps",{
	controller:"vitrinesoinsducorps",
	templateUrl:"templates/vitrinesoinsducorps.html"
})
.when("/panier",{
	controller:"Panier",
	templateUrl:"templates/panier.html"
}).
when("/produit",{
	controller:"Produit",
	templateUrl:"templates/produit.html"
})
.when("/profile",{
	controller:"Profile",
	templateUrl:"templates/profile.html"
})
.when("/userInfo",{
	controller:"userInfo", //This controller is at the same time the template's page controller
	templateUrl:"templates/userInfo.html"
})
.when("/sellerProduits",{
	controller:"sellerProduits",
	templateUrl:"templates/sellerProduits.html"
})
.otherwise({redirectTo:"/acceuille"})


/*
Profile pageis served by the server.
So brings up some little complications:
refreshing

templates load from a full html page
so works on profile causeprofile is delivered by server

*/
$locationProvider.html5Mode(true)
})