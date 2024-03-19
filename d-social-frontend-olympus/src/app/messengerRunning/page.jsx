import React from "react";
import Navbar from "../../component/navbar/page";
import MessengerMasterLayout from "@/component/AllMessengers/MessengerMasterLayout/MessengerMasterLayout";
import RunningChat from "@/component/AllMessengers/MessengerMasterLayout/RunningChat";

const page = () => {
  return (
    <div className='Messenger-full-div'>
      <div>
        <Navbar />
      </div>
      <div>
        <div className='Messenger-div'>
          <MessengerMasterLayout>
            <div>
           <RunningChat/>
            </div>
          </MessengerMasterLayout>
        </div>
      </div>
    </div>
  );
};

export default page;
