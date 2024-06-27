
'use client'

import { hotelAvailResult, updateHotelAvailRQ } from "@/features/hero/hotelSlice";
import { useRouter } from "next/navigation";
import Slider from "rc-slider";
import { useState } from "react";
// import InputRange from "react-input-range";
import { useDispatch, useSelector } from "react-redux";
import 'rc-slider/assets/index.css';

const PirceSlider = (props) => {
  const { hotelList,hotelAvailRQ, filterParam,loading } = useSelector((state) => state.hotel);
  
  const [price, setPrice] = useState({
    value: { min: props.filterParam?.priceMinMax[0], max: props.filterParam?.priceMinMax[1] },
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const handleOnChange = (value) => {
    setPrice({ value: { min: value[0], max: value[1] },});
    dispatch(
      updateHotelAvailRQ({
          ...hotelAvailRQ,
          filterParam: {
            ...hotelAvailRQ.filterParam,
            priceMinMax: [value[0], value[1]],
            pageNumber: 0,
          },
      })
    );
    
    dispatch(hotelAvailResult({ hotelAvailRQ : {
      ...hotelAvailRQ,
      filterParam: {
        ...hotelAvailRQ.filterParam,
        priceMinMax: [value[0], value[1]],
        pageNumber: 0,
      },
  }, router, undefined }));
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
        {/* <InputRange
          formatLabel={(value) => ``}
          minValue={0}
          maxValue={filterParam.priceMinMax[1]}
          value={price.value}
          onChange={(value) => handleOnChange(value)}
        /> */}
        <Slider 
          min={props.filterParam?.priceMinMax[0]}
          max={props.filterParam?.priceMinMax[1]}  defaultValue={[price.value.min, price.value.max]}
          allowCross={false}
          range
          onAfterChange={handleOnChange}
        trackStyle={{ backgroundColor: 'blue', height: 10 }}
        railStyle={{ height: 10 }}
        handleStyle={{
          borderColor: 'blue',
          height: 20,
          width: 20,
          marginTop: -5,
          backgroundColor: 'white',
        }}
        />
      </div>
    </div>
  );
};

export default PirceSlider;
