import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import path from 'path';
import morgan from 'morgan';


dotenv.config();

connectDB();

const app = express();

// Developement
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());



// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);


// Paypal
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))


// Upload image
const __dirname = path.resolve()
app.use('/frontend/public/images', express.static(path.join(__dirname, '/frontend/public/images')))


// Heroku deployment => Production mode
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
}


// Error handle 
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000;

app.listen(PORT, 
    console.log(`Server running on ${process.env.NODE_ENV} mode port ${process.env.PORT}`.bgYellow.black.underline)
);