import { host } from '@/environment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

function GroupMessengTopPart({ handleOpenGroupMessageMenu, groupItem, setGroupItem }) {
    return (
        <div className='fixed-tops' >
            <div className='header-messenger-top d-flex py-2 justify-content-between card-header  '  >
                <div onClick={handleOpenGroupMessageMenu} style={{ cursor: "pointer" }}>
                    <div style={{ position: "relative", width: '35px', height: "35px", borderRadius: "50%", marginLeft: '-30px', position: "fixed", padding: "2px" }}>
                        <img src={`${host}/uploads/messenger/${groupItem?.group_image}`} style={{ width: '30px', height: "30px", objectFit: "cover", borderRadius: "50%", border: "1px solid black" }} />
                    </div>
                    <h6 className='mx-2'>{groupItem?.group_name}</h6>
                    <p className="tas_mssengrid_tagp">
                        {groupItem?.members.length} members
                    </p>
                </div>

                <div className='d-flex justify-content-between'>
                    <div className='mt-1 mx-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "14px" }} viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>
                    </div>
                    <div className='mx-2 mt-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "18px" }} viewBox="0 0 576 512"><path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" /></svg>
                    </div>
                    <div className='header-messenger-top-right-icons mx-2'
                        onClick={() => { setGroupItem(null) }}
                    >
                        <FontAwesomeIcon
                            icon={faWindowClose}
                            style={{
                                fontSize: 22,
                                cursor: "pointer",
                                color: 'black'
                            }}
                        />

                    </div>
                </div>

            </div>
        </div>
    );
}

export default GroupMessengTopPart;