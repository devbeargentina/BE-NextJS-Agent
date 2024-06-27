import Stops from "../sidebar/Stops";
import Airlines from "../sidebar/Airlines";
import Alliance from "../sidebar/Alliance";
import DepartingFrom from "../sidebar/DepartingFrom";
import PirceSlider from "../sidebar/PirceSlider";
import ArrivingAt from "../sidebar/ArrivingAt";
import Cabin from "../sidebar/Cabin";
import SkeletonFilter from "@/components/common/skeletons/Skeleton";
import { useSelector } from "react-redux";

const Sidebar = (props) => {
  const { flightList,filterParam,loading } = useSelector((state) => state.flight);
  return (
    <>
    {true? <>
      <div className="sidebar__item -no-border">
        <h5 className="text-18 fw-500 mb-10">Stops</h5>
        <div className="sidebar-checkbox">
          <Stops />
        </div>
        {/* End Sidebar-checkbox */}
      </div>
      {/* End popular filter */}

      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Cabin</h5>
        <div className="sidebar-checkbox">
          <Cabin />
        </div>
        {/* End Sidebar-checkbox */}
      </div>
      {/* End Aminities filter */}

      <div className="sidebar__item pb-30">
        <h5 className="text-18 fw-500 mb-10">Price</h5>
        <div className="row x-gap-10 y-gap-30">
          <div className="col-12">
            <PirceSlider type={props.type} filterParam={props.filterParam} />
          </div>
        </div>
      </div>
      {/* End Nightly priceslider */}
{/* 
      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Airlines</h5>
        <div className="sidebar-checkbox">
          <Airlines />
        </div>
      </div> */}
      {/* End style filter */}

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Alliance</h5>
        <div className="sidebar-checkbox">
          <Alliance />
        </div>
      </div> */}
      {/* End CruiseStyle filter */}

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Departing from</h5>
        <div className="sidebar-checkbox">
          <DepartingFrom />
        </div>
      </div> */}
      {/* End Port filter */}

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Arriving at</h5>
        <div className="sidebar-checkbox">
          <ArrivingAt />
        </div>
      </div> */}
      {/* End Port filter */}
      </>:<SkeletonFilter /> }
    </>
  );
};

export default Sidebar;
