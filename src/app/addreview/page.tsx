"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import Dropdown from "@/components/Dropdown";
import { useState } from "react";
import { useRouter } from "next/navigation";

function page() {

  const [id, setId] = useState<any>("");

  const [err, setErr] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function getId(id: any) {
    setId(id);
    if(id){
      setErr(true)
    }else{
      setErr(false)
    }
  }

  const router = useRouter();

  const onSubmit = async (data: any) => {
    if(err){
    const res = await axios.post(
      `http://localhost:3000/api/addReview/${id}`,
      data
    );
    console.log(res);
    router.replace("/")
  }
  };



  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col gap-5 w-1/4 border-2 border-zinc-300 p-10 rounded">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-semibold">Add new review</h1>
          <div>
            <Dropdown selectId={getId} />
            {
              id?.length==0?<h6 className="text-sm text-red-500">select any movie name</h6>:""
            }
            
          </div>
          <input
            className="border-2 bottom-zinc-400 rounded p-2 outline-none w-full"
            type="text"
            placeholder="Your name"
            {...register("reviewerName")}
          />
          <input
            className="border-2 bottom-zinc-400 rounded p-2 outline-none w-full"
            type="number"
            placeholder="Rating out of 10"
            max={"10"}
            min={0}
            {...register("rating")}
            required={true}
          />
          <textarea
            {...register("reviewComments")}
            required={true}
            className="border-2 bottom-zinc-400 rounded p-2 outline-none w-full"
          ></textarea>
          <div className=" w-full flex justify-end">
            <button className="bg-blue-700 w-fit font-semibold px-4 text-white py-2 rounded">
              Add review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
