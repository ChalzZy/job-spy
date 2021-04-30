const mongoose = require('mongoose')

const userSchemaFav = new mongoose.Schema({
    item:{
        type:Object
    }
})

const userFavourites = mongoose.model('userfav', userSchemaFav)
module.exports = userFavourites
