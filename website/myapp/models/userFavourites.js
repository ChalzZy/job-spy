const mongoose = require('mongoose')

const userSchemaFav = new mongoose.Schema({
    id:{
        type:String
    },
    jobTitle: {
        type:String
    }
    ,
    company: {
        type:String
    }
    ,
    summary: {
        type:String
    },
    salary: {
        type:String
    },
    locations: {
        type:String
    },
    time: {
        type:String
    },
    link: {
        type:String
    },
    email: {
        type: String
    }

})

// fire a function after doc save to db
userSchemaFav.post('save', function (doc, next) {
    console.log('new fav was created & saved', doc)
})

userSchemaFav.remove('remove', function(doc, next){
    console.log('removed fav')
})

const userFavourites = mongoose.model('userfav', userSchemaFav)
module.exports = userFavourites