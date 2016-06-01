// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '136188760121154', // your App ID
        'clientSecret'  : '6264f3a074cd13488e7ebb09610173e0', // your App Secret
        'callbackURL'   : 'http://bintou.herokuapp.com/auth/facebook/callback',
         "profileFields": ['id', 'emails', 'name'] //This
    }, //http://localhost:3000/auth/facebook/callback

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};