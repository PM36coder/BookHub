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
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow credentials if needed
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
