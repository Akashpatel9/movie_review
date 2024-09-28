"use client";
import React from "react";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/navigation";

function Cards({ setMovieData, movieData }: any) {

  const router = useRouter();

  async function deleteHandler() {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/deleteMovie/${movieData?._id}`
      );

      setMovieData((pre:any) => pre?.filter((items:any)=>{
        return (items?._id != movieData?._id);
      }))
      
    } catch (error) {
      console.log(error);
    }
  }


  // ----------------------------------------------------------------------------------------
  async function editMovieHandler(){
    
  }


  return (
    <div className="bg-blue-400 text-lg p-5 cursor-pointer border-2 border-zinc-400 rounded">
      <div onClick={()=>router.push(`/reviews/${movieData?._id}`)} className=" flex flex-col gap-2">
        <h4 className="font-semibold text-2xl">{movieData?.name}</h4>
        <h4 className="italic text-balance">{ new Date(movieData?.releaseDate).toDateString()}</h4>
        <h4 className="font-bold">{movieData?.averageRating}/10</h4>
      </div>
      <div className="flex items-center justify-end gap-5">
        <AiFillEdit onClick={()=>editMovieHandler()} className="cursor-pointer hover:text-green-600 hover:scale-150" />
        <MdDelete onClick={() => {
          deleteHandler()
          }} className="cursor-pointer hover:text-red-900 hover:scale-150" />
      </div>
    </div>
  );
}

export default Cards;
