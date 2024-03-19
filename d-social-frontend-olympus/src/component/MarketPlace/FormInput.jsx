"use client";

import React from "react";
import "./formInput.modules.css";
export default function FormInput({
  type,
  id,
  name,
  value,
  onChange,
  label,
  placeholder,
  textarea,
  cols,
  rows,
  noLabel,
  icons,
  error,
}) {
  return (
    <div className="input__wrapper">
      {noLabel ? "" : <label htmlFor={id}>{label}</label>}

      {textarea ? (
        <textarea
          className={`text__area ${error ? "errors_red" : ""}`}
          name={name}
          id={id || name}
          cols={cols}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          className={`input__input ${icons && "extra_left_padding"} ${error ? "errors_red" : ""}`}
          onChange={onChange}
          value={value}
          name={name}
          type={type}
          id={id}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
