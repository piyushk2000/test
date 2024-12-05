import { isEqual } from "lodash";
import { isdValues } from "./isdCodes";
import { HOSTURL_LOCAL } from "./services";
import dayjs, { LocalDayjs } from "./timezoneService";

export function removeDuplicates<T>(arr: T[]): T[] {
  const uniqueSet = new Set<T>();
  const result: T[] = [];

  for (const item of arr) {
    if (!uniqueSet.has(item)) {
      uniqueSet.add(item);
      result.push(item);
    }
  }
  return result;
}


export function removeDuplicatesObjects<T>(arr: T[]): T[] {
  const uniqueSet = new Set<string>();
  const result: T[] = [];

  for (const item of arr) {
    const itemString = JSON.stringify(item);
    if (!uniqueSet.has(itemString)) {
      uniqueSet.add(itemString);
      result.push(item);
    }
  }
  return result;
}


export function getIsdValue(isd_code: string | null) {
  if (!isd_code) {
    return null;
  }

  const isd = isdValues.find((isdCode) => isdCode.dial_code === isd_code);

  if (isd) {
    return {
      value: isd.dial_code,
      label: isd.dial_code,
      name: `${isd.name.toLocaleLowerCase()} (${isd.dial_code})`,
    };
  }

  return null;
}

export const getPhoneISDValue = (number: string) => {
  let isd_code = null;
  let primary_mobile = number.split(" ")[1];
  if (primary_mobile) {
    isd_code = getIsdValue(number.split(" ")[0]);
  } else {
    primary_mobile = number.split(" ")[0];
  }
  return { isd_code, primary_mobile };
};

/**
 * @param firstArr => First Array of Object
 * @param secondArr => Second Array of Object
 * @returns => 
      True  -> If both array with objects are same 
      False -> If both array with objects are different
 */
export function compareArrayWithObjects<T>(
  firstArr: Array<T>,
  secondArr: Array<T>
): boolean {
  if (firstArr.length !== secondArr.length) {
    return false;
  }

  for (let i = 0; i < firstArr.length; i++) {
    let isObjEqual = isEqual(firstArr[0], secondArr[0]);

    if (!isObjEqual) {
      return false;
    }
  }

  return true;
}

export function getParams(param: string) {
  // Get the query parameters from the current URL
  const queryParams = new URLSearchParams(window.location.search);
  const queryParam = queryParams.get(param);
  return queryParam;
}

export function checkAllValuesAreSame<T>(data: T[]): boolean {
  if (!data.length || data.length === 1) {
    return true;
  }

  const value = data[0];

  for (let i = 1; i < data.length; i++) {
    if (value !== data[i]) {
      return false;
    }
  }

  return true;
}

export function checkObjectValuesSame<T>(first: T, second: T): boolean {
  return isEqual(first, second);
}


export function projectIdEncoder(id: string) {
  let realId = parseInt(id);
  let bin = realId.toString(2);
  let hex = realId.toString(16);
  let encodedValue = bin.slice(0, 1) + hex + "_" + bin.slice(1)
  return window.btoa(encodedValue);
}

export function encode(str: string) {
  // Step - 1 => Generate a random number from 4 to 15
  const randomNumber = 4 + Math.floor(Math.random() * 12);

  // Step - 2 => Encode the str using btoa() randomNumber times
  let encodedStr = str;

  for (let i = 0; i < randomNumber; i++) {
    encodedStr = btoa(encodedStr);
  }

  // Step - 3 => Convert randomNumber to binary
  let binaryNumber = randomNumber.toString(2);
  binaryNumber = binaryNumber.padStart(4, '0');

  let finalEncodedStr = "";

  // Step - 4 => Insert binary number digits into every third position
  for (let i = 0; i < encodedStr.length; i++) {
    if (i % 3 === 0) {
      const binaryNumberIdx = i / 3;
      if (binaryNumberIdx < 4) {
        finalEncodedStr += binaryNumber[binaryNumberIdx];
      }
    }
    finalEncodedStr += encodedStr[i];
  }

  finalEncodedStr = 'v2___' + finalEncodedStr;

  return finalEncodedStr;
}

export function decode(encodedStr: string) {
  if (!encodedStr.startsWith("v2___")) {
    return atob(encodedStr);
  }

  encodedStr = encodedStr.slice(5);

  let binaryNumber = "";
  for (let i = 0; i < 4; i++) {
    binaryNumber += encodedStr[i * 4];
  }

  const randomNumber = parseInt(binaryNumber, 2);
  let str = "";
  for (let i = 0; i < encodedStr.length; i++) {
    if (i % 4 !== 0 || i > 12) {
      str += encodedStr[i];
    }
  }

  let decodedStr = str;
  for (let i = 0; i < randomNumber; i++) {
    decodedStr = atob(decodedStr);
  }

  return decodedStr;
}

export function getDownloadUrl(
  title: string,
  columns_keys_arr: Array<string>,
  column_titles_arr: Array<string>,
  url_path: string,
  data_key?: string
) {
  const get_api_url = HOSTURL_LOCAL + url_path;
  const columns_keys = columns_keys_arr.join(",");
  const column_titles = column_titles_arr.join(",");
  const final_title = title;
  const token = localStorage.getItem("authToken");

  let url = `https://reports.simplifii.com/?data_key=${data_key || "data"}&sendinheader=token&auth_enabled=1&showTotalRowsCount=Total&report_title=${final_title}&truncate_text_view=40&columns_keys=${columns_keys}&column_titles=${column_titles}&token=${token}&get_api_url=${get_api_url}`;

  return url;
}


type FormData = {
  [key: string]: unknown; // or other types you expect in the form
};

export function removeWhiteSpacesFromForm<T extends FormData>(formData: T, excludeArray: (keyof T)[]): T {
  // Create a shallow copy of the formData to avoid mutating the original object
  const newForm = { ...formData };

  // Iterate over the keys of the newForm object
  (Object.keys(newForm) as Array<keyof T>).forEach((key) => {
    // Check if the key is not in the excludeArray
    if (!excludeArray.includes(key)) {
      // Check if the value is a string
      if (typeof newForm[key] === 'string') {
        // Trim the whitespace from the string value
        newForm[key] = (newForm[key] as string).trim().replace(/\s+/g, ' ') as T[keyof T];
      }
    }
  });

  return newForm;
}

// export function dateDifference(date1: string, date2: string, giveStr?: boolean, isUs?:boolean) {
//   const start = LocalDayjs(date1)
//   const end = LocalDayjs(date2)

//   const diff = dayjs.duration(end.diff(start))

//   const days = diff.days()
//   const hours = diff.hours()
//   const minutes = diff.minutes()
//   const month = diff.months()
//   const year = diff.years()

//   if(giveStr) {
//    return `${year} ${year > 1 ? "Years" : "Year"} ${month} ${month > 1 ? "Months" : "Month"} ${days} ${days > 1 ? "Days" : "Day"} ${hours} ${hours > 1 ? "hrs" : "hr"} ${minutes} ${minutes > 1 ? "Min" : "Min"}`
//   }

//   return { month, year,days, hours, minutes }
// }

export function dateDifference(date1: string, date2: string, giveStr?: boolean, isInternational?: boolean) {
  const start = dayjs(date1);
  const end = dayjs(date2);

  const shiftStart = isInternational? 18 : 9.30; // 9:30 AM
  const shiftEnd = shiftStart + 9 ;
  // const hoursPerDay = shiftEnd - shiftStart;

  let totalHours = 0;
  let currentDay = start.startOf('day');


  if(isInternational){
    while (currentDay.isSameOrBefore(end, 'day')) {
      if (currentDay.day() !== 0 && currentDay.day() !== 6) { // Exclude Saturday (6) and Sunday (0)
        let dayStart = currentDay.hour(shiftStart);
        let dayEnd = currentDay.hour(shiftEnd);
  
        if (currentDay.isSame(start, 'day')) {
          dayStart = start.isAfter(dayStart) ? start : dayStart;
        }
        if (currentDay.isSame(end, 'day')) {
          dayEnd = end.isBefore(dayEnd) ? end : dayEnd;
        }
  
        if (dayEnd.isAfter(dayStart)) {
          totalHours += dayEnd.diff(dayStart, 'hour', true);
        }
      }
      currentDay = currentDay.add(1, 'day');
    }

  } else{
    while (currentDay.isSameOrBefore(end, 'day')) {
      if (currentDay.day() !== 0 && currentDay.day() !== 6) { // Exclude Saturday (6) and Sunday (0)
        let dayStart = currentDay.hour(shiftStart);
        let dayEnd = currentDay.hour(shiftEnd);
  
        if (currentDay.isSame(start, 'day')) {
          dayStart = start.isAfter(dayStart) ? start : dayStart;
        }
        if (currentDay.isSame(end, 'day')) {
          dayEnd = end.isBefore(dayEnd) ? end : dayEnd;
        }
  
        if (dayEnd.isAfter(dayStart)) {
          totalHours += dayEnd.diff(dayStart, 'hour', true);
        }
      }
      currentDay = currentDay.add(1, 'day');
    }
  }




  const years = Math.floor(totalHours / (24 * 365));
  const months = Math.floor((totalHours % (24 * 365)) / (24 * 30));
  const days = Math.floor((totalHours % (24 * 30)) / 24);
  const hours = Math.floor(totalHours % 24);
  const minutes = Math.round((totalHours % 1) * 60);

  if (giveStr) {
    let result = '';
    if (years > 0) {
      result += `${years} ${years > 1 ? "Years" : "Year"} `;
    }
    if (months > 0) {
      result += `${months} ${months > 1 ? "Months" : "Month"} `;
    }
    if (days > 0) {
      result += `${days} ${days > 1 ? "Days" : "Day"} `;
    }
    result += `${hours} ${hours > 1 ? "hrs" : "hr"} ${minutes} ${minutes > 1 ? "mins" : "min"}`;
    return result.trim();
  }



  return totalHours;
}

export const base64toBlob = (base64Data: string, contentType: string): Blob => {
  // Ensure the base64 string is clean
  const cleanedBase64 = base64Data.replace(/^data:application\/pdf;base64,/, "").replace(/\s/g, '');

  // Decode base64 using js-base64
  const byteCharacters = atob(cleanedBase64);

  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};