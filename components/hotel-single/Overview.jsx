import React, { useState } from 'react';
// import $ from 'jquery'; // Import jQuery

const Overview = ({ hotel }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  let shortdesc = hotel.descriptions;
  if (hotel.descriptions.length > 200 && !showFullContent) {
    shortdesc = hotel.descriptions.substring(0, 200) + "...";
  }

  // const toggleContent = () => {
  //   if (showFullContent) {
  //     $(".overview").html(shortdesc);
  //     $(".showmore").html("Show More");
  //   } else {
  //     $(".overview").html(hotel.descriptions);
  //     $(".showmore").html("Show Less");
  //   }
  //   setShowFullContent(!showFullContent);
  // };

  return (
    <>
      <h3 className="text-22 fw-500 pt-40 border-top-light">Overview</h3>
      <p className="text-dark-1 text-15 mt-20 overview">{shortdesc}</p>
      {/* <a
        onClick={toggleContent}
        className="d-block text-14 text-blue-1 fw-500 underline mt-10 showmore"
      >
        {showFullContent ? 'Show Less' : 'Show More'}
      </a> */}
    </>
  );
};

export default Overview;
