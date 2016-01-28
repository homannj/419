"use strict";
const restful = require("node-restful");
const mongoose = restful.mongoose;
const bcrypt   = require('bcrypt-nodejs');

// Export model
module.exports = restful.model('Users',
    new mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true,
            dropDups: true
        },
        passwordhash: {
            type: String,
            required: true
        },
        isSuperAdmin: Boolean
    }), 'Users'
);

// methods ======================
// generating a hash
// userSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// checking if password is valid
// userSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };

// create the model for users and expose it to our app
// module.exports = mongoose.model('User', userSchema);
