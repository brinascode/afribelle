var mongoose = require("mongoose")
var bcrypt = require("bcrypt-nodejs")
var Schema = mongoose.Schema
//Make distinction btw email and username
var userSchema = new Schema({
    local            : {
        username     : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    moreInfo         : { 
        vendeur     : Boolean, //Everybody is false by default. I change the vendeurs to true.
        numerosDeTelephone:Array,
        nomComplet :String,
        profilePic:String

    },
    votedFor        : [String],
    boutiques       : 
                    [
                        {
                        nom:String,
                        id:String
                        }
                    ]

})


userSchema.methods.generateHash = function(password){
 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}


userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User",userSchema) 