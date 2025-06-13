const axios = require('axios')
const Book = require('../models/bookModelSchema')
const searchBooks = async (req, res) => {
    const { q, startIndex = 0, maxResults = 10 } = req.query
    
    // If no query, return popular/trending books
    let searchQuery = q || 'fiction'; // Default to fiction books
    
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${startIndex}&maxResults=${maxResults}`);
        
        if (!response.data.items) {
            return res.status(200).json({ books: [], totalItems: 0 });
        }
        
        const books = response.data.items.map((item) => ({
            googleId: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || [],
            description: item.volumeInfo.description || "No description available",
            thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
            publishedDate: item.volumeInfo.publishedDate || "Unknown",
            pageCount: item.volumeInfo.pageCount || 0,
            categories: item.volumeInfo.categories || [],
            averageRating: item.volumeInfo.averageRating || 0,
            previewLink: item.volumeInfo.previewLink || "",
            infoLink: item.volumeInfo.infoLink || ""
        }))
        
  

        return res.status(200).json({ 
            books, 
            totalItems: response.data.totalItems,
            hasMore: (parseInt(startIndex) + parseInt(maxResults)) < response.data.totalItems
        });
    } catch (error) {
        console.log("Google Books API error:", error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

// Get book details by ID
const getBookById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const item = response.data;
        
        const book = {
            googleId: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || [],
            description: item.volumeInfo.description || "No description available",
            thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
            publishedDate: item.volumeInfo.publishedDate || "Unknown",
            pageCount: item.volumeInfo.pageCount || 0,
            categories: item.volumeInfo.categories || [],
            averageRating: item.volumeInfo.averageRating || 0,
            previewLink: item.volumeInfo.previewLink || "",
            infoLink: item.volumeInfo.infoLink || "",
            publisher: item.volumeInfo.publisher || "Unknown",
            language: item.volumeInfo.language || "en"
        };

      // Save to DB if not exist
    const existingBook = await Book.findOne({ googleId: book.googleId });
    if (!existingBook) {
      const newBook = new Book(book);
      await newBook.save();
    }
        
        res.status(200).json({ book });
    } catch (error) {
        console.log("Google Books API error:", error.message);
        res.status(500).json({ msg: "Book not found" });
    }
};

module.exports = { searchBooks, getBookById };