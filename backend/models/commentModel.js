const {Schema , model} = require('mongoose')

const commentSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},  // User zaroori hai
    bookId: {type: Schema.Types.ObjectId, ref: 'Book', required: true},  // Book bhi zaroori hai
    text: {type: String, required: true, trim: true}  // Comment text
}, {timestamps: true})

const Comment = model('Comment', commentSchema);  

module.exports = Comment 