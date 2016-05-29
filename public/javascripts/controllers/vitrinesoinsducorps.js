app.controller("vitrinesoinsducorps",
	["$scope","$http","$location","$window",function($scope,$http,$location,$window)
{

$scope.produits

$http.get("/tousProduits").success(function(data){
console.log(data)
$scope.produits = data
})

$scope.ajouterAuPanier = function(index){
$scope.$parent.panier.push($scope.produits[index])
}

//Arriver dans le panier il fautpouvoir choisir ses quantitées
//Chaque section a sa view
//Cliquer sur un produit simple aussi charge la vue du produit! :))
//Il faut donc mettre le mini historique de navigation! Use # to sve their position on the screen


}])