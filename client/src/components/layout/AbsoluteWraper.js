import React from "react";

export const AbsoluteWraper = ({ children }) => {
  return <div style={{ position: "absolute", width: "100%" }}>{children}</div>;
};
