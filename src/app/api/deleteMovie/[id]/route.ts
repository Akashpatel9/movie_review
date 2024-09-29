import dbConnect from "@/app/config/dbConnect";
import movieModel from "@/app/models/movie";
import ReviewsModel from "@/app/models/review";
import mongoose from "mongoose";
import { NextResponse } from "next/server"; 


export const revalidate = 0;

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const { id } = params;

    const movieData = await movieModel.findByIdAndDelete(
      new mongoose.Types.ObjectId(id)
    );

    if (!movieData) {
      return NextResponse.json(
        {
          success: false,
          message: "Movie not found",
        },
        { status: 404 }
      );
    }

    await ReviewsModel.deleteMany({ movieId: new mongoose.Types.ObjectId(id) });

    return NextResponse.json(
      {
        success: true,
        message: "Successfully deleted movie and associated reviews",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
