import React from "react";

const LinkedAccount = () => {
  return (
    <div>
      <div className='blocking-full-div'>
        <div className=' blocking-full-div'>
          <h6>Link with other accounts</h6>
          <hr />

          <div className='row'>
            <div className='col-10 col-sm-10 col-md-9 col-lg-9 col-xl-9'>
              <h6>Facebook</h6>
              <p>
                Connect your Page to a Professional facebook account. If you
                connect a personal facebook Account, it will be switched to
                professional
              </p>
            </div>

            <div className='col-2 col-sm-2 col-md-3 col-lg-3 col-xl-3'>
              <div className='Connect-btn-div'>
                <button className='Connect-btn'>+Connect</button>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-10 col-sm-10 col-md-9 col-lg-9 col-xl-9'>
              <h6>Instagram</h6>
              <p>
                Connect your Page to a Professional <strong>Instagram</strong>{" "}
                account. If you connect a personal <strong>Instagram</strong>{" "}
                Account, it will be switched to professional
              </p>
            </div>

            <div className='col-2 col-sm-2 col-md-3 col-lg-3 col-xl-3'>
              <div className='Connect-btn-div'>
                <button className='Connect-btn'>+Connect</button>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-10 col-sm-10 col-md-9 col-lg-9 col-xl-9'>
              <h6>Telegram</h6>
              <p>
                Enter the telegram number or id for ABCgame, then check your
                telegram messages for a confirmation code.
              </p>
            </div>

            <div className='col-2 col-sm-2 col-md-3 col-lg-3 col-xl-3'>
              <div className='Connect-btn-div'>
                <button className='Connect-btn'>+Connect</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedAccount;
