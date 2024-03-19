import { Box, Radio } from '@mui/material';
import React, { useState } from 'react'
import axiosInstance from '../../../../utils/axios';
import useToaster from '@/hooks/useToaster';
import { TextFieldWrapper } from '@/component/Reuseable';

const contentList = [
    {
        title: 'Spam',
        sub_title: "It’s spam or violent'",
        report_type: 'spam'
    },
    {
        title: 'False information',
        sub_title: "If someone is in immediate danger",
        report_type: 'false_info'
    },
    {
        title: 'Nudity',
        sub_title: "It’s Sexual activity or nudity showing genitals",
        report_type: 'nudity'
    },
    {
        title: 'Something Else',
        sub_title: "Fraud, scam, violence, hate speech etc",
        report_type: 'something_else'
    },
]

export default function PostReportModal({ setIsActionModalOpen, post_id }) {
    const { showNotification } = useToaster()
    const [selectedValue, setSelectedValue] = useState({
        post_id: post_id,
        report_type: '',
        description: ''
    });
    const [activeDiv, setActiveDiv] = useState(1);

    const handleChange = (event) => {
        setSelectedValue(p => ({ ...p, report_type: event.target.value }));
    };
    const handleSubmit = () => {
        if (selectedValue?.report_type && selectedValue?.description) {
            axiosInstance.post('/api/save-post-report', selectedValue)
                .then(res => {
                    setIsActionModalOpen({ report: false })
                    showNotification(res.data?.message)
                })
                .catch(err => {
                    console.log(err);
                    showNotification('Post Report failed !! ', 'error')
                })


        }
    }
    return (
        <div className='p-2'>
            <div className='row m-0'>
                <div className='col-4 col-md-4 col-sm-4 col-lg-4 col-xl-4'></div>
                <div className='col-4 col-md-4 col-sm-4 col-lg-4 col-xl-4'>
                    <div className='report_texts'>
                        <p>Report</p>
                    </div>
                </div>
                <div className='col-4 col-md-4 col-sm-4 col-lg-4 col-xl-4 pt-2'>
                    <div className='report_cross' onClick={() => setIsActionModalOpen({ report: false })}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            class='bi bi-x-circle'
                            viewBox='0 0 16 16'>
                            <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16' />
                            <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708' />
                        </svg>
                    </div>
                </div>
            </div>
            <hr />
            {
                activeDiv == 1 &&
                <>
                    <div>
                        {
                            contentList.map(content =>
                                <div className='radio_text_divss'>
                                    <div>
                                        <Radio
                                            checked={selectedValue?.report_type == content?.report_type}
                                            onChange={handleChange}
                                            value={content?.report_type}
                                            name='radio-buttons'
                                            inputProps={{ "aria-label": "A" }}
                                        />
                                    </div>
                                    <div>
                                        <h6>{content?.title}</h6>
                                        <p>{content?.sub_title}</p>
                                    </div>
                                </div>
                            )
                        }


                    </div>
                    <div className='buttons_divs'>
                        <button className='back-btn'
                            onClick={() => setIsActionModalOpen({ report: false })}
                        >
                            Back
                        </button>
                        <button className='continue-btn'
                            onClick={() => setActiveDiv(2)}
                        >
                            Continue
                        </button>
                    </div>
                </>
            }
            {
                activeDiv == 2 &&
                <Box >
                    <div>

                        <div className='p-4'>
                            <label className='description p-0'>Description</label>
                            <TextFieldWrapper
                                name="description"
                                value={selectedValue?.description}
                                handleChange={(e) => { setSelectedValue(p => ({ ...p, description: e.target.value })) }}
                                placeholder="Enter a description about your Report...."
                                minRows={7}
                                maxRows={7}
                                multiline
                            />
                        </div>
                    </div>
                    <hr />
                    <div className='buttons_divs'>
                        <button className='back-btn'
                            onClick={() => setActiveDiv(1)}
                        >
                            Back
                        </button>
                        <button className='continue-btn'
                            onClick={() => handleSubmit()}
                        >
                            Report
                        </button>
                    </div>
                    {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
                </Box>
            }
        </div>
    )
}