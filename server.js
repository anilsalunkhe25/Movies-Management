import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import movieRoutesV1 from './routes/v1/movieRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mount Versioned API Routes
app.use('/api/v1/movies', movieRoutesV1);

// Root route handler
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'Welcome to the Movie Management API',
    documentation: '/api/v1/movies'
  });
});

app.post('/', async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    
    res.status(201).json({
      success: true,
      message: 'Movie added successfully',
      data: savedMovie
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add movie record',
      error: error.message
    });
  }
});

app.put('/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Movie updated successfully',
      data: updatedMovie
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update movie record',
      error: error.message
    });
  }
});



// Database Connection & Server Startup
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });