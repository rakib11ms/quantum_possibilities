class PeerService {
   constructor() {
      if (!this.peer) {
         this.peer = new RTCPeerConnection({
            iceServers: [
               // {
               //    urls: ['stun:stun.l.google.com:19302', 'stun:global.stun.twilio.com:3478'],
               // },
               {
                  urls: 'turn:95.110.129.37:3478',
                  username: 'admin146934426',
                  credential: '5uwolwd4m7'
               }
            ],
         });
      }
   }

   async getAnswer(offer) {
      if (this.peer) {
         await this.peer.setRemoteDescription(offer);
         const ans = await this.peer.createAnswer();
         await this.peer.setLocalDescription(new RTCSessionDescription(ans));
         return ans;
      }
   }

   async setLocalDescription(ans) {
      if (this.peer) {
         await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
      }
   }

   async getOffer() {
      if (this.peer) {
         const offer = await this.peer.createOffer();
         await this.peer.setLocalDescription(new RTCSessionDescription(offer));
         return offer;
      }
   }
}

export default new PeerService();
