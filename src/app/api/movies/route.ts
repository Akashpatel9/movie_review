import dbConnect from "@/app/config/dbConnect";
import movieModel from "@/app/models/movie";

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();

  try {
    const data = await movieModel.find();

    return Response.json(
      {
        data,
        sucess: true,
        messge: "Sucessfull",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        sucess: false,
        messge: error,
      },
      { status: 500 }
    );
  }
}
