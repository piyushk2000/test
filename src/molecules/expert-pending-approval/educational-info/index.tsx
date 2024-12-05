import ExpertPendingApproval from "..";
import { EXPERTPROFILEACTIONS } from "../../../organisms/expert-pending-approval/helper";
import { EducationInfo, ProfileEdit } from "../../../organisms/expert-pending-approval/type"
import EducationSection from "../../expert-profile-sections/education-section/EducationSection";

interface Props {
    oldChanges: EducationInfo["education"];
    newChanges: ProfileEdit<EducationInfo>;
}

const EducationalInfoPendingApproval = ({ oldChanges, newChanges }: Props) => {

    return (
        <>
            {
                (!oldChanges.length && !newChanges.payload?.education.length) ? null :
                    <ExpertPendingApproval
                        heading={EXPERTPROFILEACTIONS["EducationInfo"]}
                        OldChangesEl={oldChanges.length ? <EducationSection education_info={oldChanges} /> : null}
                        NewChangesEl={newChanges.payload?.education.length ? <EducationSection education_info={newChanges.payload.education} /> : null}
                        payloadId={newChanges.id}
                        info_name="educationInfo"
                    />
            }
        </>
    )
}

export default EducationalInfoPendingApproval