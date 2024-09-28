import mongoose, { Schema, Document } from 'mongoose';

export interface Reviews extends Document {
  movieId: mongoose.Types.ObjectId;
  reviewerName: string;
  rating: number;
  reviewComments: string;
}

const ReviewsSchema: Schema<Reviews> = new mongoose.Schema({
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "Movies",
    required: true
  },
  reviewerName: {
    type: String,
    default: "N/A"
  },
  rating: {
    type: Number,
    required: true,
  },
  reviewComments: {
    type: String,
    required: true
  }
});

const ReviewsModel = (mongoose.models.Reviews as mongoose.Model<Reviews>) || mongoose.model<Reviews>("Reviews", ReviewsSchema);
export default ReviewsModel;
