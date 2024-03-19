'use client'
import React from 'react';
import "./DownloadMessengerView.css"
import { host } from '@/environment';

function DownloadMessengerView(props) {
    return (
        <div className='tas_download_messenge_container'>
            <img className='tas_download_messenge_img' src={`${host}/assets/messenger/MessengerPic.png`} />
            <button title='Download App' onClick={() => { }} className='tas_download_messenge_btn'>
                Download App
            </button>
        </div>
    );
}

export default DownloadMessengerView;