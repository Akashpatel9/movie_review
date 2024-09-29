"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

function Page() {

  const [submitting , setSubmitting] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
  } = useForm();

  const router = useRouter();

  const onSubmit = async(data: any) =>{
    setSubmitting(true);
    const res = await axios.post("/api/addMovie",data);
    router.replace("/")
    console.log(res);
    setSubmitting(false);
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col gap-5 w-1/4 border-2 border-zinc-300 p-10 rounded">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-semibold">Add new movie</h1>
          <input
            className="border-2 bottom-zinc-400 rounded p-2 outline-none w-full"
            type="text"
            placeholder="Name"
            {...register("name")}
            required={true}
          />
          <input
            className="border-2 bottom-zinc-400 rounded p-2 outline-none w-full"
            type="date"
            placeholder="date"
            {...register("releaseDate")}
            required={true}
          />
          <div className=" w-full flex justify-end">
            <button disabled={submitting?true:false} className={` ${submitting?"bg-[#463e9b]":"bg-[#6558f5]"}  w-fit font-semibold px-4 text-white py-2 rounded`}>
              {!submitting?"Creating":"Create movie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
