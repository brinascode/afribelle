var mongoose = require("mongoose")
var bcrypt = require("bcrypt-nodejs")
var Schema = mongoose.Schema
//Make distinction btw email and usernam
var userSchema = new Schema({
    local            : {
        email        : String,
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
        prenom:        String,
        nomDeFamille:  String,
        age:           Number,
        pseudo:        String,
        numeroDeTelephones:[Number]
    }

})


userSchema.methods.generateHash = function(password){
 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}


userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User",userSchema) 