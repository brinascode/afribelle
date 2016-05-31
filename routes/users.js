module.exports = function(app,passport){

 
var User = require("../models/user.js")
var mongoose = require("mongoose")

// =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',  //Change the callback b4 deploy
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));







 //Next:
 //Limit the amt of info sent as user info! we dont want username or password stuffs



    // // process the signup form (all passport stuff)
   app.post('/signup', passport.authenticate('local-signup'),function(req,res){
    res.writeHead(200);
    res.json("Success")
   })

    // process the login form
 // process the login form
    app.post('/login', passport.authenticate('local-login'),function(req,res){
        res.writeHead(200);
  
     res.json("Success")   
    });


    // PROFILE SECTION =====================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
 
    //Client Checking if user id authenticated
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


    //Getting user data when you're sure that user is authenticated
    app.get('/userinfo_serv',isLoggedIn,function(req,res){
      //We copy the user databut take out password
      var ans = req.user
      ans.local.password = ""

      res.json(ans)   
    });








  
    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}