import React from 'react';

function VideoModal({ setVideoModalOpen, videoModalOpen, stream, setStream, callAccepted, callEnded, leaveCall, receivingCall, answerCall }) {
    const myVideo = useRef(null)
    const userVideo = useRef(null)

    React.useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream)
            if (myVideo.current) {
                myVideo.current.srcObject = stream;
            }
        })
    }, [videoModalOpen]);

    return (
        <div className='card bg-light border rounded p-2' style={{ width: "90vw", height: "80vh", zIndex: "11", position: "fixed", top: "15%", left: "5%" }}>
            <div className='d-flex justify-content-end  py-0 my-0'>
                <button className='btn-sm btn btn-success py-2 my-0' onClick={() => setVideoModalOpen(false)}> CLose</button>
            </div>

            {/* <h4> Video Chat Modal Popup</h4> */}

            <div className='d-flex justify-content-between px-3'>
                {
                    stream && <div className='' style={{ width: "40%", height: "300px" }}>
                        <video src="movie.ogg" controls muted ref={myVideo} autoPlay>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                }

                {
                    callAccepted && <div className='mx-2' style={{ width: "40%", height: "300px" }}>
                        <video src="movie.ogg" controls muted ref={userVideo} autoPlay>
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
                    <button className='btn btn-secondary mt-1' onClick={() => callUser("6545c99d858780bf50dfc1eb")}>
                        Call User
                    </button>
                )}
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
    );
}

export default VideoModal;