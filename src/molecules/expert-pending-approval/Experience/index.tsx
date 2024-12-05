import ExpertPendingApproval from "..";
import { EXPERTPROFILEACTIONS } from "../../../organisms/expert-pending-approval/helper";
import { CompanyInfo, ProfileEdit } from "../../../organisms/expert-pending-approval/type"
import { WorkExperience } from "../../../pages/Experts/types";
import ExperienceInfoChanges from "./changes";

interface Props {
    oldChanges: WorkExperience | null;
    newChanges: ProfileEdit<CompanyInfo>;
    showApprovDeclineBtn: boolean;
}

const ExperiencePendingApproval = ({ oldChanges, newChanges, showApprovDeclineBtn }: Props) => {

    return (
        <>
            <ExpertPendingApproval
                heading={EXPERTPROFILEACTIONS["CompanyInfo"]}
                OldChangesEl={oldChanges ? <ExperienceInfoChanges experience={oldChanges} /> : null}
                NewChangesEl={
                    newChanges.payload?.companies[0]?.action !== "Delete" &&
                        newChanges.payload?.companies[0] ?
                        <ExperienceInfoChanges experience={newChanges.payload.companies[0]} />
                        : null}
                payloadId={newChanges.id}
                info_name="CompanyInfo"
                isAdded={!oldChanges}
                isDeleted={newChanges.payload?.companies[0]?.action === "Delete" || false}
                showApprovDeclineBtn={showApprovDeclineBtn}
            />
        </>
    )
}

export default ExperiencePendingApproval