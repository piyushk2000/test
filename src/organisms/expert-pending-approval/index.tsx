import Grid from '@mui/material/Grid'
import PageLayout from '../../atoms/page-layout'
import ExpertPendingApprovalHeader from '../../molecules/app-bars/expert-pending-approval'
import EducationalInfoPendingApproval from '../../molecules/expert-pending-approval/educational-info'
import { GetExpertFormatData } from './helper'
import PublicationInfoPendingApproval from '../../molecules/expert-pending-approval/publication-info'
import PatentInfoPendingApproval from '../../molecules/expert-pending-approval/patent-info'
import AwardsInfoPendingApproval from '../../molecules/expert-pending-approval/awards-info'
import WebHandleInfoPendingApproval from '../../molecules/expert-pending-approval/web-handle'
import PersonalInfoPendingApproval from '../../molecules/expert-pending-approval/personal-info'
import BasicInfoPendingApproval from '../../molecules/expert-pending-approval/basic-info'
import { APIRoutes } from '../../constants'
import { useGetParams } from '../../utils/hooks/useGetParams'
import { useFetch } from '../../utils/hooks/useFetch'
import { EXPERT_DETAILS } from '../../pages/Experts/types'
import { ExpertPendingApprovals } from './type'
import { ExpertPendingApprovalsContext } from './context'
import SkeletonLoader from '../../atoms/project-details/SkeletonLoader'
import NoResultFoundFilters from '../../atoms/noResultsFilters'
import ExperiencePendingApproval from '../../molecules/expert-pending-approval/Experience'
import { isExpert } from '../../utils/role'
import AboutInfoPendingApproval from '../../molecules/expert-pending-approval/about-info'
import FullPageLoading from '../../atoms/full-page-loading'
import ProfileSection from '../../molecules/expert-profile-sections/profile-section/ProfileSection'
import { Box } from '@mui/material'

const ExpertPendingApproval = () => {
    const expert_id = useGetParams("id");
    const loggedIn_expert_id = localStorage.getItem("expert_id");
    const isExpertLoggedIn = isExpert() ? expert_id === loggedIn_expert_id : true
    const { formattedData: data, refetch, setFormattedData: setData, data: defaultData, loading: dataLoading } = useFetch<EXPERT_DETAILS[], ExpertPendingApprovals>(`${APIRoutes.getExpert}?id=${expert_id}&embed=YES&stakeholders=YES`, {
        variables: [expert_id, isExpertLoggedIn],
        asyncFormatter: GetExpertFormatData,
    })

    if (!isExpertLoggedIn) {
        return <NoResultFoundFilters text={`You are not allowed to check other Expert's Pending Edits`} />
    }

    return (
        <PageLayout>
            <ExpertPendingApprovalsContext.Provider
                value={{
                    refetch,
                    setData
                }}
            >
                <FullPageLoading />
                <ExpertPendingApprovalHeader />
                {dataLoading &&
                    <Grid container mt={6} gap={"30px"}>
                        {[1, 2, 3].map((item, index) =>
                            <Grid item key={item + index} container xs={12} sx={{ borderRadius: "10px", margin: "1em" }}>
                                <SkeletonLoader width='100%' height='400px' />
                            </Grid>
                        )}
                    </Grid>
                }

                {data && !dataLoading &&
                    (defaultData?.length &&
                        (
                            (defaultData[0].pending_edits && data.profileEditLength) ?
                                <>
                                    <Box mt={6}>
                                        <ProfileSection
                                        hide_pending_edits = {true}
                                            // showSection={showElements.showAttachment}
                                            // showTimeline={showElements.showTimeline}
                                            apiData={data.expertProfileInfo}
                                        // handleShowImageDialogOpen={() =>
                                        //     setOpenDialog((prev) => ({ ...prev, showImage: true }))
                                        // }
                                        />
                                    </Box>

                                    <Grid container  gap={"30px"}>
                                        {data.personalInfo.default && data.personalInfo.new &&
                                            <PersonalInfoPendingApproval
                                                oldChanges={data.personalInfo.default}
                                                newChanges={data.personalInfo.new}
                                            />
                                        }
                                        {data.basicInfo.default && data.basicInfo.new &&
                                            <BasicInfoPendingApproval
                                                oldChanges={data.basicInfo.default}
                                                newChanges={data.basicInfo.new}
                                            />
                                        }
                                        {data.aboutInfo.default && data.aboutInfo.new &&
                                            <AboutInfoPendingApproval
                                                oldChanges={data.aboutInfo.default}
                                                newChanges={data.aboutInfo.new}
                                            />
                                        }
                                        {data.CompanyInfo.map((info, index) =>
                                            <ExperiencePendingApproval
                                                key={info.new.id + index}
                                                oldChanges={info.default}
                                                newChanges={info.new}
                                                showApprovDeclineBtn={index === 0} // only first change will be get approv and decline buttons
                                            />
                                        )}
                                        {data.educationInfo.default && data.educationInfo.new &&
                                            <EducationalInfoPendingApproval
                                                oldChanges={data.educationInfo.default}
                                                newChanges={data.educationInfo.new}
                                            />
                                        }
                                        {data.awardsInfo.default && data.awardsInfo.new &&
                                            <AwardsInfoPendingApproval
                                                oldChanges={data.awardsInfo.default}
                                                newChanges={data.awardsInfo.new}
                                            />
                                        }
                                        {data.publicationInfo.default && data.publicationInfo.new &&
                                            <PublicationInfoPendingApproval
                                                oldChanges={data.publicationInfo.default}
                                                newChanges={data.publicationInfo.new}
                                            />
                                        }
                                        {data.patentInfo.default && data.patentInfo.new &&
                                            <PatentInfoPendingApproval
                                                oldChanges={data.patentInfo.default}
                                                newChanges={data.patentInfo.new}
                                            />
                                        }

                                        {data.weHandleInfo.default && data.weHandleInfo.new &&
                                            <WebHandleInfoPendingApproval
                                                oldChanges={data.weHandleInfo.default}
                                                newChanges={data.weHandleInfo.new}
                                            />
                                        }
                                    </Grid>
                                </>
                                : <NoResultFoundFilters text='There are no more pending edits for approvals. You can close this tab.' />
                        )
                    )
                }
            </ExpertPendingApprovalsContext.Provider>
        </PageLayout>
    )
}

export default ExpertPendingApproval