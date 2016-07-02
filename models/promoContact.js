var mongoose = require("mongoose")
var Schema = mongoose.Schema


var contact = new Schema ({
nom:String, 
date:Date,
telephone:Number,
message:String
})

module.exports = mongoose.model("contact",contact)

