import dbConnect from "@/app/config/dbConnect";
import movieModel from "@/app/models/movie";
import mongoose from "mongoose";

export async function GET(
  { params }: { params: { id: string } },
) {
  await dbConnect();

  try {
    const { id } = params;

    const movieData = await movieModel.findById(new mongoose.Types.ObjectId(id)).populate("reviews");

    if (!movieData) {
      return Response.json(
        {
          success: false,
          message: "Invalid ID",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        data: movieData,
        success: true,
        message: "Successfully get review",
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
