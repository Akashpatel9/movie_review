"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

function ReviewCard({setReviews, reviewData}:any) {
  
  async function deleteData(){
    try {
      setReviews((pre:any) => pre?.filter((items:any)=>{
        return (items?._id != reviewData?._id);
      }))
      await axios.delete(`/api/deleteReview/${reviewData._id}`)
    } catch (error) {
      console.log(error);
    }
  }

  const router = useRouter();

  
  // ----------------------------------------------------------------------------------------
  async function editReviewHandler() {
    router.push(`/addreview?id=${reviewData?._id}`);
  }


  return (
    <div className="text-lg p-5 border-2 border-zinc-400 cursor-pointer flex flex-col gap-5">
      <div className="flex items-center justify-between text-2xl font-semibold">
        <h1>{reviewData?.reviewComments}</h1>
        <h1 className="text-[#6558f5]">{reviewData?.rating}/10</h1>
      </div>
      <div className="flex justify-between font-semibold items-center">
        <h1 className="italic">By {reviewData?.reviewerName}</h1>
        <h1 className="flex items-center gap-5 text-zinc-500">
          <AiFillEdit onClick={() => editReviewHandler()} className="cursor-pointer hover:text-green-900 hover:scale-150" />
          <MdDelete onClick={()=>deleteData()} className="cursor-pointer hover:text-red-900 hover:scale-150" />
        </h1>
      </div>
    </div>
  );
}

export default ReviewCard;
