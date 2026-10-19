import express from 'express';
import Movie from '../../models/Movie.js';

const router = express.Router();

/**
 * @route   POST /api/v1/movies
 * @desc    Add a new movie record
 */
router.post('/', async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json({
      success: true,
      message: 'Movie created successfully',
      data: savedMovie
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create movie record',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/v1/movies
 * @desc    Display all movies (with optional query filters like genre or year)
 */
router.get('/', async (req, res) => {
  try {
    const { genre, releaseYear, search } = req.query;
    let query = {};

    if (genre) {
      query.genre = { $regex: new RegExp(genre, 'i') };
    }
    if (releaseYear) {
      query.releaseYear = releaseYear;
    }
    if (search) {
      query.title = { $regex: new RegExp(search, 'i') };
    }

    const movies = await Movie.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching movies',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/v1/movies/:id
 * @desc    Display a single movie by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    res.status(200).json({ success: true, data: movie });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid Movie ID format', error: error.message });
  }
});

/**
 * @route   PUT /api/v1/movies/:id
 * @desc    Update an existing movie record completely or partially
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
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

/**
 * @route   DELETE /api/v1/movies/:id
 * @desc    Delete a movie record
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Movie deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to delete movie record',
      error: error.message
    });
  }
});

export default router;