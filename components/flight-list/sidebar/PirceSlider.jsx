
'use client'

import { flightAvailResult } from "@/features/hero/flightSlice";
import { updateFlightAvailRQ } from "@/features/hero/searchCriteriaSlice";
import { useRouter } from "next/navigation";
import Slider, { Range } from 'rc-slider';
import { useEffect, useState } from "react";
// import InputRange from "react-input-range";
import { useDispatch, useSelector } from "react-redux";
import 'rc-slider/assets/index.css';

const PirceSlider = (props) => {
  const { flightAvailRQ } = useSelector((state) => state.searchCriteria);
  const { flightList } = useSelector((state) => state.flight);
  const [price, setPrice] = useState({
    value: { min: props.filterParam?.priceMinMax[0], max: props.filterParam?.priceMinMax[1] },
  });
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(()=> {    
    if(props.filterParam?.priceMinMax[0] > 0 && props.filterParam?.priceMinMax[1] > 0){
    setPrice({ 
      value: { min: props.filterParam?.priceMinMax[0], max: props.filterParam?.priceMinMax[1] },});
    }
  },[props.filterParam?.priceMinMax[0]])

  const handleOnChange = (value) => {
   
    setPrice({ 
      value: { min: value[0], max: value[1] },});
    if(props.type === "return")
    {
      dispatch(
        updateFlightAvailRQ({
            ...flightAvailRQ,
            filterParam: {
              ...flightAvailRQ.filterParam,
              returnPriceMinMax: [value[0], value[1]],
              returnPageNumber: 0,
            },
        })
      );
      
      dispatch(flightAvailResult({ flightAvailRQ : {
        ...flightAvailRQ,
        filterParam: {
          ...flightAvailRQ.filterParam,
          returnPriceMinMax: [value[0], value[1]],
          returnPageNumber: 0,
        },
    }, router, undefined }));
  }
    else
    {
        dispatch(
          updateFlightAvailRQ({
              ...flightAvailRQ,
              filterParam: {
                ...flightAvailRQ.filterParam,
                priceMinMax: [value[0], value[1]],
                pageNumber: 0,
              },
          })
        );
        
        dispatch(flightAvailResult({ flightAvailRQ : {
          ...flightAvailRQ,
          filterParam: {
            ...flightAvailRQ.filterParam,
            priceMinMax: [value[0], value[1]],
            pageNumber: 0,
          },
      }, router, undefined }));
    }
  };

  return (props.filterParam?.priceMinMax[0] > 0 && props.filterParam?.priceMinMax[1] > 0) ? (
    <div className="js-price-rangeSlider">
      <div className="text-14 fw-500"></div>

      <div className="d-flex justify-between mb-20">
        <div className="text-15 text-dark-1">
          <span className="js-lower mx-1">${props.filterParam?.priceMinMax[0]}</span>-
          <span className="js-upper mx-1">${props.filterParam?.priceMinMax[1]}</span>
        </div>
      </div>

      <div className="px-5">
        {/* <InputRange
          formatLabel={(value) => ``}
          minValue={props.filterParam?.priceMinMax[0]}
          maxValue={props.filterParam?.priceMinMax[1]}
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
  ):(<></>);
};

export default PirceSlider;
