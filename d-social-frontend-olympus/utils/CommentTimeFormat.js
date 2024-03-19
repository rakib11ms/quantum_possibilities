import moment from "moment";
function timeFormat(time) {
   const relativeTime = moment(time).fromNow();
   return relativeTime;
}

export const orderTableTimeFormate = (dateNow) => {
   const originalDate = new Date(dateNow);

   const day = originalDate.getDate();
   const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
   ];
   const month = monthNames[originalDate.getMonth()];
   const year = originalDate.getFullYear();

   const formattedDate = `${day} ${month} ${year}`;

   return formattedDate;
};
export default timeFormat;
