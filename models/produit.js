var mongoose  = require("mongoose")
var Schema = mongoose.Schema

var produit = new Schema({
nom:String,
type:String,//soins_du_corps
details:String,
prix:Number,
livraison:Boolean,
date:Date,
image:[String],
vendeur:String,
vendeurId:String,
vendeurContacts:Array,
imageUrls:[String],
mainImageUrl:String,
votes:[String] //The num will be given by num of users who voted
})


module.exports = mongoose.model("produit",produit)