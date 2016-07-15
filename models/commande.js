var mongoose  = require("mongoose")
var Schema = mongoose.Schema

var commande = new Schema({


acheteur:String,
acheteurId:String,
acheteurContacts:Array,
date:Date,
boutique:String,
boutiqueId:String,
vendeur:String,
vendeurId:String,
vendeurContacts:Array,
produitNom:String,
type:String,
quantite:Number,
prix:Number,
livraison:String,
detailsLivraison:Object //three types

})


module.exports = mongoose.model("commande",commande)

/* $http.post("/nouvelleCommande",commande).success(function(data){console.log(data)})

				}

				*/