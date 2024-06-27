import { HOTEL_PARTNER_BASE_URL } from "./constants";

export const getHoursAndMintues = (dateTimeString) => {
  if (dateTimeString) {
    const date = new Date(dateTimeString);
    const hours = date.getUTCHours() + 2; // Get the hours (in 24-hour format)
    const minutes = date.getMinutes();
    return `${countInt(hours)}:${countInt(minutes)}`;
  }
};

/**
 *
 * @param {*} dateTimeString
 * @returns
 */

// format Sat, Mar 26
export const getDayAndDate = (dateTimeString) => {
  if (dateTimeString) {
    let departureDate = new Date(dateTimeString);
    let options = { weekday: "short", month: "short", day: "numeric" };
    let formattedDate = departureDate.toLocaleDateString("en-US", options);
    return formattedDate;
  }
};

export const convertMinutesToHoursAndMinutes = (minutes) => {
  if (minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  }
};

export const calculateArrivalTime = (minutes, departureTime) => {
  if (minutes) {
    const date = new Date(departureTime);
    let departHours = date.getUTCHours() + 2; // Get the hours (in 24-hour format)
    let departMinutes = date.getMinutes();
    let hours = departHours + Math.floor(minutes / 60);
    let remainingMinutes = departMinutes + (minutes % 60);
    // if (remainingMinutes === 60) {
    //   hours += 1;
    //   remainingMinutes = remainingMinutes - 60;
    // }
    let temp = 0;
    for (let index = 0; index < remainingMinutes; index++) {
      if (index === 60) {
        temp += 1;
        remainingMinutes = remainingMinutes - 60;
      }
    }

    return `${hours}:${remainingMinutes}`;
  }
};

export const centsToDollars = (cents) => {
  if (cents) {
    var dollars = cents / 100; // Divide cents by 100 to get dollars
    return dollars.toFixed(2); // Convert to a string with 2 decimal places
  }
};

export const countIntLength = (int) => {
  if (int) {
    let numStr = int.toString();
    let num = numStr?.length === 1 ? `0${int}` : int;
    return num;
  }
};

export const countInt = (int) => {
  let numStr = int.toString();
  let num = numStr?.length === 1 ? `0${int}` : int;

  return num;
};
/**
 *
 * @param {*} stars
 * @returns
 */
export const getStars = (stars) => {
  const starElements = [];
  for (let i = 0; i < 5; i++) {
    let ele = i < stars;
    if (ele) {
      starElements.push(true);
    } else {
      starElements.push(false);
    }
  }
  return starElements;
};

/**
 *
 * @param {*} checkIn
 * @param {*} checkOut
 * @param {*} children
 * @param {*} adults
 * @param {*} hotelId
 * @param {*} locationId
 * @param {*} marker
 * @returns
 */
export const generateHotelReservationURL = (
  checkIn,
  checkOut,
  children,
  adults,
  hotelId,
  locationId,
  marker
) => {
  let url;
  if (children == "0") {
    url = `${HOTEL_PARTNER_BASE_URL}language=en&checkIn=${checkIn}&cy=USD&children=&marker=${marker}&transparent=1&adults=${adults}&locationId=${locationId}&checkOut=${checkOut}&hotelId=${hotelId}`;
  } else {
    url = `${HOTEL_PARTNER_BASE_URL}language=en&checkIn=${checkIn}&cy=USD&children=${getChildrenParamsFormat(
      children
    )}&marker=${marker}&transparent=1&adults=${adults}&locationId=${locationId}&checkOut=${checkOut}&hotelId=${hotelId}`;
  }
  return url;
};

/**
 *
 * @param {*} number
 * @returns
 */
export const getChildrenParamsFormat = (number) => {
  let format = "";
  let num = Number(number);

  for (let index = 0; index < num; index++) {
    if (index + 1 === num) {
      format += `0`;
    } else {
      format += `0%2C`;
    }
  }
  return format;
};

/**
 *
 * @param {*} rating
 * @returns
 */
export const formatRating = (rating) => {
  return (rating / 10)?.toFixed(1);
};

/**
 *
 * @param {*} list
 * @param {*} matchKeyword
 * @param {*} searchKeywrod
 * @returns
 */
export const getStopsFlightList = (list, matchKeyword, searchKeywrod) => {
  if (list?.length && matchKeyword) {
    let filter = list?.filter((item) => item?.[matchKeyword] === searchKeywrod);
    return filter?.length;
  }
};

export const getGreatherThanTwoStopsFlightList = (
  list,
  matchKeyword,
  searchKeywrod
) => {
  if (list?.length && matchKeyword) {
    let filter = list?.filter((item) => item?.[matchKeyword] >= searchKeywrod);
    return filter?.length;
  }
};
