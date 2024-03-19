import React, {useState, useEffect} from "react";

const TimeAgo = ({timestamp}) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentTime = new Date();
      const providedTime = new Date(timestamp);
      const timeDifference = currentTime - providedTime;
      const secondsDifference = timeDifference / 1000;
      const minutesDifference = secondsDifference / 60;
      const hoursDifference = minutesDifference / 60;
      const daysDifference = hoursDifference / 24;

      if (daysDifference >= 1) {
        setTimeAgo(`${Math.floor(daysDifference)} days ago`);
      } else if (hoursDifference >= 1) {
        setTimeAgo(`${Math.floor(hoursDifference)} hours ago`);
      } else {
        setTimeAgo(`${Math.round(minutesDifference)} minutes ago`);
      }
    };

    calculateTimeAgo();

    // Update every minute
    const interval = setInterval(calculateTimeAgo, 60000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return <p>{timeAgo}</p>;
};
export default TimeAgo;
