'use client'
import React from 'react';
import { redirect } from 'next/navigation'
import { useEffect } from 'react';

function page(props) {
    useEffect(() => {
        const localStorageUserName = localStorage.getItem("username");
        redirect(`${localStorageUserName}/timeline`)
    }, [])
    return (
        <div>

        </div>
    );
}

export default page;