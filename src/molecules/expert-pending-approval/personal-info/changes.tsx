import { DefaultPersonalInfo, PersonalInfo } from "../../../organisms/expert-pending-approval/type"
import { TitleValueEl } from ".."
import { ChangeInfoStyles } from "../helper"
import { useIsMobile } from "../../../utils/hooks/useIsMobile"

type Props = {
    info: PersonalInfo | DefaultPersonalInfo
}

export const PersonalInfoChanges = ({ info }: Props) => {
    const isMobile = useIsMobile();

    return (
        <div style={ChangeInfoStyles}>
            <TitleValueEl
                title={"Name:"}
                value={info.name}
                minWidth={isMobile ? "100px" : "170px"}
            />
            <TitleValueEl
                title={"Date of Birth:"}
                value={info.dob}
                minWidth={isMobile ? "100px" : "170px"}
            />
            <TitleValueEl
                title="Additional Email One"
                value={info.additional_email_one}
                minWidth={isMobile ? "100px" : "170px"}
            />
            <TitleValueEl
                title="Additional Email Two"
                value={info.additional_email_two}
                minWidth={isMobile ? "100px" : "170px"}
            />
            <TitleValueEl
                title="Additional Mobile One"
                value={info.additional_mobile_one}
                minWidth={isMobile ? "100px" : "170px"}
            />
            <TitleValueEl
                title="Additional Mobile Two"
                value={info.additional_mobile_two}
                minWidth={isMobile ? "100px" : "170px"}
            />
        </div>
    )
}