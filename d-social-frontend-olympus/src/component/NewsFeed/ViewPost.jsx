import React, { useState } from 'react'
import axiosInstance from '../../../utils/axios';

const ViewPost = ({ description }) => {
    const [desciption2, setDescription2] = useState({ __html: '' });

    function renderStringWithLink(inputString) {
        let html = "";

        if (inputString != "" && inputString != null) {
            const urlRegex = /(https?:\/\/[^\s]+)/;
            const match = inputString.match(urlRegex);
            const link = match && match[0];

            if (link) {
                // Extract "Live now" text dynamically
                axiosInstance.post('/api/get-url', {
                    link: link
                })
                    .then((res) => {
                        if (res.data.status == 200) {
                            const thumbnails = `
                            <div class="row">
                                <div class="col-md-6">
                                    <img src=${res.data.data.thumbnail} />
                                </div>
                            </div>
                        `;

                            const liveNowText = inputString.split(link)[0];
                            html = `
                            ${liveNowText} <a class="post-link-comment" href="${link}">${link}</a>
                        `;

                            html += thumbnails;
                            setDescription2({ __html: html });
                            return { __html: html };
                            console.log(html, "html");
                        } else {
                            // Handle other status codes if needed
                            setDescription2({ __html: html });
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching thumbnail:', error.message);
                    });
            } else {
                // No link found, display the original string
                html = `${inputString}`;
            }
        } else {
            html = `${inputString}`;
        }
        // return html;
        setDescription2({ __html: html });
        // return { __html: html }; // Wrap HTML string in an object with __html property
    }
    return (
        <div>
            {/* <div dangerouslySetInnerHTML={desciption2}></div> */}
            <p dangerouslySetInnerHTML={desciption2} />
        </div>
    )
}

export default ViewPost;