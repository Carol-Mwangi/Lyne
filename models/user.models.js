const mongoose = require('mongoose');
const userSchema = mongoose.Schema({

        fname: {
            type : String,
            required : true
        },
        lname: {
            type : String,
            required : true
        },
        email: {
            type : String,
            required : true
        },
        gender: {
            type : String,
            required : true
        },
        createPassword: {
            type : String,
            required : true
        },


    });

    const User =mongoose.model('User', userSchema);

    module.export = User;
    
    
    