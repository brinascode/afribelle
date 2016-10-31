var mongoose  = require("mongoose")
var Schema = mongoose.Schema

var commande = new Schema({

acheteur:String,
acheteurId:String,
acheteurContacts:Array,
date:String,  //Cause as date wont save as object!! Ugh mongoose. Find a way to make it a real date for future anlytics. Or can we unstringify it??
boutique:String,
boutiqueId:String,
vendeur:String,
vendeurId:String,
vendeurContacts:Array,
produitNom:String,
colorChoice:String,
type:String,
quantite:Number,
prix:Number,
livraison:Object, 
thisLivraison:String,
deliveryConfirmed:Boolean


})


module.exports = mongoose.model("commande",commande)

/* $http.post("/nouvelleCommande",commande).success(function(data){console.log(data)})

				}

				*/