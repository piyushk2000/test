
import ExpertPendingApproval from "..";
import { EXPERTPROFILEACTIONS } from "../../../organisms/expert-pending-approval/helper";
import { DefaultPersonalInfo, PersonalInfo, ProfileEdit } from "../../../organisms/expert-pending-approval/type"
import { PersonalInfoChanges } from "./changes";

interface Props {
    oldChanges: DefaultPersonalInfo;
    newChanges: ProfileEdit<PersonalInfo>;
}

const PersonalInfoPendingApproval = (props: Props) => {
    return (
        <ExpertPendingApproval
            heading={EXPERTPROFILEACTIONS["PersonalInfo"]}
            OldChangesEl={<PersonalInfoChanges info={props.oldChanges} />}
            NewChangesEl={props.newChanges.payload && <PersonalInfoChanges info={props.newChanges.payload} />}
            payloadId={props.newChanges.id}
            info_name="personalInfo"
        />
    )
}

export default PersonalInfoPendingApproval