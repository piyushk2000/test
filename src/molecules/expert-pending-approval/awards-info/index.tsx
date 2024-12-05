import ExpertPendingApproval from "..";
import { EXPERTPROFILEACTIONS } from "../../../organisms/expert-pending-approval/helper";
import { Award, AwardsInfo, ProfileEdit } from "../../../organisms/expert-pending-approval/type"
import AwardSection from "../../expert-profile-sections/award-section/AwardSection";

interface Props {
    oldChanges: Award[];
    newChanges: ProfileEdit<AwardsInfo>;
}

const AwardsInfoPendingApproval = ({ oldChanges, newChanges }: Props) => {


    return (
        <>
            {
                (!oldChanges.length && !newChanges.payload?.awards.length) ? null :
                    <ExpertPendingApproval
                        heading={EXPERTPROFILEACTIONS["AwardsInfo"]}
                        OldChangesEl={oldChanges.length ? <AwardSection awards={oldChanges} /> : null}
                        NewChangesEl={newChanges.payload?.awards?.length ? <AwardSection awards={newChanges.payload.awards} /> : null}
                        payloadId={newChanges.id}
                        info_name="awardsInfo"
                    />
            }
        </>
    )
}

export default AwardsInfoPendingApproval