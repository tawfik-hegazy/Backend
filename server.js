const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const cors=require('cors')
dotenv.config(); 

const app = express();
app.use(cors({
  origin: "*"
}))
 
connectDB();

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads/users')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads/courses')));


const userRouter = require('./routes/user.routes');
const courseRouter = require('./routes/course.routes');
const contactRouter=require('./routes/contact.routes')

app.use('/users', userRouter);      
app.use('/courses', courseRouter);   
app.use('/contact', contactRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server is running `);
});
