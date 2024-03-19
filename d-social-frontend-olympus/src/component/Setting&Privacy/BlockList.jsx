import React, { useEffect, useState } from 'react'
import { getFileUrl } from '@/component/Reuseable';
import { timeFormat } from '@/utils/utlity';
import axiosInstance from '../../../utils/axios';
import useToaster from '@/hooks/useToaster';
import { host } from '@/environment';

export default function BlockList() {
    const { showNotification } = useToaster()
    const [blockList, setBlockList] = useState([])

    const getblockList = () => {

        axiosInstance.get(`/api/settings-privacy/get-blocklist`)
            .then(res => setBlockList(res.data?.blocklist))
            .catch(err => {
                showNotification('Previous settings getting failed', 'error')
                console.log(err)
            })
    }
    const handleUnblock = (id) => {

        axiosInstance.post(`/api/settings-privacy/unblock-user/${id}`)
            .then(res => {
                showNotification(res.data?.message)
                getblockList()
            })
            .catch(err => {
                showNotification(err?.response?.data?.message, 'error');
                console.log(err)
            })
    }

    useEffect(() => {
        getblockList()
    }, [])

    return (
        <div className="ui-block">
            <div className="ui-block-title ">
                <h6 className="title" style={{ textAlign: 'start', }}>Block List</h6>
            </div>
            <div className="ui-block-content pl-4 px-8">
                {
                    blockList?.map((i, index) =>
                    (
                        <div className='all-people-div' key={index}>

                            <div className='people-img-div'>
                                <img className='people-img' src={i?.blocked_to?.profile_pic ? `${host}/uploads/${i?.blocked_to?.profile_pic}`
                                    : '/no_image.jpg'} alt='Profile pic' />
                                <div>
                                    <h6>{[i?.blocked_to?.first_name,i?.blocked_to?.last_name].join(' ')}</h6>
                                    <p>Blocked at {timeFormat(i?.createdAt)}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', padding: '0 1em 0', gap: 3 }}>
                                <button className="group-demo-invite-btn px-2" onClick={() => handleUnblock(i?.blocked_to?._id)}>
                                    Unblock
                                </button>

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
