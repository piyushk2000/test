import { useEffect, useState } from "react";
import DialogModal from "../../../atoms/dialog";
import AboutSection from "../../../molecules/expert-profile-sections/about-section/AboutSection";
import AwardSection from "../../../molecules/expert-profile-sections/award-section/AwardSection";
import BasicDetailSection from "../../../molecules/expert-profile-sections/basic-details-section/BasicDetailSection";
import EducationSection from "../../../molecules/expert-profile-sections/education-section/EducationSection";
import ExperienceSection from "../../../molecules/expert-profile-sections/experience-section/ExperienceSection";
import PatentSection from "../../../molecules/expert-profile-sections/patent-section/patent";
import ProfileSection from "../../../molecules/expert-profile-sections/profile-section/ProfileSection";
import PublicationSection from "../../../molecules/expert-profile-sections/publication-section/pubSection";
import { getAllProfileDetails } from "../../../organisms/expert-profile/helper";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import { CircularProgress } from "@mui/material";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    expert_id: number | null;
}

export function ExpertProfileDialog({ isOpen, handleClose, expert_id }: Props) {
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        if (isOpen && expert_id) {
            getAllProfileDetails(expert_id, setApiData);
        }
    }, [isOpen])

    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={"Expert Profile"}
        >
            {apiData ?
                <>
                    <ProfileSection
                        apiData={apiData}
                        handleShowImageDialogOpen={() => { }
                        }
                    />
                    <BasicDetailSection apiData={apiData} />
                    <AboutSection apiData={apiData} />
                    <ExperienceSection apiData={apiData} />
                    <EducationSection apiData={apiData} />
                    <AwardSection apiData={apiData} />
                    <PublicationSection apiData={apiData} />
                    <PatentSection apiData={apiData} />
                </> : 
                <CircularProgress sx={{mt: "10px"}}/>
            }
        </DialogModal>
    )
}