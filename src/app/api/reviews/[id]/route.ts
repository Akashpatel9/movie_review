import dbConnect from "@/app/config/dbConnect";
import movieModel from "@/app/models/movie";
import ReviewsModel from "@/app/models/review";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";


export const revalidate = 0;

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

  await dbConnect();

  try {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid movie ID format",
        },
        { status: 400 }
      );
    }

    const movieData = await movieModel
      .findOne({ _id: new mongoose.Types.ObjectId(id) })
      .populate("reviews"); 

    if (!movieData) {
      return NextResponse.json(
        {
          success: false,
          message: "Movie not found",
        },
        { status: 404 }
      );
    }


    return NextResponse.json(
      {
        data: movieData,
        success: true,
        message: "Successfully retrieved movie data",
      },
      { status: 200 }
    );
  } catch (error) {

    console.error("Error fetching movie data:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
