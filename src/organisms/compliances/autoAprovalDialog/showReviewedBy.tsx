import BoxSpaceBtw from "../../../atoms/boxSpaceBtw";
import { isAdmin, isSuperAdmin } from "../../../utils/role";
import { LocalDayjs } from "../../../utils/timezoneService";


export default function ShowReviewedBy({ status, name, date }: { status: string, name: string, date: string }) {
    const is_admin = isAdmin() || isSuperAdmin();

    return (
        <div>
            <BoxSpaceBtw
                sx={{
                    "& p": {
                        fontSize: "14px",
                        fontWeight: "600"
                    },
                    backgroundColor: (status === "Approved" || status === "Auto-Approved") ? "var(--primary-color)" : "red",
                    padding: "1rem",
                    color:  (status === "Approved" || status === "Auto-Approved") ? "black" : "white",
                    borderRadius: "5px"
                }}
            >
                <p>{status === "Approved" ? 
                    "Approved By - " + name : 
                status === "Rejected" ? 
                    "Rejected By - " + name : 
                status === "Auto-Approved" ? 
                    is_admin ? "Auto Approved" : "Approved By - Infollion" : 
                status === "Auto-Rejected" ?
                    is_admin ? "Auto Rejected" : "Rejected by - Infollion" : ""}
                </p>
                <p>{LocalDayjs(date).format("DD/MM/YYYY")}</p>
            </BoxSpaceBtw>
        </div>
    )
}