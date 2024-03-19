"use client";
import React, { useState } from "react";

const NotificationSettings = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckeds, setIsCheckeds] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const handleToggles = () => {
    setIsCheckeds(!isCheckeds);
  };

  return (
    <div>
      <div className='notificationSetiing-div-full'>
        <div className='notificationSetiing-div container-fluid'>
          <div className=''>
            <h6 className=''>Notification</h6>
            <hr />

            <div className='row privacySet-div container mt-3'>
              {/* <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div> */}
              <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 '>
                <div className='text-cp-div'>
                  <p className='text-c'>Public post notifications</p>
                  <p className='text-cp'>
                    You can get notifications when people start following you
                    and share, like or comment on your public posts.{" "}
                  </p>
                </div>
              </div>
              <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                <p className='text-c'>
                  {" "}
                  <storong className='bold-text'> Public</storong>{" "}
                </p>
              </div>
              <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                <p className='text-c-ed'> Edit</p>
              </div>

              <div className='dhr' />
            </div>
          </div>
          <div className='mt-4'>
            <h6>What notifications you receive </h6>
            <hr />
            <h6>
              Tags <span className='tex-app'>(In-app only)</span>{" "}
            </h6>
            <hr />

            <div className='row privacySet-div container mt-3'>
              {/* <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div> */}
              <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 '>
                <p className='text-c'>Get notifications when you’re tagged</p>
              </div>
              <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                <p className='text-c'>
                  {" "}
                  <storong className='bold-text'> Yes </storong>{" "}
                </p>
              </div>
              <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                <p className='text-c-ed'> Edit</p>
              </div>

              <div className='dhr' />
            </div>

            <div className='row privacySet-div container mt-3'>
              {/* <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div> */}
              <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 '>
                <p className='text-c'>Get notifications when Batch mentions </p>
              </div>
              <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                <p className='text-c'>
                  {" "}
                  <storong className='bold-text'> Yes </storong>{" "}
                </p>
              </div>
              <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                <p className='text-c-ed'> Edit</p>
              </div>

              <div className='dhr' />
            </div>

            <div className='row privacySet-div container mt-3'>
              {/* <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div> */}
              <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10'>
                <p className='text-c'>Get notifications when Batch mentions</p>
              </div>
              <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                <p className='text-c'>
                  {" "}
                  <storong className='bold-text'> Yes</storong>{" "}
                </p>
              </div>
              <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                <p className='text-c-ed'> Edit</p>
              </div>

              <div className='dhr' />
            </div>
            <div className='row privacySet-div container mt-3'>
              {/* <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div> */}
              <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10'>
                <p className='text-c'>Get notifications when Joined groups</p>
              </div>
              <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                <p className='text-c'>
                  {" "}
                  <storong className='bold-text'> Yes</storong>{" "}
                </p>
              </div>
              <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                <p className='text-c-ed'> Edit</p>
              </div>

              <div className='dhr' />
            </div>
          </div>

          <div className='mt-4'>
            <h6>
              Events <span className='tex-app'>(In-app only)</span>
            </h6>
            <hr />

            <div className='row privacySet-div container mt-3'>
              {/* <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div> */}
              <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 '>
                <p className='text-c'>Allow notifications on QP </p>
              </div>
              <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                <p className='text-c'>
                  {" "}
                  <storong className='bold-text'> Yes </storong>{" "}
                </p>
              </div>
              <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                <p className='text-c-ed'> Edit</p>
              </div>

              <div className='dhr' />
            </div>

            <div className='row privacySet-div container mt-3'>
              {/* <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div> */}
              <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 '>
                <p className='text-c'>Allow notifications on Activity </p>
              </div>
              <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                <p className='text-c'>
                  {" "}
                  <storong className='bold-text'> Yes </storong>{" "}
                </p>
              </div>
              <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                <p className='text-c-ed'> Edit</p>
              </div>

              <div className='dhr' />
            </div>

            <div className='row privacySet-div container mt-3'>
              {/* <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div> */}
              <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10'>
                <p className='text-c'>
                  Allow notifications on Changes and updates{" "}
                </p>
              </div>
              <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                <p className='text-c'>
                  {" "}
                  <storong className='bold-text'> Yes</storong>{" "}
                </p>
              </div>
              <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                <p className='text-c-ed'> Edit</p>
              </div>

              <div className='dhr' />
            </div>
            <div className='row privacySet-div container mt-3'>
              {/* <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div> */}
              <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10'>
                <p className='text-c'>
                  Allow notifications on Event subscriptions{" "}
                </p>
              </div>
              <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                <p className='text-c'>
                  {" "}
                  <storong className='bold-text'> Yes</storong>{" "}
                </p>
              </div>
              <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                <p className='text-c-ed'> Edit</p>
              </div>

              <div className='dhr' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
