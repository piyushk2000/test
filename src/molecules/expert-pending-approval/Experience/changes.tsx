import { Typography } from "@mui/material";
import { Company } from "../../../organisms/expert-pending-approval/type"
import { WorkExperience } from "../../../pages/Experts/types";
import { ChangeInfoStyles } from "../helper";
import { LocalDayjs } from "../../../utils/timezoneService";
import RichTextDisplayer from "../../../atoms/rich-text-editor/RichTextDisplayer";

type Props = {
    experience: WorkExperience | Company
}

const ExperienceInfoChanges = ({ experience }: Props) => {

    return (
        <div style={ChangeInfoStyles}>
            <div className="experience-detail">
                <div id="experiance-1">
                    <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                        {experience?.company}{experience?.location && `, ${experience?.location}`}
                    </Typography>
                    <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>
                        {experience?.designation}
                    </Typography>
                    {experience.start_date && (
                        <Typography sx={{ fontSize: "13px" }}>
                            {LocalDayjs(experience.start_date).format("MMM YYYY")}
                            {" - "}
                            {experience.currently_works_here
                                ? "Present"
                                : experience.end_date && LocalDayjs(experience.end_date).format("MMM YYYY")}
                        </Typography>
                    )}
                    <RichTextDisplayer text={experience?.job_description} />
                </div>
            </div>
        </div>
    )
}

export default ExperienceInfoChanges