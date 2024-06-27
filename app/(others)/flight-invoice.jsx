import React from 'react';

function FlightInvoice({params}) {
  const handlePrint = () => {
    const printContents = document.getElementById('printContents').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };
  return (
    <React.Fragment>
    <div id="printContents">
      
      <table
        id="m_-4083228764771333293container"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style={{ width: '100%', margin: 0, padding: 0}}
      >
        <tbody>
          <tr>
            <td style={{ padding: '0 20px' }}>
              <table
                width="686"
                align="center"
                cellpadding="0"
                cellspacing="0"
                style={{
                  borderCollapse: 'collapse',
                  textAlign: 'left',
                  fontFamily: 'Arial,Helvetica,sans-serif',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  lineHeight: '13pt',
                  color: '#444444',
                  margin: '0 auto',
                }}
              >
                <tbody>
                  <tr style={{ background: '#ffffff'}}>
                    <td width="331" style={{ color: '#ffffff', padding: '10px 0' }}>
                      <img
                        alt="logo"
                        height="65"
                        src="/img/general/SkySun.png"
                        className="CToWUd"
                        data-bit="iit"
                        jslog="138226; u014N:xr6bB; 53:WzAsMl0."
                      />{' '}
                    </td>
                    <td width="41" style={{ color: '#ffffff', padding: '10px 20px' }}>
                      <img
                        height="65"
                        src="https://ci3.googleusercontent.com/meips/ADKq_NalQBnGKzXRAB9bwaW3I7GMLT85vncZKkHiR21IXMl9hRnAC1INCJPWx4rnytP7s6RPJvonXZ2as1IgIn8xnPLnLqbQLXuOgraz_C42ec4sUq5mBgGiD9m39b-KhRs5=s0-d-e1-ft#http://ota.travelcarma.com/Booking/Images/emailtemplate/vertical-line.png"
                        width="1"
                        className="CToWUd"
                        data-bit="iit"
                        jslog="138226; u014N:xr6bB; 53:WzAsMl0."
                      />{' '}
                    </td>
                    <td width="312" valign="bottom" style={{ padding: '35px 0', color: '#0d2857', textAlign: 'left' }}>
                      <span className="il">Flight</span> Invoice
                    </td>
                  </tr>
                </tbody>
              </table>

              <table
                width="686"
                align="center"
                cellpadding="0"
                cellspacing="0"
                style={{
                  borderCollapse: 'collapse',
                  textAlign: 'left',
                  fontFamily: 'Arial,Helvetica,sans-serif',
                  fontWeight: 'normal',
                  fontSize: '12px',
                  lineHeight: '15pt',
                  color: '#444444',
                  margin: '0 auto',
                }}
              >
                <tbody>
                  <tr>
                    <td
                      bgcolor="#0d2857"
                      style={{
                        color: '#ffffff',
                        padding: '5px 20px 5px 20px',
                        lineHeight: '100%',
                        fontSize: '15px',
                        fontWeight: 'bold',
                      }}
                      valign="top"
                    >
                      Your <span className="il">Booking</span> <span className="il">Confirmation</span>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#FFFFFF" height="0" style={{ fontSize: '2px', lineHeight: '0px' }} valign="top"></td>
                  </tr>
                  <tr>
                    <td
                      width="686"
                      bgcolor="#FFFFFF"
                      style={{
                        color: '#444444',
                        padding: '5px 20px 5px 20px',
                        lineHeight: '13pt',
                        backgroundColor: '#ffffff',
                        border: '1px solid #ebebeb',
                      }}
                      valign="top"
                    >
                      <strong>Dear {params.contactName},</strong> <br />
                      <br />
                      Thank you for <span className="il">booking</span> your <span className="il">Flight</span> <br />
                      <strong>Your Itinerary <span className="il">Booking</span> Number is: {params?.bookingRefNumber}</strong> <br />
                      <br />
                      If any issues arise with your reservation before or during your trip, please contact us immediately.
                    </td>
                  </tr>

                  <tr>
                    <td height="10"></td>
                  </tr>
                </tbody>
              </table>

              <table
                width="686"
                align="center"
                cellpadding="0"
                cellspacing="0"
                style={{
                  borderCollapse: 'collapse',
                  textAlign: 'left',
                  fontFamily: 'Arial,Helvetica,sans-serif',
                  fontWeight: 'normal',
                  fontSize: '12px',
                  lineHeight: '13pt',
                  color: '#444444',
                  margin: '0 auto',
                }}
              >
                <tbody>
                  <tr>
                    <td
                      bgcolor="#0d2857"
                      style={{
                        color: '#ffffff',
                        padding: '5px 20px 5px 20px',
                        lineHeight: '100%',
                        fontSize: '15px',
                        fontWeight: 'bold',
                      }}
                      valign="top"
                    >
                      Your <span className="il">Booking</span> Details
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#FFFFFF" height="0" style={{ fontSize: '2px', lineHeight: '0px' }} valign="top"></td>
                  </tr>
                  <tr>
                    <td
                      width="686"
                      bgcolor="#FFFFFF"
                      style={{
                        color: '#444444',
                        padding: '5px 20px 5px 20px',
                        lineHeight: '13pt',
                        backgroundColor: '#ffffff',
                        border: '1px solid #ebebeb',
                      }}
                      valign="top"
                    >
                      <strong>Flight:</strong> {params?.bookingResponse?.airBookingList?.airReservation?.airItinerary?.bookOriginDestinationOptions?.bookOriginDestinationOptionList[0].bookFlightSegmentList?.flightSegment?.departureAirport?.locationName + " To " + params?.bookingResponse?.airBookingList?.airReservation?.airItinerary?.bookOriginDestinationOptions?.bookOriginDestinationOptionList[0].bookFlightSegmentList?.flightSegment?.arrivalAirport?.locationName} <br />
                      <strong>Flight Number:</strong> {params?.bookingResponse?.airBookingList?.airReservation?.airItinerary?.bookOriginDestinationOptions?.bookOriginDestinationOptionList[0].bookFlightSegmentList?.flightSegment?.flightNumber} <br />
                      <strong>Class:</strong> {params?.bookingResponse?.airBookingList?.airReservation?.airItinerary?.bookOriginDestinationOptions?.bookOriginDestinationOptionList[0].bookFlightSegmentList?.bookingClass?.cabin} <br />
                      <strong>Departure:</strong> {new Intl.DateTimeFormat('en-US', {
                                          weekday: 'short',
                                          month: 'short',
                                          day: 'numeric',
                                          year: 'numeric',
                                          hour: 'numeric',
                                          minute: 'numeric'
                                        }).format(new Date(params?.bookingResponse?.airBookingList?.airReservation?.airItinerary?.bookOriginDestinationOptions?.bookOriginDestinationOptionList[0].bookFlightSegmentList?.flightSegment?.departureDateTime))} <br />
                      <strong>Arrival:</strong> {new Intl.DateTimeFormat('en-US', {
                                          weekday: 'short',
                                          month: 'short',
                                          day: 'numeric',
                                          year: 'numeric',
                                          hour: 'numeric',
                                          minute: 'numeric'
                                        }).format(new Date(params?.bookingResponse?.airBookingList?.airReservation?.airItinerary?.bookOriginDestinationOptions?.bookOriginDestinationOptionList[0].bookFlightSegmentList?.flightSegment?.arrivalDateTime))} <br />
                      <strong>Baggage:</strong> {params?.bookingResponse?.airBookingList?.airReservation?.airItinerary?.bookOriginDestinationOptions?.bookOriginDestinationOptionList[0].bookFlightSegmentList?.fareInfo?.fareBaggageAllowance?.maxAllowedPieces + " " + params?.bookingResponse?.airBookingList?.airReservation?.airItinerary?.bookOriginDestinationOptions?.bookOriginDestinationOptionList[0].bookFlightSegmentList?.fareInfo?.fareBaggageAllowance?.allowanceType + "("+ params?.bookingResponse?.airBookingList?.airReservation?.airItinerary?.bookOriginDestinationOptions?.bookOriginDestinationOptionList[0].bookFlightSegmentList?.fareInfo?.fareBaggageAllowance?.maxAllowedWeight.weight + " " + params?.bookingResponse?.airBookingList?.airReservation?.airItinerary?.bookOriginDestinationOptions?.bookOriginDestinationOptionList[0].bookFlightSegmentList?.fareInfo?.fareBaggageAllowance?.maxAllowedWeight.unitOfMeasureCode + ")"} <br />
                    </td>
                  </tr>
                  <tr>
                    <td height="10"></td>
                  </tr>
                </tbody>
              </table>

              <table
                width="686"
                align="center"
                cellpadding="0"
                cellspacing="0"
                style={{
                  borderCollapse: 'collapse',
                  textAlign: 'left',
                  fontFamily: 'Arial,Helvetica,sans-serif',
                  fontWeight: 'normal',
                  fontSize: '12px',
                  lineHeight: '13pt',
                  color: '#444444',
                  margin: '0 auto',
                }}
              >
                <tbody>
                  <tr>
                    <td
                      bgcolor="#0d2857"
                      style={{
                        color: '#ffffff',
                        padding: '5px 20px 5px 20px',
                        lineHeight: '100%',
                        fontSize: '15px',
                        fontWeight: 'bold',
                      }}
                      valign="top"
                    >
                      Price Details
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#FFFFFF" height="0" style={{ fontSize: '2px', lineHeight: '0px' }} valign="top"></td>
                  </tr>
                  <tr>
                    <td
                      width="686"
                      bgcolor="#FFFFFF"
                      style={{
                        color: '#444444',
                        padding: '5px 20px 5px 20px',
                        lineHeight: '13pt',
                        backgroundColor: '#ffffff',
                        border: '1px solid #ebebeb',
                      }}
                      valign="top"
                    >
                      <strong>Base Price:</strong> {params?.bookingResponse?.airBookingList?.ticketInfo?.ticketItemList?.pricingInfo?.baseFare?.amount?.currency?.code + " " + params?.bookingResponse?.airBookingList?.ticketInfo?.ticketItemList?.pricingInfo?.baseFare?.amount?.value} <br />
                      <strong>Tax:</strong> {params?.bookingResponse?.airBookingList?.ticketInfo?.ticketItemList?.pricingInfo?.taxes?.totalAmount?.currency?.code + " " + params?.bookingResponse?.airBookingList?.ticketInfo?.ticketItemList?.pricingInfo?.taxes?.totalAmount?.value} <br />
                      <strong>Total:</strong> {params?.bookingResponse?.airBookingList?.ticketInfo?.ticketItemList?.totalAmountText} <br />
                    </td>
                  </tr>
                  <tr>
                    <td height="10"></td>
                  </tr>
                </tbody>
              </table>

              <table
                width="686"
                align="center"
                cellpadding="0"
                cellspacing="0"
                style={{
                  borderCollapse: 'collapse',
                  textAlign: 'left',
                  fontFamily: 'Arial,Helvetica,sans-serif',
                  fontWeight: 'normal',
                  fontSize: '12px',
                  lineHeight: '15pt',
                  color: '#444444',
                  margin: '0 auto',
                }}
              >
                <tbody>
                  <tr>
                    <td bgcolor="#0d2857" style={{ color: '#ffffff', padding: '5px 20px 5px 20px', lineHeight: '100%' }} valign="top">
                      Customer Support & Contact Information
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#FFFFFF" height="0" style={{ fontSize: '2px', lineHeight: '0px' }} valign="top"></td>
                  </tr>
                  <tr>
                    <td
                      width="686"
                      bgcolor="#FFFFFF"
                      style={{
                        color: '#444444',
                        padding: '5px 20px 5px 20px',
                        lineHeight: '13pt',
                        backgroundColor: '#ffffff',
                        border: '1px solid #ebebeb',
                      }}
                      valign="top"
                    >
                      Should you have any questions about your reservation or need assistance, please feel free to contact us
                      at any time. <br />
                      <br />
                      <strong>Phone:</strong> 1234567890 <br />
                      <strong>Email:</strong> customercare@skysun.com <br />
                      <br />
                      <strong>Office Hours:</strong> Monday - Friday: 9:00 AM - 6:00 PM
                    </td>
                  </tr>
                  <tr>
                    <td height="10"></td>
                  </tr>
                </tbody>
              </table>

            </td>
          </tr>
        </tbody>
      </table>
      
    </div>
    <div><button onClick={handlePrint} className="button -md h-60 bg-blue-1 text-white" style={{ marginLeft: '45%' }}>Print</button></div>
    </React.Fragment>
  );
}

export default FlightInvoice;
