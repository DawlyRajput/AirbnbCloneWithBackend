const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    firstName:{
        type: String,
        required :[ true, 'first Name is requires']
    },
    lastName:{
        type: String,
    },
    email:{
        type:String,
      required :[ true, 'first Name is required'],
      unique:true

    },
    password:{
        type:String,
      required :[ true, 'first Name is required'],
     },
     userType:{
        type:String,
        enum:['guest', 'host'],
        default :'guest'
     }

});

module.exports= mongoose.model('User', userSchema);