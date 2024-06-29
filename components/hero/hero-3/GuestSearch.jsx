'use client'

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHotelCriteria } from "@/features/hero/searchCriteriaSlice";  // Adjust the path accordingly

const Counter = ({ name, count, onIncrement, onDecrement }) => {
  return (
    <>
      <div className="row y-gap-10 justify-between items-center mt-24 mb-24">
        <div className="col-auto">
          <div className="text-15 lh-12 fw-500">{name}</div>
          {name === "Children" && (
            <div className="text-14 lh-12 text-light-1 mt-5">Ages 0 - 17</div>
          )}
        </div>
        {/* End .col-auto */}
        <div className="col-auto">
          <div className="d-flex items-center js-counter">
            <button
              className="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-down"
              onClick={onDecrement}
            >
              <i className="icon-minus text-12" />
            </button>
            {/* decrement button */}
            <div className="flex-center size-20 ml-15 mr-15">
              <div className="text-15 js-count">{count}</div>
            </div>
            {/* counter text  */}
            <button
              className="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-up"
              onClick={onIncrement}
            >
              <i className="icon-plus text-12" />
            </button>
            {/* increment button */}
          </div>
        </div>
        {/* End .col-auto */}
      </div>
      {/* End .row */}
    </>
  );
};

const GuestSearch = () => {
  const { hotelCriteria } = useSelector((state) => state.searchCriteria);
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState(hotelCriteria.rooms);

  const updateRoomCount = (index, key, value) => {
    // Define the constraints for adult and child
  const constraints = {
    adult: { min: 1, max: 4 },
    child: { min: 0, max: 4 }
  };

  // Ensure the value is within the defined constraints
  if (key in constraints) {
    value = Math.max(constraints[key].min, Math.min(constraints[key].max, value));
  }

  const newRooms = rooms.map((room, i) => 
    i === index ? { ...room, [key]: value } : room
  );

    setRooms(newRooms);
    dispatch(updateHotelCriteria({ ...hotelCriteria, rooms: newRooms }));
  };

  const handleIncrement = (index, key) => {
    updateRoomCount(index, key, rooms[index][key] + 1);
  };

  const handleDecrement = (index, key) => {
    if (rooms[index][key] > 0) {
      updateRoomCount(index, key, rooms[index][key] - 1);
    }
  };

  const addRoom = () => {
    const newRoom = { adult: 1, child: 0, room: rooms.length + 1 };
    const newRooms = [...rooms, newRoom];
    setRooms(newRooms);
    dispatch(updateHotelCriteria({ ...hotelCriteria, rooms: newRooms }));
  };

  const removeRoom = (index) => {
    const newRooms = rooms.filter((_, i) => i !== index);
    setRooms(newRooms);
    dispatch(updateHotelCriteria({ ...hotelCriteria, rooms: newRooms }));
  };

const totalRooms = rooms.length;
const totalAdults = rooms.reduce((sum, room) => sum + room.adult, 0);
const totalChildren = rooms.reduce((sum, room) => sum + room.child, 0);

  return (
    <div className="searchMenu-guests px-30 lg:py-20 lg:px-0 js-form-dd js-form-counters position-relative">
      <div
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
        data-bs-offset="0,22"
      >
        <h4 className="text-15 fw-500 ls-2 lh-16">Guest</h4>
        <div className="text-15 text-light-1 ls-2 lh-16">
        Rooms: {totalRooms} - Adults: {totalAdults} - Children: {totalChildren}
          {/* {rooms.map((room, index) => (
            <div key={index}>
              Room {index + 1}: 
              <span className="js-count-adult">{room.adult}</span> adults -{" "}
              <span className="js-count-child">{room.child}</span>{" "}
              children
            </div>
          ))} */}
        </div>
      </div>
      {/* End guest */}

      <div className="shadow-2 dropdown-menu min-width-400">
        <div className="bg-white px-30 py-30 rounded-4 counter-box">
          {rooms.map((room, index) => (
            <div key={index}>
              <h5>Room {index + 1}
            <div className=" float-end">
            <button class="flex-censter position-absolute e-0 translate-middle bg-light-2 rounded-4 size-35 items-end" onClick={() => removeRoom(index)}><i class="icon-trash-2 text-16 text-light-1"></i></button></div></h5>
              <Counter
                name="Adults"
                count={room.adult}
                onIncrement={() => handleIncrement(index, "adult")}
                onDecrement={() => handleDecrement(index, "adult")}
              />
              <Counter
                name="Children"
                count={room.child}
                onIncrement={() => handleIncrement(index, "child")}
                onDecrement={() => handleDecrement(index, "child")}
              />
              {/* <button onClick={() => removeRoom(index)}>Remove Room</button> */}
              
      <div className="border-bottom-light mt-24 mb-24" />
            </div>
          ))}
          <button onClick={addRoom}>Add Room</button>
        </div>
      </div>
    </div>
  );
};

export default GuestSearch;
