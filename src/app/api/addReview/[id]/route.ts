import dbConnect from "@/app/config/dbConnect";
import movieModel from "@/app/models/movie";
import ReviewsModel from "@/app/models/review";
import mongoose from "mongoose";

export const dynamic = 'force-dynamic';

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  try {
    const { id } = params;


    const { reviewerName, rating, reviewComments }: { reviewerName: string; rating: number; reviewComments: string } = await req.json();


    const movieData = await movieModel.findById(new mongoose.Types.ObjectId(id));


    if (!movieData) {
      return Response.json(
        {
          success: false,
          message: "Invalid ID",
        },
        { status: 400 }
      );
    }

    const reviewData = await ReviewsModel.create({
      movieId: id,
      reviewerName,
      rating,
      reviewComments,
    });

    movieData.reviews.push(reviewData._id as mongoose.Types.ObjectId);
    await movieData.save();

    const allReviews = await ReviewsModel.find({ movieId: id });
    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = allReviews.length > 0 ? totalRating / allReviews.length : 0;

    await movieModel.findByIdAndUpdate(
      movieData._id,
      { averageRating },
      { new: true }
    );

    return Response.json(
      {
        data: reviewData,
        success: true,
        message: "Successfully added review",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error,
      },
      { status: 500 }
    );
  }
}
