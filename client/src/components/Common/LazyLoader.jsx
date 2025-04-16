import React from "react";
import "../../assets/css/LazyLoader.css"; // Import the custom styles

const LazyLoader = () => {
  return (
    <div className="lazy-loader-wrapper">
      <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LazyLoader;
