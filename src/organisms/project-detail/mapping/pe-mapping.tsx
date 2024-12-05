import { Grid, Typography, Box, Chip } from "@mui/material";
import MappingContainer from "../../../atoms/project-details/MappingContainer";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../constants";
import { useProjectDetailsContext } from "../../../atoms/project-details/projectContext";
import { PeMappingBody, getPEMapping, peSearchhandleClose, searchItem } from "./helper";
import { isAdmin, isClient, isSuperAdmin } from "../../../utils/role";
import { handleCopy } from "../../../molecules/expert-profile-sections/profile-section/helper";
import { useSnackbar } from "notistack";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { encode } from "../../../utils/utils";
import { useEffect, useState } from "react";
import SearchBar from "../../../molecules/app-bar-common/search-bar";
import CloseIcon from "@mui/icons-material/Close";
import { searchTextBtn, searchTextSpan2 } from "./style";
import { refetchPeMappingValues } from "../helper";
import { useProjectPageContext } from "../../../pages/Projects/helper";
import { BoxFlex } from "../../../atoms/boxSpaceBtw";

type Props = {
  project_id: string | null;
};

const PEMapping = ({ project_id }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { defaultValues, setDefaultValues } = useProjectDetailsContext();
  const { isDialog, setDialog } = useProjectPageContext();
  const client_id = defaultValues?.projectDetails?.client_id || localStorage.getItem("client_id") || "";

  /*
    title that should be sent to PE Mapping Expert Navigation will not have # , but %23 in place of it 
    Reason => B/c after # everything is ignored in url
    TODO: should be fixed in future with better approach
  */
  const projectTitle = defaultValues?.projectDetails && defaultValues?.projectDetails?.topic?.replace(/#/g, '%23');
  const project_status = defaultValues?.projectDetails?.status || "";

  // Getting the current Url of the page
  const currentUrl = window.location.href;
  const parsedUrl = new URL(currentUrl);
  const baseUrl = parsedUrl.origin;
  const code_str = `${project_id}_${client_id}`;

  // PE Mapping Url
  const pe_mapping_url = AppRoutes.PROJECT_PE_MAPPING + "?project_id=" + project_id + "&project_title=" + projectTitle + "&status=" + project_status;
  const pe_mapping_client_url = AppRoutes.PROJECT_PE_MAPPING + "?code=" + encode(code_str) + "&status=" + project_status;

  const [searchText, setSearchText] = useState('')

  const {allItems,expert_invitation_counts} = getPEMapping(defaultValues.pe_mapping || []);

  const [body, setBody] = useState<PeMappingBody>(allItems);

  // Whenever we are adding a new PE , we are refetching the PE values
  useEffect(() => {
    if (isDialog.addPE.isProjectDetails) {
      project_id && refetchPeMappingValues(project_id, setDefaultValues, setBody, setDialog);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDialog.addPE.isProjectDetails]);
  
  return (
    <Box
      component={"section"}
      sx={{
        backgroundColor: "#FFFFFF",
        padding: "1rem",
        borderRadius: "15px",
        marginBottom: "2rem",
      }}
    >
      <Grid container sx={{ marginBottom: '1em', marginTop: '1em' }} spacing={2} justifyContent="space-between" alignItems="center">
        <BoxFlex sx={{gap: "1rem"}}>
          <Typography
            sx={{
              fontWeight: "500",
              paddingLeft: "1rem",
              fontSize: "1rem",

              "@media (max-width: 1030px)": {
                textAlign: "center"
              },
            }}
            variant="h5"
            component="h3"
          >
            <Link to={
              isClient() ? pe_mapping_client_url : pe_mapping_url
            }>
              {isClient() ? "Experts Mapped" : "PE Mapping"}
            </Link>
          </Typography>
          {(isAdmin() || isSuperAdmin()) ?
            <>
              <span style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => 
                code_str && handleCopy(baseUrl + AppRoutes.PROJECT_PE_MAPPING + "?code=" + encode(code_str), enqueueSnackbar, "Link")}>
                {"(  "} <ContentCopyIcon fontSize="small" sx={{ margin: "0 0.25rem", padding: "1px" }} /> Copy Client's view link {" )"}</span>
            </>
            : null}

          {
            searchText.length > 0 &&
            <Chip label={searchText} sx={{ ...searchTextSpan2 }}
              onDelete={() => peSearchhandleClose(setBody, setSearchText, defaultValues.pe_mapping)}
              deleteIcon={<CloseIcon sx={{ ...searchTextBtn, color: 'white !important' }} />}
            ></Chip>
          }
        </BoxFlex>

        <SearchBar
          onSearch={(text) => { searchItem(text, defaultValues.pe_mapping, setBody, setSearchText) }}
          placeholder="Search By Expert Name"
          searchValue={searchText}
          maxWidth="280px"
          minWidth={"280px"}
          p="5px"
        />
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        {!isClient() &&
          <MappingContainer
            titleColor="#B89B71"
            componentColor="#B89B71"
            title="Added"
            items={body.Added}
            isPeMapping
            expert_invitation_count={expert_invitation_counts.Added}
          />
        }
        <MappingContainer
          titleColor="#9F8C8A"
          componentColor="#9F8C8A"
          title="Shared"
          items={body.Shared}
          isPeMapping
          expert_invitation_count={expert_invitation_counts.Shared}
        />

        <MappingContainer
          titleColor="#797B3A"
          componentColor="#797B3A"
          title="Shortlisted"
          items={body.Shortlisted}
          isPeMapping
          expert_invitation_count={expert_invitation_counts.Shortlisted}
        />

        <MappingContainer
          titleColor="#6371BF"
          componentColor="#6371BF"
          title="Scheduled"
          items={body.Scheduled}
          isPeMapping
          isScheduled
          expert_invitation_count={expert_invitation_counts.Scheduled}
        />
        <MappingContainer
          titleColor="#0F738E"
          componentColor="#0F738E"
          title="Completed"
          items={body.Completed}
          isPeMapping
        />
      </Grid>
    </Box>
  );
};

export default PEMapping;
