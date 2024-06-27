import React from "react";

const Skeleton1 = () => {
  return (
    <div className="row mb-20 y-gap-10 items-center justify-between">
      <div className="col-lg-6 placeholder-glow">
        <span className="placeholder col-6"></span>
      </div>
      <div className="col-lg-2 p-0 text-right placeholder-glow">
        <span className="placeholder col-12"></span>
      </div>
    </div>
  );
};

const SkeletonFilter1 = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((item, index) => (
        <div key={index} className="mb-20" aria-hidden="true">
          <div className="col-lg-6 placeholder-glow">
            <span className="placeholder col-6"></span>
          </div>
          <div className="carsd-body">
            <h5 className="carsd-title placeholder-glow">
              <span className="placeholder col-6"></span>
            </h5>
            <p className="carsd-text placeholder-glow">
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8"></span>
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

const SkeletonMyBookings = () => {
  return (
    <>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <tr key={index} className="col-lg-12 placeholder-glow">
            <td>
              <span className="placeholder col-10"></span>
            </td>
            <td>
              <span className="placeholder col-10"></span>
            </td>
            <td>
              <span className="placeholder col-10"></span>
            </td>
            <td>
              <span className="placeholder col-10"></span>
            </td>
            <td className="lh-16">
              <span className="placeholder col-10"></span>
            </td>
            <td>
              <span className="placeholder col-10"></span>
            </td>
            <td>
              <span className="placeholder col-10"></span>
            </td>
            <td>
              <span className="placeholder col-10"></span>
            </td>
          </tr>
        ))}
        </>
  );
};

export { Skeleton1, SkeletonFilter1, SkeletonMyBookings };
