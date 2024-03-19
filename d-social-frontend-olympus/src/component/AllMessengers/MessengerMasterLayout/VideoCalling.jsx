'use-client';
import React, { useEffect, useCallback, useState } from 'react';
import peer from '@/app/services/peer';
import { useSocket } from '@/app/socketProvider/SocketProvider';
import ReactPlayer from 'react-player';
import PhoneIcon from "./_ui/icons/PhoneIcon";
import MicIcon from "./_ui/icons/MicIcon";
import MuteIcon from "./_ui/icons/MuteIcon";
import VideoIcon2 from "./_ui/icons/VideoIcon2";
import ThreedotIcon3 from "./_ui/icons/ThreedotIcon3";
import "./VideoCalling.css"

const VideoCalling = ({ setVideoModalOpen, id }) => {
   const socket = useSocket();
   const [remoteSocketId, setRemoteSocketId] = useState(id);
   const [myStream, setMyStream] = useState();
   const [remoteStream, setRemoteStream] = useState();
   console.log('myStream', myStream);
   console.log('remoteStream', remoteStream);
   const handleUserJoined = useCallback(({ email, id }) => {
      setRemoteSocketId(id);
   }, []);

   const handleCallUser = useCallback(async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
         audio: true,
         video: true,
      });
      const offer = await peer.getOffer();
      socket.emit('user:call', { to: remoteSocketId, offer });
      setMyStream(stream);
   }, [remoteSocketId, socket]);

   const handleIncommingCall = useCallback(
      async ({ from, offer }) => {
         setRemoteSocketId(from);
         const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
         });
         setMyStream(stream);
         const ans = await peer.getAnswer(offer);
         socket.emit('call:accepted', { to: from, ans });
      },
      [socket],
   );

   const sendStreams = useCallback(() => {
      for (const track of myStream.getTracks()) {
         peer.peer.addTrack(track, myStream);
      }
   }, [myStream]);

   const handleCallAccepted = useCallback(
      ({ from, ans }) => {
         peer.setLocalDescription(ans);
         sendStreams();
      },
      [sendStreams],
   );


   const handleNegoNeeded = useCallback(async () => {
      const offer = await peer.getOffer();
      socket.emit('peer:nego:needed', { offer, to: remoteSocketId });
   }, [remoteSocketId, socket]);

   useEffect(() => {
      peer.peer.addEventListener('negotiationneeded', handleNegoNeeded);
      return () => {
         peer.peer.removeEventListener('negotiationneeded', handleNegoNeeded);
      };
   }, [handleNegoNeeded]);

   const handleNegoNeedIncomming = useCallback(
      async ({ from, offer }) => {
         const ans = await peer.getAnswer(offer);
         socket.emit('peer:nego:done', { to: from, ans });
      },
      [socket],
   );

   const handleNegoNeedFinal = useCallback(async ({ ans }) => {
      await peer.setLocalDescription(ans);
   }, []);

   useEffect(() => {
      if (typeof window !== 'undefined') {
         const localUserInfo = localStorage.getItem('userInfo');
         if (localUserInfo) {
            socket.emit('room:join', {
               email: JSON.parse(localUserInfo)[0]._id,
               room: '123',
            });
         }
      }
   }, []);

   useEffect(() => {
      socket.on('user:joined', handleUserJoined);
      socket.on('incomming:call', handleIncommingCall);
      socket.on('call:accepted', handleCallAccepted);
      socket.on('peer:nego:needed', handleNegoNeedIncomming);
      socket.on('peer:nego:final', handleNegoNeedFinal);

      return () => {
         socket.off('user:joined', handleUserJoined);
         socket.off('incomming:call', handleIncommingCall);
         socket.off('call:accepted', handleCallAccepted);
         socket.off('peer:nego:needed', handleNegoNeedIncomming);
         socket.off('peer:nego:final', handleNegoNeedFinal);
      };
   }, [
      socket,
      handleUserJoined,
      handleIncommingCall,
      handleCallAccepted,
      handleNegoNeedIncomming,
      handleNegoNeedFinal,
   ]);

   useEffect(() => {
      peer.peer.addEventListener('track', async (ev) => {
         const remoteStream = ev.streams;
         setRemoteStream(remoteStream[0]);
      });
   }, [socket]);

   return (
      <div
         className='card border rounded' style={{ width: 800, height: 735 }}
      >
         <div>
            {remoteSocketId && !myStream && !remoteStream && (
               <button onClick={handleCallUser}>CALL</button>
            )}
            <h4>{remoteSocketId ? 'Connected' : 'No one in room'}</h4>
            {myStream && <button onClick={sendStreams}>Send Stream</button>}
         </div>


         {myStream && (
            <div className='video_player'>
               <ReactPlayer muted playing width={799} height={600} url={myStream} />
            </div>
         )}

         <div>
            <div
               style={{
                  marginTop: "10px"
               }}
            >

               <div style={{ position: "absolute", top: 1, right: 0 }}>
                  {remoteStream && (
                     <div>
                        <h6>Remote Stream</h6>
                        <ReactPlayer
                           playing
                           height="200px"
                           width="250px"
                           url={remoteStream}
                        />
                     </div>
                  )}
               </div>
            </div>
         </div>

         <div style={{ width: "100%", padding: "15px", backgroundColor: "black", bottom: 1, position: "absolute", display: "flex", justifyContent: "center", }}>
            <div style={{ width: "50%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "25px" }}>
               <span style={{ cursor: "pointer", backgroundColor: "#F4F4F4", width: "44px", height: "44px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px" }}>
                  <MicIcon />
               </span>
               <span style={{ cursor: "pointer", backgroundColor: "#F4F4F4", width: "44px", height: "44px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px" }}>
                  <MuteIcon />
               </span>
               <span style={{ cursor: "pointer", backgroundColor: "#F4F4F4", width: "44px", height: "44px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px" }}>
                  <VideoIcon2 />
               </span>
               <span style={{ cursor: "pointer", backgroundColor: "#F4F4F4", width: "44px", height: "44px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px" }}>
                  <ThreedotIcon3 />
               </span>
               <span onClick={() => setVideoModalOpen(false)} style={{ cursor: "pointer", backgroundColor: "red", width: "128px", height: "44px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px" }}>
                  <PhoneIcon />
               </span>
            </div>
         </div>
      </div>
   );
};

export default VideoCalling;
