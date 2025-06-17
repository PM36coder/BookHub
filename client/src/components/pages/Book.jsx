/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../store/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import { 
  Search, 
  BookOpen, 
  Heart, 
  Loader, 
  Bookmark, 
  Star,
  Filter,
  Grid3X3,
  List,
  TrendingUp,
  Sparkles
} from "lucide-react";
import { toast } from "react-toastify";

export const Book = () => {
  const { token, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [error, setError] = useState("");
  const [like, setLike] = useState({});
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Books", icon: "📚" },
    { id: "fiction", name: "Fiction", icon: "🏰" },
    { id: "non-fiction", name: "Non-Fiction", icon: "🧠" },
    { id: "mystery", name: "Mystery", icon: "🔍" },
    { id: "romance", name: "Romance", icon: "💕" },
    { id: "sci-fi", name: "Sci-Fi", icon: "🚀" },
    { id: "biography", name: "Biography", icon: "👤" }
  ];

  // Like functionality
  useEffect(() => {
    const storedLikes = localStorage.getItem("likedBooks");
    if (storedLikes) {
      setLike(JSON.parse(storedLikes));
    }
  }, []);

  const handleLikeButton = (bookId, bookTitle) => {
    const isLiked = !like[bookId];
    const updatedLikes = { ...like, [bookId]: isLiked };

    setLike(updatedLikes);
    localStorage.setItem("likedBooks", JSON.stringify(updatedLikes));

    if (isLiked) {
      toast.success(`❤️ ${bookTitle} added to favorites!`);
    } else {
      toast.info(`Removed ${bookTitle} from favorites`);
    }
  };

  // Load initial books when component mounts
  useEffect(() => {
    loadInitialBooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadInitialBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://bookhub-backend.onrender.com/user/book/search?maxResults=12`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBooks(res.data.books);
      setHasMore(res.data.hasMore);
      setStartIndex(12);
    } catch (err) {
      console.log("Error fetching initial books:", err.message);
      setError("Failed to load books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const searchBooks = async () => {
    if (!query.trim() && selectedCategory === "all") return;
    setLoading(true);
    setError("");
    setStartIndex(0);

    try {
      const searchQuery = query || selectedCategory;
      const res = await axios.get(
        `https://bookhub-backend.onrender.com/user/book/search?q=${searchQuery}&maxResults=12`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBooks(res.data.books);
      setHasMore(res.data.hasMore);
      setStartIndex(12);
    } catch (err) {
      console.log("Error searching books:", err.message);
      setError("Failed to search books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreBooks = async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    try {
      // Use current query if exists, otherwise use selected category, fallback to "fiction"
      let searchQuery = query;
      if (!searchQuery && selectedCategory !== "all") {
        searchQuery = selectedCategory;
      }
      if (!searchQuery) {
        searchQuery = "fiction";
      }

      const res = await axios.get(
        `https://bookhub-backend.onrender.com/user/book/search?q=${searchQuery}&startIndex=${startIndex}&maxResults=12`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBooks((prev) => [...prev, ...res.data.books]);
      setHasMore(res.data.hasMore);
      setStartIndex((prev) => prev + 12);
    } catch (err) {
      console.log("Error loading more books:", err.message);
      setError("Failed to load more books.");
    } finally {
      setLoadingMore(false);
    }
  };

  const toggleBookshelf = async (book) => {
    try {
      const res = await axios.post(
        "https://bookhub-backend.onrender.com/user/bookshelf/save-book",
        { 
          googleId: book.googleId,
          title: book.title,
          authors: book.authors,
          thumbnail: book.thumbnail,
          description: book.description,
          pageCount: book.pageCount,
          averageRating: book.averageRating,
          previewLink: book.previewLink,
          infoLink: book.infoLink
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (res.data.msg === "Book added to bookshelf") {
        toast.success("📚 Book saved to your library!");
      } else {
        toast.info("Book removed from your library");
      }
    } catch (err) {
      console.log("Error toggling bookshelf:", err.message);
      toast.error("Failed to update bookshelf.");
    }
  };

  const handleReadBook = (book) => {
    if (book.previewLink) {
      window.open(book.previewLink, "_self");
    } else if (book.infoLink) {
      window.open(book.infoLink, "_self");
    } else {
      navigate(`/book/${book.googleId}`, { state: { book } });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchBooks();
    }
  };

  const handleCategorySelect = async (categoryId) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    setError("");
    setStartIndex(0);

    try {
      if (categoryId === "all") {
        // Load initial books without any query
        const res = await axios.get(
          `https://bookhub-backend.onrender.com/user/book/search?maxResults=12`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBooks(res.data.books);
        setHasMore(res.data.hasMore);
        setStartIndex(12);
        setQuery(""); // Clear search query
      } else {
        // Search with category as query
        const res = await axios.get(
          `https://bookhub-backend.onrender.com/user/book/search?q=${categoryId}&maxResults=12`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBooks(res.data.books);
        setHasMore(res.data.hasMore);
        setStartIndex(12);
        setQuery(""); // Clear search query but keep category selected
      }
    } catch (err) {
      console.log("Error fetching category books:", err.message);
      setError("Failed to load books for this category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Modern Header with Gradient */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Discover Amazing Books
            </h1>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-8"
            >
              <Sparkles className="h-8 w-8 text-yellow-400" />
            </motion.div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore millions of books, find your next favorite read, and join a community of book lovers
          </p>
        </motion.div>

        {/* Enhanced Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          {/* Search Bar */}
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full bg-white/80 backdrop-blur-sm border-2 border-gray-200 px-12 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg placeholder-gray-500 shadow-lg"
                placeholder="Search for books, authors, genres, or topics..."
              />
              <button
                onClick={searchBooks}
                disabled={loading}
                className="absolute right-2 top-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 shadow-lg"
              >
                {loading ? <Loader className="animate-spin h-5 w-5" /> : "Search"}
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 font-medium ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-medium">
                {books.length} books found
              </span>
              {books.length > 0 && (
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <TrendingUp className="h-4 w-4" />
                  <span>Popular picks</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-md">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl mb-6 shadow-md"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="font-medium">{error}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                <Loader className="h-12 w-12 text-blue-600" />
              </motion.div>
              <p className="mt-4 text-xl text-gray-600">Discovering amazing books for you...</p>
            </div>
          </div>
        )}

        {/* Books Display */}
        {!loading && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                  : "space-y-6"
              }
            >
              {books.map((book, index) => (
                <motion.div
                  key={`${book.googleId}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className={
                    viewMode === "grid"
                      ? "group bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-white/20"
                      : "group bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-white/20 flex"
                  }
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Book Image */}
                  {book.thumbnail && (
                    <div className={viewMode === "grid" ? "relative overflow-hidden" : "relative overflow-hidden w-32 flex-shrink-0"}>
                      <img
                        src={book.thumbnail.replace("http:", "https:")}
                        alt={book.title}
                        className={
                          viewMode === "grid"
                            ? "w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                            : "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        }
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Floating Read Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.button
                          onClick={() => handleReadBook(book)}
                          className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <BookOpen size={16} />
                          Read Now
                        </motion.button>
                      </div>
                    </div>
                  )}

                  {/* Book Content */}
                  <div className={viewMode === "grid" ? "p-6" : "p-6 flex-1"}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-lg text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                        {book.title}
                      </h3>
                      {book.averageRating > 0 && (
                        <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs font-medium text-yellow-700">{book.averageRating}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-blue-600 font-medium mb-2 text-sm">
                      {(book.authors || []).join(", ")}
                    </p>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {book.description?.slice(0, 120)}
                      {book.description?.length > 120 ? "..." : ""}
                    </p>

                    {/* Book Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span className="bg-gray-100 px-2 py-1 rounded-full">
                        {book.pageCount} pages
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleReadBook(book)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 shadow-md"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <BookOpen size={14} />
                        Read
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleLikeButton(book.googleId, book.title)}
                        className={`p-3 rounded-xl transition-all duration-300 ${
                          like[book.googleId]
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart size={14} fill={like[book.googleId] ? "currentColor" : "none"} />
                      </motion.button>
                      
                      <motion.button
                        onClick={() => toggleBookshelf(book)}
                        className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Bookmark size={14} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Load More Button */}
        {!loading && hasMore && books.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <motion.button
              onClick={loadMoreBooks}
              disabled={loadingMore}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 flex items-center gap-3 mx-auto shadow-xl font-medium text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loadingMore ? (
                <>
                  <Loader className="animate-spin h-5 w-5" />
                  Loading more amazing books...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Discover More Books
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* No Books Message */}
        {!loading && books.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl max-w-md mx-auto">
              <BookOpen className="mx-auto h-20 w-20 text-gray-400 mb-6" />
              <h3 className="text-2xl font-bold text-gray-700 mb-4">
                No books found
              </h3>
              <p className="text-gray-500 mb-6">
                Try searching for different keywords or explore our categories above
              </p>
              <motion.button
                onClick={loadInitialBooks}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Popular Books
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};