import Image from "next/image";

const ContactInfo = () => {
  const contactContent = [
    {
      id: 1,
      title: "Toll Free Customer Care",
      action: "tel:+1 (786) 840-0659",
      text: "+1 (786) 840-0659",
      action1: "tel:+54 (11) 524-62123",
      text1: "+54 (11) 524-62123",
    }];
    const contactContent1 = [
    {
      id: 2,
      title: "Sales",
      action: "mailto:xyz@abc.com",
      text: "+54 (9) 2995172856",
      action1: "mailto:xyz@abc.com",
      text1: "sales@skysunmiami.com",
    },
  ];
  return (
    <>
      {contactContent.map((item) => (
        <div className="col-sm-12 text-16" key={item.id}>
          <div className={"fw-700 mb-2 text-18"}>{item.title}</div>USA 
          <a href={item.action} className="fw-700 ms-2 mt-5">
            {item.text}
          </a>
          {item.text1 ? <><br />ARG<a href={item.action1} className="fw-700 ms-2 mt-5">
            {item.text1}
          </a></> : <></>}
        </div>
      ))}
      {contactContent1.map((item) => (
        <div className="col-sm-12  text-16" key={item.id}>
          <div className={"fw-700 mb-2 text-18"}>{item.title}</div><Image
                        width={25}
                        height={30}
                        src="/img/icons/WhatsApp.png"
                        alt="icon"
                      /> 
          <a href={item.action} className="fw-700 ms-2 mt-5">
            {item.text}
          </a>
          {item.text1 ? <><br /><Image
                        width={25}
                        height={30}
                        src="/img/icons/Email.png"
                        alt="icon"
                      /> <a href={item.action1} className="fw-700 ms-2 mt-5">
            {item.text1}
          </a></> : <></>}
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
