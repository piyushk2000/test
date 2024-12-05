import ExpertPendingApproval from "..";
import { EXPERTPROFILEACTIONS } from "../../../organisms/expert-pending-approval/helper";
import { ProfileEdit, WebHandle, WebHandleInfo } from "../../../organisms/expert-pending-approval/type"
import WebHandleInfoChanges from "./changes";

interface Props {
    oldChanges: WebHandle[];
    newChanges: ProfileEdit<WebHandleInfo>;
}

const WebHandleInfoPendingApproval = ({ oldChanges, newChanges }: Props) => {

    return (
        <>
            {
                <ExpertPendingApproval
                    heading={EXPERTPROFILEACTIONS["WebHandleInfo"]}
                    OldChangesEl={oldChanges.length ? <WebHandleInfoChanges webHandles={oldChanges} /> : null}
                    NewChangesEl={newChanges.payload?.webhandles.length ? <WebHandleInfoChanges webHandles={newChanges.payload?.webhandles || []} /> : null}
                    payloadId={newChanges.id}
                    info_name="weHandleInfo"
                />
            }
        </>
    )
}

export default WebHandleInfoPendingApproval