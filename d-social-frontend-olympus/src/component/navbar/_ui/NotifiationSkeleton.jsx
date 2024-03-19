import React from "react";
import "./NotifiationSkeleton.modules.css";
const NotificationSkeleton = () => {
   return (
      <div className="row notification-div skeleton">
         <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div className="noti-img-div">
               <div className="skeleton-image"></div>
            </div>
         </div>
         <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
            <div>
               <p>
                  <strong className="skeleton-text"></strong>
               </p>

               <p className="file-notifi-texttwo mt-1 skeleton-text"></p>
               <p className="time-all-noti-text skeleton-text"></p>
            </div>
         </div>
      </div>
   );
};

export default NotificationSkeleton;
