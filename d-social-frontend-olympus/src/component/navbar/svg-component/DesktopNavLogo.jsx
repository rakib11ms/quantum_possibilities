import React from "react";
import LogoDesktop from "./qPlOgO.png";
import Image from "next/image";

export default function DesktopNavLogo({ width = 50 }) {
   return <Image src={LogoDesktop} alt="logo" width={width} />;
}
