const mongoose = require('mongoose')

var User = new mongoose.Schema({
    favorites: [{
        whatHaveYou: String,
    }]
})

const user_fav = mongoose.model('favourites', User)

module.exports = user_fav