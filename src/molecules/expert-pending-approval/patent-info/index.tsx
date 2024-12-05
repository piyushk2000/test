import ExpertPendingApproval from "..";
import { EXPERTPROFILEACTIONS } from "../../../organisms/expert-pending-approval/helper";
import { Patent, PatentInfo, ProfileEdit } from "../../../organisms/expert-pending-approval/type"
import PatentSection from "../../expert-profile-sections/patent-section/patent";

interface Props {
    oldChanges: Patent[];
    newChanges: ProfileEdit<PatentInfo>;
}

const PatentInfoPendingApproval = ({ oldChanges, newChanges }: Props) => {


    return (
        <>
            {
                (!oldChanges?.length && !newChanges.payload?.patents.length) ? null :
                    <ExpertPendingApproval
                        heading={EXPERTPROFILEACTIONS["PatentInfo"]}
                        OldChangesEl={oldChanges?.length ? <PatentSection patents={oldChanges} showPatUrl /> : null}
                        NewChangesEl={newChanges.payload?.patents.length ? <PatentSection patents={newChanges.payload.patents} showPatUrl /> : null}
                        payloadId={newChanges.id}
                        info_name="patentInfo"
                    />
            }
        </>
    )
}

export default PatentInfoPendingApproval