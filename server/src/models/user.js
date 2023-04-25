const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true,
        set : (value) => {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(value, salt);
            return hash;
        } 
    },
    name : {
        type  : String,
        required : false,
        
    }
})

module.exports = mongoose.model('User',userSchema);