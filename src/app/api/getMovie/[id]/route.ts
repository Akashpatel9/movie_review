import dbConnect from "@/app/config/dbConnect";
import movieModel from "@/app/models/movie";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(
  req: Request,
) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // Log the ID for debugging
    console.log("Requested Movie ID:", req.url);
    

    const movieData = await movieModel.findById(
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

    return NextResponse.json(
      {
        data: movieData,
        success: true,
        message: "Successfully get movie by id",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
