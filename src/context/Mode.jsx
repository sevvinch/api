import React from 'react';

const Mode = ({ isDarkMode, handleToggle }) => {
  return (
    <div className="">
      <label className="flex items-center cursor-pointer">
        <div
          className={`relative inline-block w-12 h-6 transition duration-200 ease-linear ${
            isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
          } rounded-full`}
        >
          <input
            type="checkbox"
            className="absolute opacity-0 w-full h-full cursor-pointer"
            checked={isDarkMode}
            onChange={handleToggle}
          />
          <span
            className={`absolute left-0 top-0 h-6 w-6 bg-white border-2 rounded-full transform transition-transform duration-200 ease-linear ${
              isDarkMode ? 'translate-x-6' : ''
            }`}
          >

          </span>
        </div>
      </label>
    </div>
  );
};

export default Mode;
