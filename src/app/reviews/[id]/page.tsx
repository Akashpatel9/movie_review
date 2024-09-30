"use client";
import React, { useEffect, useState } from "react";
import ReviewCard from "@/components/ReviewCard";
import axios from "axios";
import { useParams } from "next/navigation";

function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  const [movieDetails, setMovieDetails] = useState<any>();

  async function getReviews() {
    try {
      const { data } = await axios.get(`/api/reviews/${id}`);
      setReviews(data?.data[0]?.reviews);
      setMovieDetails(data?.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className="w-full mt-8 px-32">
      <div className=" text-4xl flex justify-between items-center">
        <h1 className="font-semibold">{movieDetails && movieDetails?.name}</h1>
        <h1 className="text-[#6558f5] font-semibold">
          {movieDetails?.averageRating !== undefined && movieDetails?.averageRating !== 0.0
            ? movieDetails.averageRating.toFixed(1)
            : "0"}
          /10
        </h1>
      </div>

      <div className="mt-10 w-full border-[1px] border-zinc-300"></div>

      <div className="mt-5 flex flex-col gap-8">
        {reviews?.length > 0 ? (
          reviews?.map((reviews: any) => {
            return (
              <ReviewCard
                key={reviews?._id}
                setReviews={setReviews}
                reviewData={reviews}
              />
            );
          })
        ) : (
          <>Not Avliable</>
        )}
      </div>
    </div>
  );
}

export default ReviewPage;
