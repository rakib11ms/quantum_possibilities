import { Switch } from "@mui/base";
import React, { useState } from "react";

const PriveacySetting = () => {
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
      <div className='privacySetiing-div container-fluid'>
        <div className=''>
          <h6>Activity</h6>
          <hr />

          <div className='row privacySet-div container mt-3'>
            {/* <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div> */}
            <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 '>
              <p className='text-c'>Who can see your future post?</p>
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

          <div className='row privacySet-div container mt-3'>
            {/* <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div> */}
            <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10'>
              <p className='text-c'>
                Who can see the people, Pages and lists you follow?{" "}
              </p>
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

          <div className='row privacySet-div container mt-3'>
            {/* <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div> */}
            <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10'>
              <p className='text-c'>
                Review all your posts and things you are tagged in{" "}
              </p>
            </div>

            <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
              <p className='text-c-ed'> Activity log</p>
            </div>

            <div className='dhr' />
          </div>
        </div>
        <div className='mt-4'>
          <h6>How people find and contact with you</h6>
          <hr />

          <div className='row privacySet-div container mt-3'>
            {/* <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div> */}
            <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 '>
              <p className='text-c'>Recommended similar pages</p>
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
                Do you want search engines outside of this platform to link to
                your page?
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

        <div className='mt-4'>
          <h6>Messaging</h6>
          <hr />

          <div className='row privacySet-div container mt-3'>
            {/* <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div> */}
            <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 '>
              <p className='text-c'>
                Allow people and pages to message your page?{" "}
              </p>
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
        </div>

        <div className='mt-4'>
          <h6>Tagging</h6>
          <hr />

          <div className='row privacySet-div container mt-3'>
            {/* <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div> */}
            <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 '>
              <p className='text-c'>Who can post on you page? </p>
            </div>
            <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
              <p className='text-c'>
                {" "}
                <storong className='bold-text'> Everyone </storong>{" "}
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
                Who can see what others post on your Page?
              </p>
            </div>
            <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
              <p className='text-c'>
                {" "}
                <storong className='bold-text'> Everyone</storong>{" "}
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
                Allow others to view and leave reviews on your Page?
              </p>
            </div>
            <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
              <p className='text-c'>
                {" "}
                <storong className='bold-text'> Everyone</storong>{" "}
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
                Who can see posts you're tagged in on your Page?
              </p>
            </div>
            <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
              <p className='text-c'>
                {" "}
                <storong className='bold-text'> Everyone</storong>{" "}
              </p>
            </div>
            <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
              <p className='text-c-ed'> Edit</p>
            </div>

            <div className='dhr' />
          </div>
        </div>

        <div className='mt-4'>
          <h6>Reviewing</h6>
          <hr />

          <div className='row privacySet-div container mt-3'>
            {/* <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div> */}
            <div className='col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 '>
              <p className='text-c'>
                Review posts you're tagged in before the post appears on your
                Page?
              </p>
            </div>

            <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
              <label className='toggle-slider'>
                <input
                  type='checkbox'
                  checked={isCheckeds}
                  onChange={handleToggles}
                />
                <span className='slider round'></span>
              </label>
            </div>

            <div className='dhr' />
          </div>
          <div className='row privacySet-div container mt-3'>
            {/* <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div> */}
            <div className='col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 '>
              <p className='text-c'>
                Review posts you're tagged in before the post appears on your
                Page?
              </p>
            </div>

            <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
              {" "}
              <label className='toggle-slider'>
                <input
                  type='checkbox'
                  checked={isChecked}
                  onChange={handleToggle}
                />
                <span className='slider round'></span>
              </label>
            </div>

            <div className='dhr' />
          </div>
        </div>

        <div className='mt-4'>
          <h6>Public post filters</h6>
          <hr />

          <div className='row privacySet-div container mt-3'>
            {/* <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div> */}
            <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 '>
              <p className='text-c'>Who can follow my page? </p>
            </div>
            <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
              <p className='text-c'>
                {" "}
                <storong className='bold-text'> Everyone </storong>{" "}
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
              <p className='text-c'>Who can follow my page?</p>
            </div>
            <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
              <p className='text-c'>
                {" "}
                <storong className='bold-text'> Everyone</storong>{" "}
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
                Choose who is allow to comment on you public post
              </p>
            </div>
            <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
              <p className='text-c'>
                {" "}
                <storong className='bold-text'> Everyone</storong>{" "}
              </p>
            </div>
            <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
              <p className='text-c-ed'> Edit</p>
            </div>

            <div className='dhr' />
          </div>
        </div>

        <div className='mt-4'>
          <h6>Restriction</h6>
          <hr />

          <div className='row privacySet-div container mt-3'>
            {/* <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div> */}
            <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 '>
              <p className='text-c'>Country Restrictions</p>
            </div>
            <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
              <p className='text-c'>
                {" "}
                <storong className='bold-text'> No </storong>{" "}
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
              <p className='text-c'>Age restrictions </p>
            </div>
            <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
              <p className='text-c'>
                {" "}
                <storong className='bold-text'> 18+ </storong>{" "}
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
  );
};

export default PriveacySetting;
