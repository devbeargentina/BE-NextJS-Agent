import React from "react";
// import styles from "./style.module.css";
const Skeleton = () => {
  return (
    <>
      <div class="row mb-20 y-gap-10 items-center justify-between">
        <div class="col-lg-6  placeholder-glow">
          <span class="placeholder col-6"></span>
        </div>
        <div class="col-lg-2 p-0 text-right placeholder-glow">
          <span class="placeholder col-12"></span>
      </div>
    </div>
    <div className="col-12">
      {[1, 2, 3, 4, 5]?.map((item, index) => {
        return (
          // <p
          //   key={index}
          //   className={`card-text placeholder-glow  ${styles.marginButton}`}
          // >
          //   <span className={`placeholder col-2 ${styles.icon}`}></span>
          //   <span className="placeholder col-8"></span>
          //   <span className={`placeholder col-2 ${styles.icon_left}`}></span>
          //   <br />
          //   <br />
          //   <span className={`placeholder col-2 ${styles.icon}`}></span>
          //   <span className="placeholder col-8"></span>
          //   <span className={`placeholder col-2 ${styles.icon_left}`}></span>
          //   <br />
          // </p>
          <div key={index} className="card mb-20" aria-hidden="true">
            <div className="card-body">
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
            </div>
          </div>
        );
      })}
      </div>
    </>
  );
};

// export default Skeleton;

const SkeletonFilter = () => {
  return (
    <>
        {[1, 2, 3, 4, 5]?.map((item, index) => {
          return (
            <div key={index} className=" mb-20" aria-hidden="true">
            <div class="col-lg-6  placeholder-glow">
              <span class="placeholder col-6"></span>
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
          );
        })}
    </>
  );
};

export default SkeletonFilter; Skeleton;
