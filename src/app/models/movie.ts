import mongoose, { Schema, Document } from 'mongoose';

export interface Movies extends Document {
  name: string;
  releaseDate: Date;
  averageRating: number;
  reviews: mongoose.Types.ObjectId[]; 
}


const MoviesSchema: Schema<Movies> = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  releaseDate: { 
    type: Date,
    required: true,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Reviews"
  }]
});

const movieModel = (mongoose.models.Movies as mongoose.Model<Movies>) || mongoose.model<Movies>("Movies", MoviesSchema);
export default movieModel;
