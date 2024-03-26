import React, { useState } from 'react'

function RangeSelect({onRadiusChange}) {
    const [radius,setRadius] = useState(5);
    return (
      <div className="px-2 md:px-4 mt-4 sm:mt-0">
        <div className="text-sm font-semibold">Bán kính (Km)</div>
        <input
          type="range"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
          min="1"
          max="100"
          step="1"
          onChange={(e) => {
            setRadius(e.target.value);
            onRadiusChange(e.target.value);
          }}
          defaultValue={radius}
        />
        <label className="text-gray-500 text-[15px]">{radius} Km</label>
      </div>
    );
}

export default RangeSelect