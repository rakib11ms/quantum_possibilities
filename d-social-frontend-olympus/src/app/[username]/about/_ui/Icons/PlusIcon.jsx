import React from 'react';

function PlusIcon(props) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'>
            <circle
                cx='10'
                cy='10'
                r='7.5'
                fill='#307777'
            />
            <path
                d='M10 6.66669L10 13.3334'
                stroke='white'
                stroke-width='1.2'
                stroke-linecap='round'
            />
            <path
                d='M13.3333 10L6.66659 10'
                stroke='white'
                stroke-width='1.2'
                stroke-linecap='round'
            />
        </svg>
    );
}

export default PlusIcon;