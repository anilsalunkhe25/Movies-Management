import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from './models/Movie.js';

dotenv.config();

const sampleMovies = [
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    genre: ["Crime", "Drama"],
    releaseYear: 1972,
    rating: 9.2,
    durationMinutes: 175
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    genre: ["Action", "Crime", "Drama"],
    releaseYear: 2008,
    rating: 9.0,
    durationMinutes: 152
  },
  {
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    genre: ["Crime", "Drama"],
    releaseYear: 1994,
    rating: 8.9,
    durationMinutes: 154
  },
  {
    title: "Inception",
    director: "Christopher Nolan",
    genre: ["Action", "Sci-Fi", "Thriller"],
    releaseYear: 2010,
    rating: 8.8,
    durationMinutes: 148
  },
  {
    title: "Fight Club",
    director: "David Fincher",
    genre: ["Drama"],
    releaseYear: 1999,
    rating: 8.8,
    durationMinutes: 139
  },
  {
    title: "Forrest Gump",
    director: "Robert Zemeckis",
    genre: ["Drama", "Romance"],
    releaseYear: 1994,
    rating: 8.8,
    durationMinutes: 142
  },
  {
    title: "Interstellar",
    director: "Christopher Nolan",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    releaseYear: 2014,
    rating: 8.7,
    durationMinutes: 169
  },
  {
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    genre: ["Action", "Sci-Fi"],
    releaseYear: 1999,
    rating: 8.7,
    durationMinutes: 136
  },
  {
    title: "Parasite",
    director: "Bong Joon Ho",
    genre: ["Drama", "Thriller", "Comedy"],
    releaseYear: 2019,
    rating: 8.5,
    durationMinutes: 132
  },
  {
    title: "Gladiator",
    director: "Ridley Scott",
    genre: ["Action", "Adventure", "Drama"],
    releaseYear: 2000,
    rating: 8.5,
    durationMinutes: 155
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing collection
    await Movie.deleteMany({});
    console.log('Existing movies cleared.');

    // Insert 10 sample movies
    const insertedMovies = await Movie.insertMany(sampleMovies);
    console.log(`Successfully added ${insertedMovies.length} movies to the database!`);

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDB();