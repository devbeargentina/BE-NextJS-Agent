
const ContactInfoCol2 = () => {
  const contactContent11 = [
    {
      id: 1,
      title: "Important data",
      action: "Seller of Travel USA:",
      text: "ST44048",
      action1: "Member Agency CLIA:",
      text1: "Id 00043617",
    }];
    const contactContent12 = [
    {
      id: 2,
      action: "Company USA:",
      text: "SKYSUN CORPORATE",
      action1: "Razon social ARG:",
      text1: "SKYSUN S.A.",
    },
  ];
  const contactContent13 = [
  {
    id: 3,
    action: "CUIT:",
    text: "30-71845865-6",
  },
];
  return (
    <>
    <div className="col-sm-12 text-16"><div className="fw-700 mb-2 text-20">Important data</div>
      {contactContent11.map((item) => (
        <>
        <span className="fw-700 ">Seller of Travel USA:</span> 
          <a href={item.action} className=" ms-2 mt-5">
            {item.text}
          </a>
          {item.text1 ? <><br /><span className="fw-700 ">Member Agency CLIA:</span><a href={item.action1} className="ms-2 mt-5">
            {item.text1}
          </a></> : <></>}
        </>
      ))}<br />
      {contactContent12.map((item) => (
        <>
        <span className="fw-700 ">Company USA:</span>  
          <a href={item.action} className="fw-700 ms-2 mt-5">
            {item.text}
          </a>
          {item.text1 ? <><br /><span className="fw-700 ">Razon social ARG:</span> <a href={item.action1} className="fw-700 ms-2 mt-5">
            {item.text1}
          </a></> : <></>}
        </>
      ))}<br />
      {contactContent13.map((item) => (
        <>
        <span className="fw-700 ">CUIT:</span> 
          <a href={item.action} className="ms-2 mt-5">
            {item.text}
          </a>
        </>
      ))}
      </div>
    </>
  );
};

export default ContactInfoCol2;
