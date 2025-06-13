const {Schema , model} = require('mongoose')

const bookShelfSchema = new Schema({
    userId : {type : Schema.Types.ObjectId, ref: 'User', required: true},
   books: [{ 
        googleId: { type: String, required: true },
        title: { type: String, required: true },
        authors: [{ type: String }],
        thumbnail: { type: String },
        description: { type: String },
        pageCount: { type: Number },
        averageRating: { type: Number },
        previewLink: { type: String },
        infoLink: { type: String },
        addedAt: { type: Date, default: Date.now }
    }]
})

const Bookshelf = model("Bookshelf" , bookShelfSchema);
module.exports = Bookshelf