import Image from "next/image";

const Block1 = () => {
  return (
    <>
      <div className="col-lg-5">
        <h2 className="text-30 fw-600">About as - SkySun</h2>
        {/* <p className="mt-5">These popular destinations have a lot to offer</p> */}
        <p className="text-dark-1 mt-60 lg:mt-40 md:mt-10">
        SkySun emerged from the collaboration of three entrepreneurs with extensive experience in the tourism industry across different countries. United by the shared passion for delivering exceptional service to travelers seeking unforgettable experiences, these entrepreneurs initially focused their operations on destinations in the United States and Argentina. Subsequently, SkySun expanded its footprint with the inclusion of the Dominican Republic, further solidifying its presence in international destinations.
          <br />
          <br />
          The most noteworthy aspect of SkySun's services lies in its ability to provide competitive fares to the public. This advantage stems from the ownership of their own fleet of aircraft and an efficient network of transportation services, allowing the company to determine competitive prices without relying on external intermediaries. SkySun's logistical independence not only ensures greater operational flexibility but also contributes to the creation of attractive and accessible offerings for its customers. This comprehensive approach to service quality and financial efficiency positions SkySun as a leader in the industry, committed to providing exceptional travel experiences to its passengers.
        </p>
      </div>
      {/* End .col */}

      <div className="col-lg-6">
        <Image
          width={400}
          height={400}
          src="/img/pages/about/2.png"
          alt="image"
          className="rounded-4 w-100"
        />
      </div>
      {/* End .col */}
    </>
  );
};

export default Block1;
