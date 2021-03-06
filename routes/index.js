
module.exports = function(app){

//Getting all our db models
var Produit = require("../models/produit")
var User = require("../models/user")
var Commande = require("../models/commande")
var Comment = require("../models/comment")
var Boutique = require("../models/boutique")
var errorHelper = require('mongoose-error-helper').errorHelper;

//************************************Seller interactions*************

//Les boutiques*************
//Créer une boutique
app.post("/createBoutique",function(req,res){

	var boutique = new Boutique(req.body)
	boutique.save(function(err,data){
		if (err) throw err 
		Boutique.find({vendeurId:req.user._id},function(err,data){
			if(err) throw err
			res.json(data)
		})

	})

})


app.get("/mesBoutiques",function(req,res){
	Boutique.find({vendeurId:req.user._id},function(err,data){
		if (err) throw err
			res.json(data)
	})
})

app.post("/updateBoutiqueLivraison",function(req,res){
	Boutique.find({vendeurId:req.user._id},function(err,data){
		if (err) throw err

		if(data[0] === undefined) //Does this work? Yes :) Very important for removing stuff!
		{
				ans = "Rien à effacer"
		}
		else{
			var boutique = data[0]
			boutique.livraison = req.body

			//Updating the livraison for the products
			Produit.find({vendeurId:req.user._id},function(err,data){
				if(err) throw err
				for(var i=0;i<data.length;i++){
					data[i].livraison = req.body
					data[i].save(function(err){
					})

				}


			})



			boutique.save(function(err,data){
 			if(err) throw err
	 			Boutique.find({vendeurId:req.user._id},function(err,data){
	 				if (err) throw err
	 				res.json(data)
	 			})
 			})
		}


 		
	})
})



//Changer le theme de la boutique:
app.post("/changeBoutiqueTheme",function(req,res){
	
	Boutique.find({_id:req.body.id},function(err,data){
		if(err) throw err
		var boutique = data[0]
		boutique.themeUrl = req.body.url

	    boutique.save(function(err,data){
	    	if(err) throw err
	    	res.json({hey:"good"})
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

//Adding new products to db
app.post("/ajouterProduit",function(req,res){
	var newProduit  = new Produit(req.body)
	newProduit.date = new Date()

	Boutique.find({vendeurId:req.user._id},function(err,data){
		if(err) throw err

		//Adding boutique's livraison to produit (the mongo thingy)
		var boutiqueLivraison = data[0]	
		newProduit.livraison = boutiqueLivraison.livraison

		//Adding contacts of vendeur now

		User.find({_id:req.user._id},function(err,data){
			var contactsVendeur = data[0].moreInfo.numerosDeTelephone
			newProduit.vendeurContacts = contactsVendeur


			newProduit.save(function(err,data){
				if(err) throw err
				Produit.find({vendeurId:req.user._id},function(err,data){
				if (err) throw err
				res.json(data)
				})
			})

		})

		

	})



	
})




//Les produits************

//Modifying Produit
app.post("/modifyProduit",function(req,res){

	Produit.find({_id:req.body._id},function(err,data){

		if (err) throw err
			
	  		//it cant save because the new object req.body doesnt have tht function?
	  		var produit = data[0]
	  		//Modification fields
	  		produit.nom = req.body.nom
	  		produit.type = req.body.type
	  		produit.prix = req.body.prix
	  		produit.details = req.body.details
	  	
	  		
	  	
	  		produit.save(function(err,data){
	  			if(err) throw err

	  			Produit.find({_id:req.body._id},function(err,data){
  					res.json(data[0])
  				})

	  		})


	});

})




//Effacer un produit
app.post("/effacerProduit",function(req,res){
	var ans

	Produit.find({_id:req.body.id},function(err,data){
		if(err) throw err
		
		if(data[0] === undefined) //Does this work? Yes :) Very important for removing stuff!
		{
				ans = "Rien à effacer"
		}
		else{

			//First you remove
			data[0].remove(function(err){if (err) throw err})

			//Then you erase the comments of the produit
			Comment.find({discussionId:req.body._id},function(err,data){
				if (err) throw err
				if(data[0] === undefined){
					var next = "no comments"
				}
				else {
					data[0].remove(function(err){if (err) throw err})
				}
				
			})

			//Then you send back new updated list of seller's products:
				Produit.find({vendeurId:req.user._id},function(err,data2){
						if(err) throw err
						ans = data2
						res.json(ans)
					})
		

		}
		
	})

	
})


//Adding colors:
app.post("/addColor",function(req,res){
	
	Produit.find({_id:req.body.id},function(err,data){
		if(err) throw err
		var ans
			
		 var produit = data[0]
		if(!produit.colorCodes){
			produit.colorCodes = []
			
			produit.colorCodes.push(req.body.color) 
			produit.save(function(err){
			if (err) throw err
				Produit.find({_id:req.body.id},function(err,data){
					if(err) throw err
					ans = data
				})
			})
		}
		else{
			produit.colorCodes.push(req.body.color) 
			produit.save(function(err){
			if (err) throw err
				Produit.find({_id:req.body.id},function(err,data){
					if(err) throw err
					ans = data
				})
			})

		}

		res.json(ans)
		

	})
})

app.post("/removeColor",function(req,res){
	
	Produit.find({_id:req.body.id},function(err,data){
	 	var produit = data[0]
	 	produit.colorCodes.splice(req.body.colorIndex,1)
	 	produit.save(function(err){

	 		if(err) throw err
	 		Produit.find({_id:req.body.id},function(err,data){
	 			if (err) throw err
	 			res.json(data)
	 		})
	 	})

		
		

	})
})

//Add image to product:
app.post("/addImage",function(req,res){
	var produit 
    
    Produit.find({_id:req.body.produitId},function(err,data){
    	
		var produit = data[0]
		produit.imageUrls.push(req.body.url)
    	
    	produit.save(function(err,data){
    	if(err) throw err
    		
    		res.json(data)
    	
    	})
		
	})

      
})


app.post("/newMainImage",function(req,res){

var produit 
	
	Produit.find({_id:req.body.produitId},function(err,data){
		if(err) throw err
		produit = data[0]
		produit.mainImageUrl = req.body.url

		produit.save(function(err,data){
			if(err) throw err
			res.json(data)
		})
	})
})

app.post("/effacerImage",function(req,res){

var produit
	Produit.find({_id:req.body.produitId},function(err,data){
		if(err) throw err
			produit = data[0]
		 	produit.imageUrls.splice(req.body.index,1)

		 	produit.save(function(err,data){
		 		if(err) throw err
		 		res.json(data)
		 	})

	})

})

//*****************************Categories of Boutiques/Produits***************

app.get("/serv_Boutiques",function(req,res){

	Boutique.find({},function(err,data){
		if(err) throw err
		res.json(data)
	})
})


app.post("/boutique",function(req,res){

	Boutique.find({_id:req.body.id},function(err,data){
		if (err) throw err
		res.json(data)
	})
})


app.post("/produit",function(req,res){

	Produit.find({_id:req.body.id},function(err,data){
			if(err) throw err
			res.json(data)
	})

})

app.post("/boutiqueProduits",function(req,res){
		
		Produit.find({boutiqueId:req.body.id},function(err,data){
			if (err) throw err
			res.json(data)
		})

})



app.get("/soinsducorpsProduits",function(req,res){
	Produit.find({type:"soinsducorps"},function(err,data){
		if(err) throw err
		res.json(data)
	})
})

app.get("/soinsdescheuveuxProduits",function(req,res){
	Produit.find({type:"soinsdescheuveux"},function(err,data){
		if(err) throw err
		res.json(data)
	})
})

app.get("/visageetmaquillageProduits",function(req,res){
	Produit.find({type:"visageetmaquillage"},function(err,data){
		if(err) throw err
		res.json(data)
	})
})

//Off or? 
app.get("/parfumsProduits",function(req,res){
	Produit.find({type:"parfums"},function(err,data){
		if(err) throw err
		res.json(data)
	})
})

app.get("/accessoiresProduits",function(req,res){
	Produit.find({type:"accessoires"},function(err,data){
		if(err) throw err
		res.json(data)
	})
})


//********************Social***************************

//Voter pour un produit:
app.post("/newVote",function(req,res){
    
    var ans = {}
    var produit
    Produit.find({_id:req.body._id},function(err,data){
    	if(err) throw err
    	var produit = data[0]
    	produit.votes.push(req.user._id)

		produit.save(function(err){
	    	if(err) throw err

	    	Produit.find({_id:req.body._id},function(err,data2){
            ans.produit = data2[0]

            	User.find(req.user._id,function(err,data){
            		var user = data[0]
            		user.votedFor.push(req.body._id)
            		user.save(function(err){
            			User.find(req.user._id,function(err,data3){
            				ans.user = data3[0]
            				res.json(ans)
            			})
            		})
            	})  
            })


    	})
	})
})


//Take out Vote **Not working well
app.post("/unVote",function(req,res){
	var ans = {}
    var produit
    var done = false

    Produit.find({_id:req.body._id},function(err,data){
    	
    	if(err) throw err
    	var produit = data[0]
var next = function(){  

			produit.save(function(err){
		    	if(err) throw err

		    	Produit.find({_id:req.body._id},function(err,data2){
	            ans.produit = data2[0]

	            	User.find(req.user._id,function(err,data){
	            		var user = data[0]

	            		for(var i=0;i<=user.votedFor.length;i++){
	    					if(user.votedFor[i] === req.body._id){
								user.votedFor = user.votedFor.splice(i,1)//Remove
								done = true
	    					}
	    				}
	            		//Slice : user.votedFor.push(req.body._id)
	            		user.save(function(err){
	            			User.find(req.user._id,function(err,data3){
	            				ans.user = data3[0]
	            				res.json(ans)
	            			})
	            		})
	            	})  
	           })
	    	})
		}

		
    	for(var i=0;i<=produit.votes.length;i++){
    		if(produit.votes[i] === req.user._id ){
    			console.log(produit.votes[i])
				produit.votes = produit.votes.splice(i,1)//Remove
				next()

    		}
    	}

		
    })
})


app.post("/comments",function(req,res){

	Comment.find({discussionId:req.body.discussionId},function(err,data){
		if(err) throw err
		res.json(data)
	})
})


app.post("/postComment",function(req,res){
	var comment = new Comment(req.body)
	comment.save(function(err){

		Comment.find({discussionId:req.body.discussionId},function(err,data){
			if(err) throw err
			res.json(data)
		})
	})

})
    




//**************************Commandes:*************

//Passer la commandes
app.post("/nouvelleCommande",function(req,res){

var commande = new Commande(req.body)
//commande.set('validateBeforeSave', false);
	//Since its complex to add arrays
	//Adding livraison of item ordered
	Boutique.find({_id:req.body.boutiqueId},function(err,data){
		if(err) throw err

		commande.livraison = data[0].livraison

		//adding vendeurContacts:

		User.find({_id:req.body.vendeurId},function(err,data){
			if(err) throw err
			commande.vendeurContacts = data[0].moreInfo.numerosDeTelephone
		
			commande.save(function(err){
				if(err) console.log(err)
				res.json({ans:"Good"})

			})

		})
	})


})

//User gets commandes
app.get("/serv_userCommandes",function(req,res){

	Commande.find({acheteurId:req.user._id},function(err,data){
		if (err) throw err
			res.json(data)
	})

})

//Seller gets Commandes
app.get("/serv_sellerVentes",function(req,res){

	Commande.find({vendeurId:req.user._id},function(err,data){
		if (err) throw err
			res.json(data)
	})

})

app.post("/deliveryConfirmed",function(req,res){

	Commande.find({_id:req.body._id},function(err,data){
		if(err) throw err
		if(data[0] === undefined){

			var ans = {'ok':"nope"}
			
		}
		else{

			data[0].deliveryConfirmed = true
			data[0].save(function(err){
				if(err) throw err
				res.json(ans)
			})


		}
		
	})
})


//Admin stuff

app.get("/getAllProduits",function(req,res){

	Produit.find({},function(err,data){
		if(err) throw err
		res.json(data)
	})
})



app.get("/getAllBoutiques",function(req,res){

	Boutique.find({},function(err,data){
		if(err) throw err
		res.json(data)
	})
})

app.post("/mesProduits2",function(req,res){
	Produit.find({boutiqueId:req.body.id},function(err,data){
		if (err) throw err
		res.json(data)
	})
})




/* var errorHelper = require('mongoose-error-helper').errorHelper;


function (req, res, next) {
    //generate `user` here
    user.save(function (err) {
        //If we have an error, call the helper, return, and pass it `next`
        //to pass the "user-friendly" errors to
        if (err) return errorHelper(err, next);
    }
}*/



//***********************************************


app.get('/boutique/:id', function(req, res, next) {
  res.redirect("/boutiques")
});


/* GET home page. */
app.get('/produit/:id', function(req, res, next) {
    res.redirect("/boutiques")
});



/* GET home page. */
app.get('*', function(req, res, next) {
  res.sendFile("index.html",{root:"views"});
});


}
