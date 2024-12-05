import { Dayjs } from "dayjs";
import { APIRoutes } from "../../../constants";
import { RequestServer } from "../../../utils/services";
import { LocalDayjs } from "../../../utils/timezoneService";
import { removeDuplicates } from "../../../utils/utils";
import {
  BCGApiResponse,
  BCGCallData,
  BCGDataFile,
  ContactApiResponse,
  ContactDataItems,
  GetClientOfficeApiResponse,
  SetBCGData,
  SetClientProfileData,
  TableData,
} from "./types";

export const getAllClientOffice = async (
  id: string,
  setData: SetClientProfileData
) => {
  try {
    const response: GetClientOfficeApiResponse = await RequestServer(
      APIRoutes.clientOfficeUrl + "?client_id=" + id,
      "GET"
    );

    if (response.success) {
      setData((prev) => ({ ...prev, office_addresses: response.data }));
    }
  } catch (err) {
    console.log(err);
  }
};

export const getBCGData = async (
  clientId: string | null,
  setData: SetBCGData,
  setLoading: (l: boolean) => void,
  month_count: number
) => {
  if (!clientId) {
    return;
  }

  setLoading(true);
  try {
    let url = `${APIRoutes.scheduleCall}?show_columns=id,call_start_time,revenue_in_usd,fk_project,client_contact&notequalto___status=Scheduled`;
    url += "&greaterthanequalto___call_start_time=" + getMonth(month_count);
    url += "&fk_client=" + clientId;
    const response: BCGApiResponse = await RequestServer(url, "GET");

    if (response.success) {
      const responseContact: ContactApiResponse = await RequestServer(
        `${APIRoutes.clientContactUrl}?fkClient=${clientId}&show_columns=id,name,created_at`,
        "GET"
      );

      if (responseContact.success) {
        const data = getBCGFormattedData(
          response.data,
          responseContact.data,
          month_count
        );
        setData({
          total_POCs: responseContact.data.length,
          data: data,
          total_revenue:data.reduce((val: number, curr:BCGDataFile) => val + curr.total_revenue, 0),
          total_calls: data.reduce((val: number, curr:BCGDataFile) => val + curr.total_calls, 0)
        });
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};


export const getBCGDataBymonth = async (
  clientId: string | null,
  setData: SetBCGData,
  setLoading: (l: boolean) => void,
  startMonth: Date,
  endMonth: Date
) => {
  if (!clientId) {
    return;
  }

  setLoading(true);
  try {
    let url = `${APIRoutes.scheduleCall}?show_columns=id,call_start_time,revenue_in_usd,fk_project,client_contact&notequalto___status=Scheduled`;
    url += "&greaterthanequalto___call_start_time=" + getMonthFirst(startMonth);
    url += "&lessthanequalto___call_start_time=" + getMonthLast(endMonth);
    url += "&fk_client=" + clientId;
    const response: BCGApiResponse = await RequestServer(url, "GET");

    if (response.success) {
      const responseContact: ContactApiResponse = await RequestServer(
        `${APIRoutes.clientContactUrl}?fkClient=${clientId}&show_columns=id,name,created_at`,
        "GET"
      );

      if (responseContact.success) {
        const data = getBCGFormattedDataCustom(
          response.data,
          responseContact.data,
          getMonthsInvolved(startMonth, endMonth)
        );
        setData({
          total_POCs: responseContact.data.length,
          data: data,
          total_revenue:data.reduce((val: number, curr:BCGDataFile) => val + curr.total_revenue, 0),
          total_calls: data.reduce((val: number, curr:BCGDataFile) => val + curr.total_calls, 0)
        });
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

export function getBCGFormattedData(
  data: BCGCallData[],
  contactData: ContactDataItems[],
  month_count: number
) {
  const monthlyDataArray = generateMonthlyData(month_count);

  data.forEach((call) => {
    for (const mData of monthlyDataArray) {
      const call_date = LocalDayjs(call.call_start_time).format("MMM YYYY");
      const month_date = mData.month;
      if (call_date === month_date) {
        mData.total_calls++;
        mData.total_revenue += call.revenue_in_usd;
        mData.projects.push(call.fk_project);
        mData.client_contact.push(call.client_contact);
        break;
      }
    }
  });

  contactData.forEach((contact) => {
    for (const mData of monthlyDataArray) {
      const created_date = LocalDayjs(contact.created_at).format("MMM YYYY");
      const month = mData.month;
      const { name, id } = contact;

      if (created_date === month) {
        mData.POCs_added.push({
          label: name,
          value: id,
        });
      }
    }
  });

  // removing duplicate Projects
  monthlyDataArray.forEach((data) => {
    data.projects = removeDuplicates<number>(data.projects);
    data.client_contact = removeDuplicates<string>(data.client_contact);
  });

  return monthlyDataArray;
}

export function getBCGFormattedDataCustom(
  data: BCGCallData[],
  contactData: ContactDataItems[],
  totalMonth: any[]
) {
  const monthlyDataArray = generateMonthlyDataCustom(totalMonth);

  data.forEach((call) => {
    for (const mData of monthlyDataArray) {
      const call_date = LocalDayjs(call.call_start_time).format("MMM YYYY");
      const month_date = mData.month;
      if (call_date === month_date) {
        mData.total_calls++;
        mData.total_revenue += call.revenue_in_usd;
        mData.projects.push(call.fk_project);
        mData.client_contact.push(call.client_contact);
        break;
      }
    }
  });

  contactData.forEach((contact) => {
    for (const mData of monthlyDataArray) {
      const created_date = LocalDayjs(contact.created_at).format("MMM YYYY");
      const month = mData.month;
      const { name, id } = contact;

      if (created_date === month) {
        mData.POCs_added.push({
          label: name,
          value: id,
        });
      }
    }
  });

  // removing duplicate Projects
  monthlyDataArray.forEach((data) => {
    data.projects = removeDuplicates<number>(data.projects);
    data.client_contact = removeDuplicates<string>(data.client_contact);
  });

  return monthlyDataArray;
}

export function getMonth(backMonth: number) {
  const currentDate = LocalDayjs().startOf("month");

  const dateMonthsAgo = currentDate.subtract(backMonth, "month");

  return dateMonthsAgo.format("YYYY-MM-DD 00:00:00");
}

export function getMonthFirst(backMonth: Date) {
  const currentDate = LocalDayjs(backMonth);
  return currentDate.format("YYYY-MM-DD 00:00:00");
}

export function getMonthLast(backMonth: Date) {
  const currentDate = LocalDayjs(backMonth);
  return currentDate.format("YYYY-MM-DD 23:59:59");
}

export const generateMonthlyData = (totalMonth: number) => {
  const currentDate = LocalDayjs();
  const monthlyData: BCGDataFile[] = [];

  for (let i = 0; i < totalMonth; i++) {
    const monthData = {
      total_revenue: 0,
      total_calls: 0,
      projects: [],
      client_contact: [],
      POCs_added: [],
      month: currentDate.subtract(i, "month").format("MMM YYYY"),
      call_month_year: [
        currentDate.subtract(i, "month").format("MM"),
        currentDate.subtract(i, "month").format("YYYY"),
      ],
    };

    monthlyData.push(monthData);
  }

  return monthlyData;
};

export const getMonthsInvolved = (startDateStr: Date, endDateStr: Date) => {
  const startDate = LocalDayjs(startDateStr);
  const endDate = LocalDayjs(endDateStr);

  const months = [];
  let currentDate = startDate.startOf('month');

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'month')) {
    months.push({
      month: currentDate.format('MMM YYYY'), call_month_year: [
        currentDate.format("MM"),
        currentDate.format("YYYY"),
      ]
    });
    currentDate = currentDate.add(1, 'month');
  }

  console.log(startDateStr, endDateStr, months);

  return months.reverse();
}


export const generateMonthlyDataCustom = (totalMonth: any[]) => {
  const monthlyData: BCGDataFile[] = [];

  for (let i = 0; i < totalMonth.length; i++) {
    const monthData = {
      total_revenue: 0,
      total_calls: 0,
      projects: [],
      client_contact: [],
      POCs_added: [],
      month: totalMonth[i].month,
      call_month_year: totalMonth[i].call_month_year
    };

    monthlyData.push(monthData);
  }

  return monthlyData;
};

export const BCGClientFilters = [
  {
    label: "Last 6 months",
    value: "6",
  },
  {
    label: "Last 9 months",
    value: "9",
  },
  {
    label: "Last 12 months",
    value: "12",
  },
  {
    label: "Last 18 months",
    value: "18",
  },
  {
    label: "Last 24 months",
    value: "24",
  },
  {
    label: "Custom Date",
    value: "0",
  }
];


export function formatDataClientTable(data: any | null) {
  if (!data) return []


  let formattedData: TableData[] = data.map((item: any, index: number) => {

    return {
      id: index || 0 + 1 + Math.random(),
      month: item.month,
      total_revenue: item.total_revenue,
      total_calls: item.total_calls,
      projects: item.projects,
      client_contact: item.client_contact,
      POCs_added: item.POCs_added,
      call_month_year: item.call_month_year
    }
  });
  return formattedData;
}
