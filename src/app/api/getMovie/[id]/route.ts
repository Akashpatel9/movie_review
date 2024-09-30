import dbConnect from "@/app/config/dbConnect";
import movieModel from "@/app/models/movie";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {    

    const { id } = params;

    console.log(id);
    

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
    console.log(error);
    
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
