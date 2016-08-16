var app = angular.module("AfriBelle",["ngRoute"],function($httpProvider){
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */ 
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for(name in obj) {
      value = obj[name];

      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
})



app.config(function($routeProvider,$locationProvider){

$routeProvider

.when("/",{
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
})
. 
when("/boutique/:id",{  //Fix naming later!!
	controller:"boutiquePage",
	templateUrl:"templates/boutiquePage.html"
}) 
//Vitrines
.when("/boutiques",{
	controller:"boutiques",
	templateUrl:"templates/boutiques.html"
})
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
})
//Names ofcontrollers can have Caps but for the href and the templateUrl dont
.when("/parfums",{
	controller:"vitrine",
	templateUrl:"templates/vitrine.html"
})
.when("/accessoires",{
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
.when("/myBoutique",{
	controller:"myBoutique",
	templateUrl:"templates/myBoutique.html"
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




