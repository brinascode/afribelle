
module.exports = function(app){

//Getting all our db models
var Produit = require("../models/produit")
var User = require("../models/user")
var Commande = require("../models/commande")
var Comment = require("../models/comment")

//************************************Seller interactions*************

//Getting lists of products available in the store of the logged in user
app.get("/mesProduits",function(req,res){
	Produit.find({vendeurId:req.user._id},function(err,data){
		if (err) throw err
		res.json(data)
	})
})

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

//Modifying Produit
app.post("/modifyProduit",function(req,res){

	Produit.findOneAndUpdate({_id:req.body._id}, req.body, function(err,produit) {
  		if (err) throw err;

  		Produit.find({_id:req.body._id},function(err,data){
  			res.json(data[0])
  		})
 		
	});

})



//Effacer un produit
app.post("/effacerProduit",function(req,res){
	var ans

	Produit.find(req.body,function(err,data){
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

//*****************************Categories of Produits
app.post("/produit",function(req,res){

	Produit.find({_id:req.body.id},function(err,data){
			if(err) throw err
			res.json(data)
	})

})



app.get("/soinsducorpsProduits",function(req,res){
	Produit.find({type:"Soins_du_corps"},function(err,data){
		if(err) throw err
		res.json(data)
	})
})

app.get("/soinsdescheuveuxProduits",function(req,res){
	Produit.find({type:"Soins_des_cheuveux"},function(err,data){
		if(err) throw err
		res.json(data)
	})
})

app.get("/visageetmaquillageProduits",function(req,res){
	Produit.find({type:"Visage_et_maquillage"},function(err,data){
		if(err) throw err
		res.json(data)
	})
})

app.get("/parfumsProduits",function(req,res){
	Produit.find({type:"Parfum"},function(err,data){
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


app.post("/produitComments",function(req,res){

	Comment.find(req.body,function(err,data){
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
	commande.save(function(err){
		if(err) throw err

		Commande.find({},function(err,data){
			if (err) throw err
			res.json(data) //What to do here
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





//***********************************************


/* GET home page. */
app.get('*', function(req, res, next) {
  res.sendFile("index.html",{root:"views"});
});


}
