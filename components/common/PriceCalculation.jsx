const PriceCalculation = (props) => {
  let totalPrice = props.basePrice;
  let totalMargine = 0;
  
  if (props.marginevalue > 0) {
    if (props.marginetype === "fix") {
      totalMargine = props.marginevalue;
      totalPrice = props.basePrice + totalMargine;
    } else if (props.marginetype === "perc") {
      totalMargine = (props.basePrice * props.marginevalue) / 100;
      totalPrice = props.basePrice + totalMargine;
    }
  }

  // Round the values to 2 decimal places
  totalMargine = totalMargine.toFixed(2);
  totalPrice = totalPrice.toFixed(2);

  return (
    <>
      <div className="text-18 lh-16 fw-500">{`Base ${props.basePrice}`}</div>
      {totalMargine > 0 ? <div className="text-18 lh-16 fw-500">{`Margin ${totalMargine}`}</div> : <></>}
      <div className="text-18 lh-16 fw-500">{`Total ${totalPrice}`}</div>
    </>
  );
};

export default PriceCalculation;
