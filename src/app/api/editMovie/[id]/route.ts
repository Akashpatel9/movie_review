import dbConnect from "@/app/config/dbConnect";
import movieModel from "@/app/models/movie";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const { id } = params;
    const { name, releaseDate }: { name: string; releaseDate: Date } =
      await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid movie ID",
        },
        { status: 400 }
      );
    }

    const data = await movieModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { name, releaseDate },
      { new: true }
    );

    if (!data) {
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
        data: data,
        success: true,
        message: "Successfully edited movie",
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
