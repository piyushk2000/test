import { Dayjs } from "dayjs";
import { Call } from "../../pages/Call-calendar/type";
import { isAdmin, isClient, isExpert } from "../../utils/role";
import { CalendarEvent, DateType, Filters, MyCall, MyCalls } from "./types";
import { LocalDayjs } from "../../utils/timezoneService";
import { APIRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";
import { colorMapCalendar } from "../full-calendar/helper";
import { SetLogCallType } from "../../pages/project-calendar/type";
import { Groups } from "../admin/types";


type options = {
    label: string;
    value: String;
};

export function getTotalCalls(CallsDetails: MyCalls) {
    let totalCalls = 0;
    for (const value of Object.values(CallsDetails)) {
        totalCalls += value.length;
    }

    return totalCalls;
}

export const ArrangeOptions = [
    {
        label: "Day",
        value: "Day"
    },
    {
        label: "Week",
        value: "Week"
    },
    {
        label: "Month",
        value: "Month"
    }
];

export const statusFilter = () => (isClient() || isExpert()) ?
    [{
        label: "Completed",
        value: "Logged",
        color: "Green"
    },
    {
        label: "Scheduled",
        value: "Pending,Scheduled",
        color: "#ec9324"
    }] :
    [
        {
            label: "Logged",
            value: "Logged",
            color: "Green"
        },
        {
            label: "Pending",
            value: "Pending",
            color: "Blue"
        },
        {
            label: "Scheduled",
            value: "Scheduled",
            color: "#ec9324"
        }
    ]

export const isEmpty = (callDetails: Record<string, Array<Call>>) => {
    return Object.values(callDetails).filter((call) => call.length).length;
}

export function formatDate(arrange_tag: string, date: DateType, days_call: string[]) {
    if (!date) {
        return "";
    }
    const day_date = LocalDayjs(date.toString()).format("DD/MM/YYYY")
    if(arrange_tag === 'Day') return day_date;
    
    const call_days = days_call.filter((c) => c !== "Other");
    const isSameWeek = parseInt(LocalDayjs(call_days[0]).format("MM")) - parseInt(LocalDayjs(call_days[call_days.length - 1]).format("MM")) === 0 ? true : false;
    const sameWeekDate = `${LocalDayjs(call_days[0]).format("DD")} - ${LocalDayjs(call_days[call_days.length - 1]).format("DD")} ${LocalDayjs(call_days[0]).format("MMM")}`
    const diffWeekDate = `${LocalDayjs(call_days[0]).format("DD / MMM")} - ${LocalDayjs(call_days[call_days.length - 1]).format("DD / MMM")}`
    const week_date = call_days.length ?
        isSameWeek ? sameWeekDate : diffWeekDate :
        ""

    return arrange_tag === "Day" ? day_date : week_date
}

export async function getClientContacts(search: string) {

    let url = APIRoutes.clientContactUrl

    const response = await RequestServer(
        url + "?search=" + search,
        "GET"
    );
    if (response.success) {
        const companiesData: any = response?.data;
        const finalExpertData: options[] = [];

        companiesData.forEach((company: any) => {
            const label = company.salutation + " " + company.name + " - " + company.email;
            finalExpertData.push({
                label: label,
                value: company.id,
            });
        });

        return finalExpertData;
    } else {
        return [];
    }
}

export function formatScheduleCalls(calls: MyCalls): CalendarEvent[] {
    if (!calls) return [];

    return Object.values(calls).reduce(
        (formattedData: CalendarEvent[], currentCall) => {
            const currentCallData = currentCall.map((callData) => ({
                title: callData.title
                    ? `${callData.title} (${callData.fk_expert_value?.name})`
                    : callData.fk_expert_value?.name,
                start: callData.scheduled_start_time,
                end: callData.scheduled_end_time,
                type: "Call",
                id: `${callData.id}`,
                backgroundColor: callData.status == 'Scheduled' ? colorMapCalendar["Scheduled Call"] : callData.status == 'Completed' || callData.status == 'Confirmed' || callData.status == 'Paid' || callData.status == 'Payment Requested' ? colorMapCalendar["Completed Call"] : 'white',
            }));

            return [...formattedData, ...currentCallData];
        },
        []
    );
}

export function getCallFromId(
    calls: MyCalls | null,
    id: number
): MyCall | undefined {
    if (!calls) return undefined;
    const flattenderData = Object.values(calls).flat();
    return flattenderData.find((callData) => callData.id === id);
}

export const openLogCallDialog = async (setLogCall: SetLogCallType, expert_id: string, call_id: number,fk_pe: number, fk_project_value: any, groupData: Groups | null, refetchCallsDetails:() => Promise<void>) => {
    const pe_id = fk_pe.toString();
    const loggedInUserId = localStorage.getItem("id") || "";
    const is_account_manager = +loggedInUserId === fk_project_value.account_manager;
    const fk_group = fk_project_value.fk_group;
    const current_group_Data = groupData?.find((g: any) => g.id === fk_group);
    const is_group_admin = !!current_group_Data?.sublabel.split(",").find((g: string) => g === loggedInUserId);

    setLogCall(() => ({
        state: true,
        expert_id,
        project_id: fk_project_value.id,
        isChange: false,
        refetch: refetchCallsDetails,
        pe_id,
        is_account_manager,
        is_group_admin,
        selected_call: call_id
    }))
}