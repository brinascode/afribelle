var mongoose  = require("mongoose")
var Schema = mongoose.Schema

var produit = new Schema({
nom:String,
type:String,//soins_du_corps,accessoire,
typeExtra:String,
details:String,
colorCodes:Array, //Cant save as an array! So you must stringify then open 
prix:Number,
livraison:Object,  
date:Date,
quantiteDisponible:Number,
image:[String],
vendeur:String,
vendeurId:String,
visible:Boolean, //not working as expected; so instead, change type of product to random
boutique:String,
boutiqueId:String,
vendeurContacts:Array,
imageUrls:[String],
mainImageUrl:String,
votes:[String] //Logs in user Ids ,The num will be given by num of users who voted
})


module.exports = mongoose.model("produit",produit)