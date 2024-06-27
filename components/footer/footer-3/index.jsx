import AppButton from "./AppButton";
import ContactInfo from "./ContactInfo";
import Copyright from "./Copyright";
import FooterContent from "./FooterContent";
import Social from "../../common/social/Social";
import Subscribe from "./Subscribe";
import ContactInfoCol2 from "./ContactInfoCol2";
import ContactInfoCol3 from "./ContactInfoCol3";

const index = () => {
  return (
    <footer className="footer -type-2  text-dark-3 bg-light-2 12345"><section class="section-bg layout-pt-sm layout-pb-sm border-bottom-light border-danger">
    <div className="container">
        <div className="lg:row y-gap-40 sm:d-flex justify-between items-center">
          <div className="col-xl-4 col-lg-6 pt-1 pb-1">
            <img src="/img/general/SkySun.png" alt="image" />
          </div>
          {/* End .col */}

          <div className="col-lg-6 p-1">
                <div className="d-flex x-gap-20 justify-end items-center">
                  <Social />
                </div>
          </div>
          {/* End .col */}
        </div>
    </div>
    </section>
    <section class="section-bg layout-pt-sm layout-pb-sm">
      <div className="container">
          <div className="row y-gap-40 justify-between xl:justify-start">
            <div className="col-xl-4 col-lg-6">
              <div className="row y-gap-30 justify-between">
                <ContactInfo />
              </div>
            </div>
            {/* End .col */}

            <div className="col-xl-4 col-lg-6 123456">
              <div className="row y-gap-30 justify-between">
                <ContactInfoCol2 />
              </div>
            </div>
            <div className="col-xl-4 col-lg-6">
              <div className="row y-gap-30 justify-between">
                <ul type="disc" className=" text-dark-3" style={{listStyle:"disc"}}>
                  <li><a href="/about" className=" ms-2 mt-5">About us</a></li>
                  <li><a href="/about" className=" ms-2 mt-5">Privacy policy</a></li>
                  <li><a href="/about" className=" ms-2 mt-5">Terms of service</a></li>
                </ul>
                <ContactInfoCol3 />
              </div>
            </div>
            {/* End .col */}
          </div>
      </div>
      </section>
      {/* End container */}
    </footer>
  );
};

export default index;
