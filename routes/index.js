
module.exports = function(app){

//Getting all our db models
var Produit = require("../models/produit")



//Adding new products to db
app.post("/ajouterProduit",function(req,res){
	var newProduit = new Produit(req.body)
	newProduit.date= new Date()
	newProduit.save(function(err,data){
		if(err) throw err
			Produit.find({vendeurId:req.user._id},function(err,data){
			if (err) throw err
			res.json(data)
			})
	})
})

//Getting lists of products available in the store of the logged in user
app.get("/mesProduits",function(req,res){
	Produit.find({vendeurId:req.user._id},function(err,data){
		if (err) throw err
		res.json(data)
	})
})

//Effacer un produit
app.post("/effacerProduit",function(req,res){
	
	Produit.find(req.body,function(err,data){
		if(err) throw err
		//First you remove
		data[0].remove(function(err){if (err) throw err})
		//Then you send back new updated list of seller's products:
			Produit.find({vendeurId:req.user._id},function(err,data2){
					if(err) throw err
					res.json(data2)
				})



	})

	
})


/*Getting all the products for the front page
app.get("/tousProduits",function(req,res){
	Produit.find({},function(err,data){
		if (err) throw err
		res.json(data)
	})

})
*/
//Getting the soins du corps produits
app.get("/soinsDuCorpsProduits",function(req,res){
	Produit.find({type:"Soins_du_corps"},function(err,data){
		if(err) throw err
		res.json(data)
	})
})


//Add image to product:
app.post("/addImage",function(req,res){
	var produit 
    Produit.find({_id:req.body.produitId},function(err,data){
    	console.log(data[0])
		var produit = data[0]
		produit.imageUrls.push(req.body.url)
    	
    	produit.save(function(err,data){
    	if(err) throw err
    		 Produit.find({vendeurId:req.user._id},function(err,data){
			if (err) throw err
			res.json(data)
	         })
    	})
		
	})

      
})




/* GET home page. */
app.get('*', function(req, res, next) {
  res.sendFile("index.html",{root:"views"});
});


}
