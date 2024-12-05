import { APIRoutes } from "../../../constants";
import { HOSTURL_LOCAL } from "../../../utils/services";
import { Participant } from "./types";

export const ZoomReportsFormat = (details: Participant[], index: number, zoomID: string) => {
    const data_key = `data[${index}]`;
    const sheet_title = "Report " + (index + 1); 

    return {
        sheet_title,
        apiUrl: HOSTURL_LOCAL + APIRoutes.getZoomReports + "?id=" + zoomID,
        data_key,
        res_data: details,
        hideExcelHeader: true,
        keyTitles: {
            name: "Name",
            duration: "Duration",
            join_time: "Join Time",
            leave_time: "Leave Time"
        }
    }
}