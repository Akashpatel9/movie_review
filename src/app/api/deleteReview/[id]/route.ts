import dbConnect from "@/app/config/dbConnect";
import ReviewsModel from "@/app/models/review";
import movieModel from "@/app/models/movie";
import mongoose from "mongoose";
import { NextResponse } from "next/server"; 

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const { id } = params;

    const review = await ReviewsModel.findById(new mongoose.Types.ObjectId(id));
    if (!review) {
      return NextResponse.json(
        {
          success: false,
          message: "Review not found",
        },
        { status: 404 }
      );
    }

    await ReviewsModel.findByIdAndDelete(new mongoose.Types.ObjectId(id));

    await movieModel.findByIdAndUpdate(
      review.movieId, 
      { $pull: { reviews: new mongoose.Types.ObjectId(id) } }, 
    );

    const allReviews = await ReviewsModel.find({ movieId: review.movieId });
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = allReviews.length > 0 ? totalRating / allReviews.length : 0;

    await movieModel.findByIdAndUpdate(
      review.movieId,
      { averageRating },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Successfully deleted review and updated movie",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error,
      },
      { status: 500 }
    );
  }
}
