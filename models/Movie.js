import mongoose from 'mongoose';

// const movieSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, 'Movie title is required'],
//       trim: true,
//       maxlength: [100, 'Title cannot exceed 100 characters']
//     },
//     director: {
//       type: String,
//       required: [true, 'Director name is required'],
//       trim: true
//     },
//     genre: {
//       type: [String],
//       required: [true, 'At least one genre is required'],
//       index: true
//     },
//     releaseYear: {
//       type: Number,
//       required: [true, 'Release year is required'],
//       min: [1888, 'Release year cannot be before the invention of cinema (1888)'],
//       max: [new Date().getFullYear() + 5, 'Release year cannot be too far in the future']
//     },
//     rating: {
//       type: Number,
//       min: [0, 'Rating must be at least 0'],
//       max: [10, 'Rating cannot exceed 10'],
//       default: 0
//     },
//     durationMinutes: {
//       type: Number,
//       required: [true, 'Duration in minutes is required'],
//       min: [1, 'Duration must be greater than 0']
//     }
//   },
//   {
//     timestamps: true // Automatically manages createdAt and updatedAt
//   }
// );

// export default mongoose.model('Movie', movieSchema);import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Movie title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    director: {
      type: String,
      required: [true, 'Director name is required'],
      trim: true
    },
    genre: {
      type: [String],
      required: [true, 'At least one genre is required'],
      index: true
    },
    releaseYear: {
      type: Number,
      required: [true, 'Release year is required'],
      min: [1888, 'Release year cannot be before the invention of cinema (1888)'],
      max: [new Date().getFullYear() + 5, 'Release year cannot be too far in the future']
    },
    rating: {
      type: Number,
      min: [0, 'Rating must be at least 0'],
      max: [10, 'Rating cannot exceed 10'],
      default: 0
    },
    durationMinutes: {
      type: Number,
      required: [true, 'Duration in minutes is required'],
      min: [1, 'Duration must be greater than 0']
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Movie', movieSchema);