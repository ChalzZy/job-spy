// Enforces a user schema on the mongoose database
// Also manages dataflow

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, require: true, unique: true }, // username must be unique
        password: { type: String, required: true }
    },
    { collection: 'users' }
) 

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model