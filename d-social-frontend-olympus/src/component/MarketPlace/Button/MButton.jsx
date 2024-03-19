import React from "react";
import Link from "next/link";
import "./button.modules.css";
import Image from "next/image";

export default function ButtonComponent({name, icons, className}) {
  return (
    <div className={`btn_layout ${className}`}>
      {icons && <Image className="img" src={icons} alt="btn" />}
      <button>{name || ""}</button>
    </div>
  );
}
