import dbConnect from "@/app/config/dbConnect";
import ReviewsModel from "@/app/models/review";
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

    const reviewData = await ReviewsModel.findById(
      new mongoose.Types.ObjectId(id)
    );

    if (!reviewData) {
      return NextResponse.json(
        {
          success: false,
          message: "review not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: reviewData,
        success: true,
        message: "Successfully get review by id",
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
