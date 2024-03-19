import React from "react";

const Blocking = () => {
  return (
    <div className='blocking-full-div'>
      <div className=' blocking-full-div'>
        <h6>Manage Blocking</h6>
        <hr />

        <div className='row'>
          <div className='col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8'>
            <h6>Block users</h6>
            <p>
              Once you block someone, that person can no longer see things you
              post on your timeline, tag your Page, invite your Page to events
              or groups, or start a conversation with your Page. Note: Does not
              include apps, games or groups you both participate in.
            </p>
          </div>

          <div className='col-6 col-sm-6 col-md-2 col-lg-2 col-xl-2'>
            <div className='blck-see-btn-div'>
              <button className='blck-btn'>+Block</button>
            </div>
          </div>
          <div className='col-6 col-sm-6 col-md-2 col-lg-2 col-xl-2'>
            <div className='blck-see-btn-div'>
              <button className='blck-see-btn'>See list</button>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8'>
            <h6>Block apps</h6>
            <p>
              Once you block an app, it can no longer contact you or get
              non-public information about you through Us.
            </p>
          </div>

          <div className='col-6 col-sm-6 col-md-2 col-lg-2 col-xl-2'>
            <div className='blck-see-btn-div'>
              {" "}
              <button className='blck-btn'>+Block</button>
            </div>
          </div>
          <div className='col-6 col-sm-6 col-md-2 col-lg-2 col-xl-2'>
            <div className='blck-see-btn-div'>
              <button className='blck-see-btn'>See list</button>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8'>
            <h6>Block Pages</h6>
            <p>
              Once you block a Page, that Page can no longer interact with your
              posts or like or reply to your comments. You'll be unable to post
              to the Page's timeline or message the Page. If you currently like
              the Page, blocking it will also unlike and unfollow it.
            </p>
          </div>

          <div className='col-6 col-sm-6 col-md-2 col-lg-2 col-xl-2'>
            <div className='blck-see-btn-div'>
              {" "}
              <button className='blck-btn'>+Block</button>
            </div>
          </div>
          <div className='col-6 col-sm-6 col-md-2 col-lg-2 col-xl-2'>
            <div className='blck-see-btn-div'>
              <button className='blck-see-btn'>See list</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blocking;
