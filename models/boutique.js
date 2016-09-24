var mongoose  = require("mongoose")
var Schema = mongoose.Schema

var boutique = new Schema({
nom:String,
vendeur:String,
vendeurId:String,
livraison:{
			//Les types de livraison: gratuit, fixe, contactez
		   gratuite:String,
		   payantePrix:Number,
		   payanteLieux:String,
		   contactez:String,
		   date: String
		   },
imageUrls:[String],
mainImageUrl:String,
themeUrl:String,
votes:[String] //Logs in user Ids ,The num will be given by num of users who voted
})


module.exports = mongoose.model("boutique",boutique)