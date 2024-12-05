import ExpertPendingApproval from "..";
import { EXPERTPROFILEACTIONS } from "../../../organisms/expert-pending-approval/helper";
import { BasicInfo, DefaultBasicInfo, ProfileEdit } from "../../../organisms/expert-pending-approval/type"
import BasicDetailSection from "../../expert-profile-sections/basic-details-section/BasicDetailSection";

interface Props {
    oldChanges: DefaultBasicInfo;
    newChanges: ProfileEdit<BasicInfo>;
}

const BasicInfoPendingApproval = (props: Props) => {
    return (
        <ExpertPendingApproval
            heading={EXPERTPROFILEACTIONS["BasicInfo"]}
            OldChangesEl={<BasicDetailSection apiData={props.oldChanges} show_price show_geos />}
            NewChangesEl={<BasicDetailSection apiData={props.newChanges.payload} show_price show_geos />}
            payloadId={props.newChanges.id}
            info_name="basicInfo"
        />
    )
}

export default BasicInfoPendingApproval