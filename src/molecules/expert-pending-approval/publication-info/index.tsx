import ExpertPendingApproval from "..";
import { EXPERTPROFILEACTIONS } from "../../../organisms/expert-pending-approval/helper";
import { ProfileEdit, Publication, PublicationInfo } from "../../../organisms/expert-pending-approval/type"
import PublicationSection from "../../expert-profile-sections/publication-section/pubSection";

interface Props {
    oldChanges: Publication[];
    newChanges: ProfileEdit<PublicationInfo>;
}

const PublicationInfoPendingApproval = ({ oldChanges, newChanges }: Props) => {

    return (
        <>
            {
                (!oldChanges.length && !newChanges.payload?.publications.length) ? null :
                    <ExpertPendingApproval
                        heading={EXPERTPROFILEACTIONS["PublicationInfo"]}
                        OldChangesEl={oldChanges.length ? <PublicationSection publications={oldChanges} showPubUrl /> : null}
                        NewChangesEl={newChanges.payload?.publications.length ? <PublicationSection publications={newChanges.payload.publications} showPubUrl /> : null}
                        payloadId={newChanges.id}
                        info_name="publicationInfo"
                    />
            }
        </>
    )
}

export default PublicationInfoPendingApproval