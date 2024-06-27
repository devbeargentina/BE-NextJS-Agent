const ContactInfo = () => {
  const contactContent = [
    {
      id: 1,
      title: "Toll Free Customer Care",
      action: "tel:+1 (786) 840-0659",
      text: "+1 (786) 840-0659",
      action1: "tel:+1 (786) 840-0659",
      text1: "+1 (786) 840-0659",
    },
    {
      id: 2,
      title: "Need live support?",
      action: "mailto:xyz@abc.com",
      text: "sales@skysunmiami.com",
    },
  ];
  return (
    <>
      {contactContent.map((item) => (
        <div className="mt-30" key={item.id}>
          <div className={"text-14 mt-30"}>{item.title}</div>
          <a href={item.action} className="text-18 fw-500 text-white mt-5">
            {item.text}
          </a>
          {item.text1 ? <><br /><a href={item.action1} className="text-18 fw-500 text-dark-1 mt-5">
            {item.text1}
          </a></> : <></>}
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
