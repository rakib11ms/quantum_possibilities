"use client";

import {dynamicBreadcrumb} from "@/utils/breadcrumb-data";
import {usePathname} from "next/navigation";
import React, {useEffect, useState} from "react";
import Breadcrumb from "./Breadcrumb";

export default function BreadcrumbMain() {
  const path = usePathname();

  const [breadcrumbPath, setBreadcrumbPath] = useState([]);

  // Dynamically breadcrumb information
  useEffect(() => {
    const breadcrumbPath = dynamicBreadcrumb(path);
    setBreadcrumbPath(breadcrumbPath);
  }, [path]);

  return <Breadcrumb path={breadcrumbPath} />;
}
