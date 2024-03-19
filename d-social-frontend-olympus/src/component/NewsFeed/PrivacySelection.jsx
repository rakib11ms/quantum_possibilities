import React from "react";
import {Select, MenuItem} from "@mui/material";

export default function PrivacySelection({options, onchange, value}) {
  return (
    <div>
      <Select
        value={value}
        onChange={onchange}
        style={{
          fontSize: "12px",
          backgroundColor: "white",
          "& .MuiSelect-select:focus": {
            border: "none !important",
            outline: "none !important",
          },
          "& .MuiFilledInput-root": {
            border: "1px solid gray",
          },
        }}
        sx={{
          "& fieldset": {border: "none"},
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            style={{
              fontSize: "12px",
              "& .MuiSelect-select": {
                border: "none",
                backgroundColor: "white",
                outline: "0",
              },
            }}
          >
            <span class=""> {option.icon}</span>
            <span class="mx-1"> {option.label}</span>
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
