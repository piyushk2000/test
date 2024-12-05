import { TitleValueEl } from "..";
import { webPortalOptions } from "../../../organisms/expert-pending-approval/helper";
import { WebHandle } from "../../../organisms/expert-pending-approval/type"
import { ChangeInfoStyles } from "../helper";

type Props = {
    webHandles: WebHandle[];
}

const WebHandleInfoChanges = ({ webHandles }: Props) => {

    return (
        <div style={ChangeInfoStyles}>
            {webHandles.map((info, index) =>
                <TitleValueEl
                    title={webPortalOptions[info.portal]}
                    value={info.link}
                    key={info.portal + index}
                />
            )}

        </div>
    )
}

export default WebHandleInfoChanges