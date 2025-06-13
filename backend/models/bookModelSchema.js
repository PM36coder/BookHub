const {Schema , model } = require('mongoose')

const  bookSchema = new Schema({
    googleId: { type: String, required: true, unique: true },
  title: String,
  authors: [String],
  description: String,
  thumbnail: String,
  publishedDate: String,
  pageCount: Number,
  categories: [String],
  averageRating: Number,
  previewLink: String,
  infoLink: String,
  publisher: String,
  language: String
}, { timestamps: true });


const Book = model('Book', bookSchema);

module.exports = Book;