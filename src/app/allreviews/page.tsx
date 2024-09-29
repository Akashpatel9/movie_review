"use client";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Cards from "@/components/Cards";
import axios from "axios";
import { useRouter } from "next/navigation";
import ReviewCard from "@/components/ReviewCard";


function Page() {

  const [reviewData, setReviewData] = useState([]);

  const[ searchData , setSearchData] = useState([]);

  async function getData() {
    try {
      const { data } = await axios.get("/api/getAllReviews");
      setReviewData(data?.data);
      setSearchData(data?.data);      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);



  function serchDataFilter(e:any){
    setSearchData(reviewData?.filter((item: any) => {
        console.log(item.reviewComments);
        
      return item.reviewComments.toLowerCase().startsWith(e.target.value.toLowerCase());
    }));
  }



  return (
    <div className="px-32 mt-8">
      <div className="text-4xl font-semibold text-zinc-700">
        Reviews
      </div>


      <div className="mt-8 w-1/2 border-2 overflow-hidden rounded border-[#6558f5] flex items-center font-semibold text-2xl p-1">
        <CiSearch />
        <input
          className=" p-2 font-semibold w-full outline-none"
          placeholder="Search for your favourit reviews"
          type="text"
          onChange={serchDataFilter}
        />
      </div>

      <div className="mt-10 w-full border-[1px] border-zinc-300"></div>

      <div className="h-full w-full grid grid-cols-3 mt-5 gap-10 justify-between ">
        {searchData?.length > 0 ? (
          searchData?.map((review: any) => {
            return (
              <div key={review?._id}>
                {" "}
                <ReviewCard setSearchData={setSearchData} reviewData={review} />
              </div>
            );
          })
        ) : (
          <>Not Avliable</>
        )}
      </div>
    </div>
  );
}

export default Page;
