import React from "react";

const Skeleton = ({ ...props }) => {
  return (
    <div
      className="skeleton"
      {...props}
    />
  );
};

export { Skeleton };
