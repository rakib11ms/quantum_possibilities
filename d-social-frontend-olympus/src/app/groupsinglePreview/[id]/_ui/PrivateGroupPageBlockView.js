import React from 'react';
import "./PrivateGroupPageBlockView.css"

import BlockIcon from './Icons/BlockIcon';

function PrivateGroupPageBlockView(props) {
    return (
        <div className='tas_Private_GroupPage_BlockView_container'>
            <BlockIcon/>
            <p className='tas_Private_GroupPage_BlockView_title_text'>This group is private</p>
            <p className='tas_Private_GroupPage_BlockView_text'>Join this group to view or participate in discussions.</p>
        </div>
    );
}

export default PrivateGroupPageBlockView;