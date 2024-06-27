
import { useDispatch, useSelector } from "react-redux";
import { flightAvailResult } from "@/features/hero/flightSlice";
import { useRouter } from "next/navigation";
import { updateFlightAvailRQ } from "@/features/hero/searchCriteriaSlice";

const Stops = () => {
  //const [currentPage, setCurrentPage] = useState(1);
  const { flightAvailRQ } = useSelector((state) => state.searchCriteria);
  const { totalPages,filterParam } = useSelector((state) => state.flight);
  const dispatch = useDispatch();
  const router = useRouter();
  const handlePageClick = (cabimClass) => {
      const updateCabin = flightAvailRQ.filterParam.stops;
      const cabimClassExists = updateCabin.includes(cabimClass.toString());
      const updatedCabin = cabimClassExists
        ? updateCabin.filter((page) => page !== cabimClass.toString())
        : [...updateCabin, cabimClass.toString()];

    dispatch(
      updateFlightAvailRQ({
        ...flightAvailRQ,
        filterParam: {
          ...flightAvailRQ.filterParam,
          stops: updatedCabin,
          pageNumber: 0,
        },
      })
    );

    dispatch(
      flightAvailResult({
        flightAvailRQ: {
          ...flightAvailRQ,
          filterParam: {
            ...flightAvailRQ.filterParam,
            stops: updatedCabin,
            pageNumber: 0,
          },
        },
        router,
        undefined,
      })
    );
    };
  
  return (
    <>
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input type="checkbox" selected={flightAvailRQ.filterParam.cabin.includes("0")} onClick={() => handlePageClick("0")} />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">Nonstop</div>
          </div>
        </div>
        {/* <div className="col-auto">
          <div className="text-15 text-light-1">92</div>
        </div> */}
      </div>
      {/* End .row */}
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input type="checkbox" selected={flightAvailRQ.filterParam.cabin.includes("1")} onClick={() => handlePageClick("1")} />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">1 Stop</div>
          </div>
        </div>
        {/* <div className="col-auto">
          <div className="text-15 text-light-1">45</div>
        </div> */}
      </div>
      {/* End .row */}
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input type="checkbox" selected={flightAvailRQ.filterParam.cabin.includes("2")} onClick={() => handlePageClick("2")} />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">2+ Stops</div>
          </div>
        </div>
        {/* <div className="col-auto">
          <div className="text-15 text-light-1">21</div>
        </div> */}
      </div>
      {/* End .row */}
    </>
  );
};

export default Stops;
