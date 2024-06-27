const PopularFacilities = ({hotel}) => {
  return (
    <>
      {hotel.features.some(feature => feature.name === "No Smoke") &&
        <div className="col-md-5">
          <div className="d-flex x-gap-15 y-gap-15 items-center">
            <i className="icon-no-smoke"></i>
            <div className="text-15">Non-smoking rooms</div>
          </div>
        </div>
      }
      {hotel.features.some(feature => feature.name === "WIFI") &&
        <div className="col-md-5">
          <div className="d-flex x-gap-15 y-gap-15 items-center">
            <i className="icon-wifi"></i>
            <div className="text-15">Free WiFi</div>
          </div>
        </div>  
      }
      {hotel.features.some(feature => feature.name === "Parking") &&
        <div className="col-md-5">
          <div className="d-flex x-gap-15 y-gap-15 items-center">
            <i className="icon-parking"></i>
            <div className="text-15">Parking</div>
          </div>
        </div>
      }
      {hotel.features.some(feature => feature.name === "kitchen") &&
        <div className="col-md-5">
          <div className="d-flex x-gap-15 y-gap-15 items-center">
            <i className="icon-kitchen"></i>
            <div className="text-15">Kitchen</div>
          </div>
        </div>
      }
      {hotel.features.some(feature => feature.name === "Living Room") &&
        <div className="col-md-5">
          <div className="d-flex x-gap-15 y-gap-15 items-center">
            <i className="icon-living-room"></i>
            <div className="text-15">Living Area</div>
          </div>
        </div>
      }
      {hotel.features.some(feature => feature.name === "Safe") &&
        <div className="col-md-5">
          <div className="d-flex x-gap-15 y-gap-15 items-center">
            <i className="icon-shield"></i>
            <div className="text-15">Safety &amp; security</div>
          </div>
        </div>
      }
      
    </>
  );
};

export default PopularFacilities;
