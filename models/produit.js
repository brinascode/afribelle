var mongoose  = require("mongoose")
var Schema = mongoose.Schema

var produit = new Schema({
nom:String,
type:String,//soins_du_corps,accessoire,
typeExtra:String,
details:String,
prix:Number,
livraison:{
		   //Les types de livraison: gratuit, fixe, contactez
		   gratuite:String,
		   payantePrix:Number,
		   payanteLieux:String
		   },
date:Date,
quantiteDisponible:Number,
image:[String],
vendeur:String,
vendeurId:String,
boutique:String,
boutiqueId:String,
vendeurContacts:Array,
imageUrls:[String],
mainImageUrl:String,
votes:[String] //Logs in user Ids ,The num will be given by num of users who voted
})


module.exports = mongoose.model("produit",produit)