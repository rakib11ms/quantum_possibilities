import React from 'react';

function CustomeDetailsView({ icon, data, title }) {
    return (
        <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
            <div className='prfworkabt-full-img-div'>
                <div className='prfworkabt-img-div'>
                    {icon}
                </div>
                <div>
                    {/* className='wr-statsn-tags'
                                                            className='wr-stasn-texts' */}
                    <h5 className='wr-statsn-tags'>
                        {data}
                    </h5>
                    <span className='wr-stasn-texts'>
                        {title}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CustomeDetailsView;