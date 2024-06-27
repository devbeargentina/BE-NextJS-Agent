
import { useDispatch, useSelector } from "react-redux";
import { flightAvailResult } from "@/features/hero/flightSlice";
import { useRouter } from "next/navigation";
import { updateFlightAvailRQ } from "@/features/hero/searchCriteriaSlice";

const Cabin = () => {
  //const [currentPage, setCurrentPage] = useState(1);
  const { flightAvailRQ } = useSelector((state) => state.searchCriteria);
  const { totalPages,filterParam } = useSelector((state) => state.flight);
  const dispatch = useDispatch();
  const router = useRouter();
  const handlePageClick = (cabimClass) => {
    
  const updateCabin = flightAvailRQ.filterParam.cabin;

  // Check if cabimClass exists in updateCabin
  const cabimClassExists = updateCabin.includes(cabimClass.toString());

  // Remove or add cabimClass based on its existence
  const updatedCabin = cabimClassExists
    ? updateCabin.filter((page) => page !== cabimClass.toString())
    : [...updateCabin, cabimClass.toString()];

dispatch(
  updateFlightAvailRQ({
    ...flightAvailRQ,
    filterParam: {
      ...flightAvailRQ.filterParam,
      cabin: updatedCabin,
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
        cabin: updatedCabin,
        pageNumber: 0,
      },
    },
    router,
    undefined,
  })
);
};
  
  const renderPage = (cabimClass, isActive = false) => {
    
    const className = `size-40 flex-center rounded-full cursor-pointer ${
      isActive ? "bg-dark-1 text-white" : ""
    }`;
    return (
      <div key={cabimClass} className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input type="checkbox" selected={flightAvailRQ.filterParam.cabin.includes(cabimClass)} onClick={() => handlePageClick(cabimClass)} />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">{cabimClass}</div>
          </div>
        </div>
        <div className="col-auto">
          <div className="text-15 text-light-1">92</div>
        </div>
      </div>
    );
  };
  const renderPages = () => {
   
    const pages = filterParam?.cabin.map((cabimClass) =>
      renderPage(cabimClass)
    );
    return pages;
  };
  return (
    <>
    {renderPages()}
    </>
  );
};

export default Cabin;
