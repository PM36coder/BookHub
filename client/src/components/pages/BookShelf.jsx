import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../store/AuthContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { BookOpen,  Trash2,  } from "lucide-react";
import { toast } from "react-toastify";

export const BookshelfPage = () => {
  const { token } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookshelf();
  }, []);

  const fetchBookshelf = async () => {
    try {
      const res = await axios.get(
        "https://bookhub-backend.onrender.com/user/bookshelf/get-books",
        { headers: { Authorization: `Bearer ${token}` },
      withCredentials: true, }
      );
      
      setBooks(res.data.books);
    } catch (err) {
      console.log("Error fetching bookshelf:", err.message);
      toast.error("Failed to load bookshelf");
    } finally {
      setLoading(false);
    }
  };

  const removeFromBookshelf = async (book) => {
    try {
      await axios.post(
        "https://bookhub-backend.onrender.com/user/bookshelf/save-book",
        { googleId: book.googleId, title: book.title },
        { headers: { Authorization: `Bearer ${token}` } ,
        withCredentials: true,}
      );
      setBooks(books.filter(b => b.googleId !== book.googleId));
      toast.success("Book removed from bookshelf");
    } catch (error) {
        console.log('error removing book from bookshelf:', error.msg);
      toast.error("Failed to remove book");
    }
  };

  const readBook = (book) => {
    if (book.previewLink) {
      window.open(book.previewLink, "_blank");
    } else if (book.infoLink) {
      window.open(book.infoLink, "_blank");
    } else {
      toast.info("No preview available for this book");
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12">Loading bookshelf...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2">My Bookshelf</h2>
        <p className="text-gray-600">Your saved books ({books.length})</p>
      </motion.div>

      {books.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Your bookshelf is empty
          </h3>
          <p className="text-gray-500">Start saving books to read later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <motion.div
              key={book.googleId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {book.thumbnail && (
                <img
                  src={book.thumbnail.replace("http:", "https:")}
                  alt={book.title}
                  className="w-full h-64 object-cover"
                />
              )}
              
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800">
                  {book.title}
                </h3>
                
                <p className="text-sm text-blue-600 mb-2">
                  {book.authors?.join(", ")}
                </p>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {book.description?.slice(0, 120)}
                  {book.description?.length > 120 ? "..." : ""}
                </p>

                <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                  <span>{book.pageCount} pages</span>
                  {book.averageRating > 0 && (
                    <span>★ {book.averageRating}</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => readBook(book)}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition text-sm flex items-center justify-center gap-1"
                  >
                    <BookOpen size={14} />
                    Read
                  </button>
                  
                  <button
                    onClick={() => removeFromBookshelf(book)}
                    className="bg-red-100 text-red-700 px-3 py-2 rounded-md hover:bg-red-200 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};