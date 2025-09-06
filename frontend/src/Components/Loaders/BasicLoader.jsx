import React from "react";

const BasicLoader = () => {
  return (
    <div className="flex items-center justify-center h-full w-full p-4">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-accentDark rounded-full animate-spin"></div>
    </div>
  );
};

export default BasicLoader;
