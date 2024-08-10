const express = require('express');
const connectDB = require('../db/config');
const authRoutes = require('../routes/auth.route');
const bookRoutes = require('../routes/book.route');
const cors = require('cors')
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cors())

// app.use('/',(req,res)=>{
//   res.send('Welcome to My Bookstore API');
//  });

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

app.listen(8080, async() => {
// await connectDB();
  console.log('Server running on port 8080')
}
);
