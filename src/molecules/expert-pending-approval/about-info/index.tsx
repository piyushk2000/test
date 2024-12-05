import ExpertPendingApproval from "..";
import { EXPERTPROFILEACTIONS } from "../../../organisms/expert-pending-approval/helper";
import { AboutInfo, DefaultAboutInfo, ProfileEdit } from "../../../organisms/expert-pending-approval/type"
import AboutSection from "../../expert-profile-sections/about-section/AboutSection";

interface Props {
    oldChanges: DefaultAboutInfo;
    newChanges: ProfileEdit<AboutInfo>;
}

const AboutInfoPendingApproval = (props: Props) => {
    return (
        <ExpertPendingApproval
            heading={EXPERTPROFILEACTIONS["AboutInfo"]}
            OldChangesEl={<AboutSection apiData={props.oldChanges} />}
            NewChangesEl={<AboutSection apiData={props.newChanges.payload} />}
            payloadId={props.newChanges.id}
            info_name="basicInfo"
        />
    )
}

export default AboutInfoPendingApproval