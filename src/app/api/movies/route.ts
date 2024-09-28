import dbConnect from "@/app/config/dbConnect";
import movieModel from "@/app/models/movie";

export async function GET(req: Request, res: Response) {
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
