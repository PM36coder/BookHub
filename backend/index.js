require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');
const userRouter = require('./router/userRouter')
const PORT = 2000;
const app = express();
const BookSearch = require('./router/bookSearchRouter')
const likeBook = require('./router/likeRouter')
const commentBook = require('./router/commentRouter')
const bookShelf = require('./router/bookShelfRouter')
const contactRoute = require('./router/contactRouter')
app.use(cors({
  origin: 'https://bookhub4u.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: [
    "Content-Type",        // Needed for JSON, form-data, etc.
    "Authorization",       // For JWT or Bearer tokens
    "Accept"               // Lets client say what it can handle (JSON, HTML, etc.)
  ],
  credentials: true,
}));
app.use(express.json());


app.use("/user", userRouter)
app.use('/user/book' , BookSearch)
app.use('/user',likeBook);
app.use('/user/comment', commentBook)
app.use('/user/bookshelf' , bookShelf)
app.use('/user/', contactRoute)
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
