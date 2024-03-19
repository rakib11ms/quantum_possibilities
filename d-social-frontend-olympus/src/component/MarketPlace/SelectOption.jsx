"use client";

import React, {useState} from "react";
import "./SelectOption.modules.css";
import {useDispatch} from "react-redux";
import {insertFormData} from "@/redux/features/add-product/addProductSlice";

export default function SelectOption({
  selectedValue,
  onChange,
  noLabel,
  defaultOption,
  name,
  error,
  label,
  optionValue,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    dispatch(insertFormData({[event.target.name]: event.target.value}));
  };

  return (
    <div>
      <div className="input__area">
        {noLabel ? "" : <label>{label || "Select Options"}</label>}
        <select
          style={{
            border: error && "1px solid red",
          }}
          name={name}
          className="select__area"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            {defaultOption || "Select Option"}
          </option>

          {optionValue ? (
            optionValue.map((each, index) => (
              <option key={index} value={each.value}>
                {each.label}
              </option>
            ))
          ) : (
            <>
              <option value="">Select...</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </>
          )}
        </select>
        <p className="text-red">{error}</p>
      </div>
    </div>
  );
}
