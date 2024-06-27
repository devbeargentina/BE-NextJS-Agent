
'use client'

import Slider from "rc-slider";
import { useState } from "react";
// import InputRange from "react-input-range";

const PirceSlider = () => {
  const [price, setPrice] = useState({
    value: { min: 0, max: 500 },
  });

  const handleOnChange = (value) => {
    setPrice({ value });
  };

  return (
    <div className="js-price-rangeSlider">
      <div className="text-14 fw-500"></div>

      <div className="d-flex justify-between mb-20">
        <div className="text-15 text-dark-1">
          <span className="js-lower mx-1">${price.value.min}</span>-
          <span className="js-upper mx-1">${price.value.max}</span>
        </div>
      </div>

      <div className="px-5">
      <Slider
          min={0}
          max={2000}
          range
          value={price.value}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default PirceSlider;
