const {Schema , model} = require('mongoose')

const likeSchema = new Schema({
     userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    googleId: { type: String, required: true }, // Store Google Books API ID directly
    // Optional: Add timestamps
    createdAt: { type: Date, default: Date.now }
}, {
    // Ensure one user can't like the same book multiple times
    indexes: [
        { userId: 1, googleId: 1 }, // Compound index for faster queries
        { unique: true, fields: ['userId', 'googleId'] } // Unique constraint
    ]
})

const Like = model('Like', likeSchema);
module.exports = Like