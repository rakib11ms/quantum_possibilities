import React, { useState, useEffect } from 'react'
// import Button from "@material-ui/core/Button"
// import IconButton from "@material-ui/core/IconButton"

// import PhoneIcon from "@material-ui/icons/Phone"

function VideoChatModalPopup({ callAccepted, setCallAccepted, setVideoModalOpen, myVideoRef, userVideoRef, stream, callUser, answerCall, receivingCall }) {

    // console.log("stream",stream)
    

    // console.log("ddd", callUser)


    return (
        <div className='card bg-light border rounded p-2' style={{ width: "90vw", height: "80vh", zIndex: "11", position: "fixed", top: "15%", left: "5%" }}>
            <div className='d-flex justify-content-end  py-0 my-0'>
                <button className='btn-sm btn btn-success py-2 my-0' onClick={() => setVideoModalOpen(false)}> CLose</button>

            </div>


            <h4> Video Chat Modal Popup</h4>

            <div className='d-flex justify-content-between px-3'>
                {
                    stream && <div className='' style={{ width: "40%", height: "300px" }}>
                        <video src="movie.ogg" controls muted ref={myVideoRef} autoPlay>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                }
                {/* <div className='' style={{ width: "40%", height: "300px" }}>
                        <video src="movie.ogg" controls muted ref={myVideoRef} autoPlay>
                            Your browser does not support the video tag.
                        </video>
                    </div> */}

                {
                    callAccepted && <div className='mx-2' style={{ width: "40%", height: "300px" }}>
                        <video src="movie.ogg" controls muted ref={userVideoRef} autoPlay>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                }


            </div>

            <div className="call-button">
                {callAccepted && !callEnded ? (


                    <button onClick={leaveCall} className="btn btn-success">
                        End Call

                    </button>
                ) : (
                    // <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                    //     <PhoneIcon fontSize="large" />
                    // </IconButton>

                    <button className='btn btn-secondary mt-1' onClick={() => callUser("6545c99d858780bf50dfc1eb")}>
                        Call User
                    </button>
                )}
                {/* {idToCall} */}
            </div>

            <div>
                {receivingCall && !callAccepted ? (
                    <div className="caller">
                        <h1 >SomeOne is calling...</h1>
                        <button className='btn btn-danger' onClick={answerCall}>
                            Answer
                        </button>
                    </div>
                ) : null}
            </div>


        </div>
    )
}

export default VideoChatModalPopup