module.exports = function(app,passport){

 //Comment
var User = require("../models/user.js")
var mongoose = require("mongoose")
 //Limit the amt of info sent as user info! we dont want username or password stuffs

//***************************Authentication*******************
// Local Signup
   app.post("/signup", passport.authenticate('local-signup'),function(req,res){

                res.json({hi:"hi"})
                console.log("working")
            }
    )

// Local Signup
    app.post("/login", passport.authenticate('local-login'),function(req,res){
            console.log("did")
            res.redirect("*");
    }
)
// FACEBOOK ROUTES
    
    //facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',  //Change the callback b4 deploy
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));



// =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));













// LOGOUT
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });



//*******************************Sending to services***********
// PROFILE SECTION
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
 
//Checking if user id authenticated
    app.get("/isAuthen",function(req,res){
        var ans
        if(req.user){
          ans = true
        }
        else{
          ans= false
        }

        res.json(ans)
    })


//Getting user data
    app.get('/userinfo_serv',isLoggedIn,function(req,res){
      //We copy the user databut take out password
      var ans = req.user
      ans.local.password = ""

      res.json(ans)   
    });

//********************************************Modyfing user*****************


app.post("/newNomComplet",function(req,res){

    User.find({_id:req.user.id},function(err,data){
        if(err) throw err
        var user = data[0]
        user.moreInfo.nomComplet = req.body.nomComplet

        user.save(function(err){

            User.find({_id:req.user.id},function(err,data){
                if (err) throw err
                res.json(data[0])
            })
        })
    })

})


app.post("/newUserTelephone",function(req,res){
    var user
    User.find({_id:req.user._id},function(err,data){
        if(err) throw err
        user = data[0]
        user.moreInfo.numerosDeTelephone.push(req.body.telephone)
        user.save(function(err){
            User.find({_id:req.user._id},function(err,data){
                if (err) throw err
                res.json(data[0])
            })
        })

    })
})

app.post("/removeUserTelephone",function(req,res){
    var user
    User.find({_id:req.user._id},function(err,data){
        if(err) throw err
        user = data[0]
      
        user.moreInfo.numerosDeTelephone.splice(req.body.indice,1)
       
       
        user.save(function(err){
            User.find({_id:req.user._id},function(err,data){
                if (err) throw err
                res.json(data[0])
            })
        })

    })
})

app.post("/changeAvatar",function(req,res){

    User.find({_id:req.user._id},function(err,data){
//if there's no user?
        if (err) throw err
        var user = data[0]
        user.moreInfo.profilePic = req.body.url

        user.save(function(err){

            if (err) throw err
            User.find({_id:req.user._id},function(err,data){
                if (err) throw err
                res.json(data[0])
            })
         })
   

    })

})




// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

}