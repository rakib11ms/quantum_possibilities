"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../../../../../../utils/axios";
import { useParams } from "next/navigation";

export default function useStories(options) {
   // State to manage the width of the div
   const [stories, setStories] = useState([]);
   const [storiesDetails, setStoriesDetails] = useState([]);
   const [isPlaying, setIsPlaying] = useState(true); // Initial state is playing

   const params = useParams();

   const [width, setWidth] = useState(0);
   useEffect(() => {
      let intervalId;

      // Check if it should play
      console.log("clicked play___", isPlaying);
      if (isPlaying) {
         intervalId = setInterval(() => {
            // Increase the width by 1% every second
            setWidth((prevWidth) => {
               // Stop the interval when the width reaches 100%
               if (prevWidth >= 100) {
                  clearInterval(intervalId);
                  return prevWidth;
               }
               return prevWidth + 1;
            });
         }, 30); // Run every 1000 milliseconds (1 second)
      } else {
         clearInterval(intervalId);
      }

      return () => clearInterval(intervalId);
   }, [isPlaying]);

   // Get All Users Stories. Also getting user information
   useEffect(async () => {
      await axiosInstance
         .post("/api/get-user-story", {
            user_id: options?.story_id,
         })
         .then((res) => {
            console.log("Stories Details", res.data);
            setStories(res?.data?.results);
         })
         .catch(function (error) {
            console.log("Stories Details", error);
         });

      return () => {};
   }, []);

   // Play and pause Interval
   const handlePlayPause = () => {
      setIsPlaying((prevIsPlaying) => !prevIsPlaying);
   };

   return {
      width,
      stories,
      handlePlayPause,
      storiesDetails,
   };
}
