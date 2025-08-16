const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config(); 

const app = express();

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();

const userRouter = require('./routes/user.routes');
const courseRouter = require('./routes/course.routes');

app.use('/users', userRouter);      
app.use('/courses', courseRouter);   

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server is running `);
});
