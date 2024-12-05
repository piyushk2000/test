import ProfileSharedHeader from "../../molecules/app-bars/profile-shared";
import "./style.scss";
import ProfilesSharedExperts from "./Main";
import { useGetParams } from "../../utils/hooks/useGetParams";
import { useSnackbar } from "notistack";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Expert, FilterPayload, PECompliance, ProjectDetails } from "./types";
import { ProfileSharedContext } from "./context";
import { applyStateFilter, getExpertData, getPeComplianceData, getDetails } from "./helper";
import { useBoolean } from "../../utils/hooks/useBoolean";
import ProfileSharedNavbar from "../../molecules/app-bars/profile-shared/navbar";
import WarningDialog from "../../molecules/form-close-warning";
import useModals from "../../utils/hooks/useModals";
import { useNavigate } from "react-router-dom";
import NoResultFoundFilters from "../../atoms/noResultsFilters";
import { decode } from "../../utils/utils";

export default function ProfileShared() {
  const secretCode = useGetParams("code");
  const project_id = useGetParams("project_id");
  const decodeString = secretCode && decode(secretCode);
  const projectId = decodeString && decodeString.split("_")[0] || project_id;
  const clientId = localStorage.getItem("client_id");
  const { enqueueSnackbar } = useSnackbar();
  const [filterPayload, setFilterPayload] = useState<FilterPayload>({
    state: "All",
    complianceChecked: false,
    isFilterChange: false,
    sort_by: "shared",
    date_url: null
  });
  const [FullExpertData, SetFullExpertData] = useState<Expert[] | null>(null);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(null);
  const [projectClientDetails, setProjectClientDetails] = useState<{
    isAllowed: boolean
  }>({ isAllowed: true });
  const [peComplianceData, setPeComplianceData] = useState<PECompliance>([])
  const { value: loading, setValue: setLoading } = useBoolean();
  const [expertData, setExpertData] = useState<Expert[] | null>(FullExpertData);
  const navigate = useNavigate()
  const [modalStates, modalAction] = useModals([
    "loginToContinueModal"
  ]);

  useEffect(() => {
    if (clientId && secretCode && decodeString) {
      const decoded_clientId = decodeString.split("_")[1];

      if (clientId !== decoded_clientId) {
        enqueueSnackbar("Login with correct user", {
          variant: "warning"
        })
        localStorage.clear();
        navigate("/login");
      }
    }
  }, [clientId, secretCode]);

  useEffect(() => {
    if (!loading) {
      applyStateFilter(filterPayload, FullExpertData, setExpertData, peComplianceData);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterPayload.state, filterPayload.complianceChecked, loading, filterPayload.sort_by,filterPayload.date_url]);

  const fetchData = async () => {
    await getExpertData(projectId, SetFullExpertData, setLoading, secretCode);
    projectId && await getPeComplianceData(projectId, setPeComplianceData, secretCode)
  }

  useEffect(() => {
    if (projectId) {
      getDetails(projectId, setProjectDetails, secretCode, fetchData, setProjectClientDetails);
    }
    //eslint-disable-next-line
  }, [projectId]);

  if (!projectId) {
    enqueueSnackbar("Project ID missing", { variant: "error" });
    return <></>;
  }

  if (!projectClientDetails.isAllowed) {
    enqueueSnackbar("Link expired", {
      variant: "error"
    })

    return <NoResultFoundFilters text="Link expired" />
  }

  return (
    <ProfileSharedContext.Provider value={{ filterPayload, setFilterPayload, expertData, loading, projectId, FullExpertData, projectDetails, projectClientDetails }}>
      <Box>
        <ProfileSharedHeader
          isAdvanceFilter={false}
          searchFilter={(text: string) => { }}
        />
        <ProfileSharedNavbar
          openLoginWarning={modalAction.loginToContinueModal.openModal}
        />

        <ProfilesSharedExperts refetch={fetchData} openLoginWarning={modalAction.loginToContinueModal.openModal} peComplianceData={peComplianceData} />
      </Box>
      <WarningDialog
        open={modalStates.loginToContinueModal}
        handleClose={modalAction.loginToContinueModal.closeModal}
        text="Please login to perform this action"
        yesLabel="Login with OTP"
        handleYesClick={() => {
          const redirect_url = window.location.pathname + window.location.search;
          if (redirect_url !== "/") {
            navigate(`/login/otp?redirect_url=${redirect_url}`);
          } else {
            navigate("/login/otp");
          }
        }
        }
      />
    </ProfileSharedContext.Provider>

  );
}