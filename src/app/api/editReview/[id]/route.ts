import dbConnect from "@/app/config/dbConnect";
import movieModel from "@/app/models/movie";
import ReviewsModel, { Reviews } from "@/app/models/review";
import mongoose, { Types } from "mongoose";
import { NextResponse } from "next/server";


export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const { id } = params;


    const { reviewerName, rating, reviewComments }: any = await req.json();


    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid review ID",
        },
        { status: 400 }
      );
    }

    const updatedReview = await ReviewsModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { reviewerName, rating, reviewComments },
      { new: true }
    ).populate("movieId");


    if (!updatedReview) {
      return NextResponse.json(
        {
          success: false,
          message: "Review not found",
        },
        { status: 404 }
      );
    }


    const movieId = updatedReview.movieId as Types.ObjectId;


    const allReviews = await ReviewsModel.find({ movieId });
    const averageRating =
      allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;


    await movieModel.findByIdAndUpdate(movieId, { averageRating });


    return NextResponse.json(
      {
        data: updatedReview,
        success: true,
        message: "Successfully edited review",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
