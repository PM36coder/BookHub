const Bookshelf = require("../models/bookShelfModel");

const toggleBookshelf = async (req, res) => {
  const userId = req.user.userId;
  console.log("ToggleBookshelf called");
  console.log("req.user:", req.user);
  console.log("req.body:", req.body);
  
  const { googleId, title, authors, thumbnail, description, pageCount, averageRating, previewLink, infoLink } = req.body;

  if (!googleId || !title) {
    return res.status(400).json({ msg: "googleId and title are required" });
  }

  try {
    let bookshelf = await Bookshelf.findOne({ userId: userId });

    if (!bookshelf) {
      bookshelf = new Bookshelf({ userId: userId, books: [] });
    }

    const alreadySaved = bookshelf.books.some(b => b.googleId === googleId);

    if (alreadySaved) {
      // Remove book
      bookshelf.books = bookshelf.books.filter(b => b.googleId !== googleId);
      await bookshelf.save();
      return res.status(200).json({ msg: "Book removed from bookshelf" });
    } else {
      // Add book with complete data
      bookshelf.books.push({ 
        googleId,
        title,
        authors: authors || [],
        thumbnail: thumbnail || '',
        description: description || '',
        pageCount: pageCount || 0,
        averageRating: averageRating || 0,
        previewLink: previewLink || '',
        infoLink: infoLink || ''
      });
      await bookshelf.save();
      return res.status(200).json({ msg: "Book added to bookshelf" });
    }
  } catch (error) {
    console.log("toggleBookshelf error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

const getBookshelf = async (req, res) => {
  const userId = req.user.userId;
  try {
    const bookshelf = await Bookshelf.findOne({ userId: userId }); // Fixed: was 'user' instead of 'userId'
    res.status(200).json({ 
      books: bookshelf?.books || [],
      count: bookshelf?.books?.length || 0
    });
  } catch (error) {
    console.log("getBookshelf error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { toggleBookshelf, getBookshelf };