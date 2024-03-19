"use client";

import SingleAdDetails from "@/component/ManageAds/SingleAdDetails";
import { useParams } from "next/navigation";

const page = () => {
    const params = useParams();
    return (
        <div>
            <SingleAdDetails id={params?.id}/>
        </div>
    );
};

export default page;
