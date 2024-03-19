"use client";
import {store} from "@/redux/store";
import React from "react";
import {Provider} from "react-redux";

const StoreProvider = ({children}) => {
  return (
    <React.Fragment>
      <Provider store={store}>{children}</Provider>
    </React.Fragment>
  );
};
export default StoreProvider;
