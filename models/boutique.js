var mongoose  = require("mongoose")
var Schema = mongoose.Schema

var boutique = new Schema({
nom:String,
vendeur:String,
vendeurId:String,
livraison:{
			//Les types de livraison  : gratuit, fixe, contactez
		   gratuite:String,
		   payanteFixe:{lieux:String,prix:Number},
		   contactez:String
		   },
imageUrls:[String],
mainImageUrl:String,
themeUrl:String,
votes:[String] //Logs in user Ids ,The num will be given by num of users who voted
})


module.exports = mongoose.model("boutique",boutique)