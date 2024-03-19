import React from 'react';

import GenderIcon2 from '../about/_ui/Icons/GenderIcon2';
import BirthdayIcon from '../about/_ui/Icons/BirthdayIcon';
import LocationIcon from '../about/_ui/Icons/LocationIcon';
import EmailIcon from '../about/_ui/Icons/EmailIcon';
import PhoneIcon from '../about/_ui/Icons/PhoneIcon';

function Leftsidebar({ userInfo }) {
    const getBirthday = (birthday) => {
        const d = new Date(birthday);
        const monthName = d.toLocaleString("default", { month: "long" });
        return `Born ${monthName} ${d.getDate()}, ${d.getFullYear()}`;
    };
    return (
        <>
            <span className='abt-me-tags'>About me</span>
            <div>
                <ul>
                    <li>
                        <div className='abou-li-div'>
                            <span>
                                <GenderIcon2 />
                            </span>
                            <p>{userInfo?.gender?.gender_name}</p>
                        </div>
                    </li>
                    <li>
                        <div className='abou-li-div'>
                            {" "}
                            <span>
                                <BirthdayIcon />
                            </span>
                            <p>{userInfo?.date_of_birth ? getBirthday(userInfo.date_of_birth) : null}</p>
                        </div>
                    </li>
                    <li>
                        <div className='abou-li-div'>
                            <span>
                                <LocationIcon />
                            </span>
                            <p>{userInfo?.home_town ? userInfo.home_town : "Not Avaliable"}</p>
                        </div>
                    </li>
                    <li>
                        <div className='abou-li-div'>
                            <span>
                                <EmailIcon />
                            </span>

                            <p>{userInfo?.email}</p>
                        </div>
                    </li>
                    <li>
                        <div className='abou-li-div'>
                            {" "}
                            <span>
                                <PhoneIcon />
                            </span>
                            <span>{userInfo?.phone}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Leftsidebar;