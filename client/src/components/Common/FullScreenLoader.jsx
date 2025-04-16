// components/Common/FullScreenLoader.jsx
import React from "react";
import { useSelector } from "react-redux";

const FullScreenLoader = () => {
  const { IsLoading } = useSelector((state) => state.Loader);

  if (!IsLoading) return null;

  return (
    <div className="LoadingOverlay">
      <div className="loading__overlay">
        <div className="indeterminate"></div>
      </div>
    </div>
  );
};

export default FullScreenLoader;
