var app = angular.module("AfriBelle",["ngRoute"])



app.config(function($routeProvider,$locationProvider){

$routeProvider

.when("/acceuille",{
controller:"AcceuilleController", //This controller is at the same time the page controller
templateUrl:"templates/acceuille.html"
})
.when("/panier",{
	controller:"Panier",
	templateUrl:"templates/panier.html"
}).
when("/produit/:id",{  //Fix this later!!
	controller:"produit",
	templateUrl:"templates/produit.html"
}) //Vitrines
.when("/soinsducorps",{
	controller:"vitrine",
	templateUrl:"templates/vitrine.html"
})
.when("/soinsdescheuveux",{
	controller:"vitrine", 
	templateUrl:"templates/vitrine.html"
})
.when("/visageetmaquillage",{
	controller:"vitrine",
	templateUrl:"templates/vitrine.html"
})//Names ofcontrollers can have Caps but for the href and the templateUrl dont
.when("/parfums",{
	controller:"vitrine",
	templateUrl:"templates/vitrine.html"
})
//Authen
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
.when("/sellerVentes",{
	controller:"sellerVentes",
	templateUrl:"templates/sellerVentes.html"
})
.when("/userCommandes",{
	controller:"userCommandes",
	templateUrl:"templates/userCommandes.html"
})




.otherwise({redirectTo:"/acceuille"})



$locationProvider.html5Mode(true)
})



