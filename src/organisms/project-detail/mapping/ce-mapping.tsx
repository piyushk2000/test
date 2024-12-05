import { Grid, Typography, Box, Chip, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import MappingContainer from "../../../atoms/project-details/MappingContainer";
import { useProjectDetailsContext } from "../../../atoms/project-details/projectContext";
import SearchBar from "../../../molecules/app-bar-common/search-bar";
import { getAllMappingItems } from "./helper";
import CloseIcon from "@mui/icons-material/Close";
import { searchTextBtn, searchTextSpan } from "./style";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../constants";
import { isAdmin, isSuperAdmin } from "../../../utils/role";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { handleCopy } from "../../../molecules/expert-profile-sections/profile-section/helper";
import { encode } from "../../../utils/utils";
import { useSnackbar } from "notistack";
import { BoxFlex } from "../../../atoms/boxSpaceBtw";
import SettingsIcon from '@mui/icons-material/Settings';

type Props = {
  project_id: string | null;
};

const CEMapping = ({ project_id }: Props) => {
  const { defaultValues } = useProjectDetailsContext();
  const { enqueueSnackbar } = useSnackbar();
  const {
    IdentifiedItems,
    ContactedItems,
    RefusedItems,
    OnboardingItems,
    ConfirmedItems,
  } = getAllMappingItems(defaultValues.ce_mapping?.data || []);

  const [searchText, setSearchText] = useState('')

  const [body, setBody] = useState(getAllMappingItems(defaultValues.ce_mapping?.data || []))

  const searchItem = (text: string) => {
    let bodyNew = {
      IdentifiedItems: IdentifiedItems.filter((val) => val.name.toLowerCase().includes(text.toLowerCase())),
      ContactedItems: ContactedItems.filter((val) => val.name.toLowerCase().includes(text.toLowerCase())),
      RefusedItems: RefusedItems.filter((val) => val.name.toLowerCase().includes(text.toLowerCase())),
      OnboardingItems: OnboardingItems.filter((val) => val.name.toLowerCase().includes(text.toLowerCase())),
      ConfirmedItems: ConfirmedItems.filter((val) => val.name.toLowerCase().includes(text.toLowerCase()))
    }
    setBody({ ...bodyNew })
    setSearchText(text);
  }

  const handleClose = () => {
    setSearchText('');
    setBody(getAllMappingItems(defaultValues.ce_mapping?.data || []));
  }

  const CE_MAPPING_URL = `${AppRoutes.EXPERT_SEARCH}?page=1&ce_mapping=${encodeURIComponent(defaultValues.projectDetails?.client_name)}___${project_id}`

  // Getting the current Url of the page
  const currentUrl = window.location.href;
  const parsedUrl = new URL(currentUrl);
  const baseUrl = parsedUrl.origin;
  const client_id = defaultValues?.projectDetails?.client_id || localStorage.getItem("client_id") || "";

  const name_masking = defaultValues.projectDetails?.name_masking ? "1" : "0";

  useEffect(() => {
    setBody(getAllMappingItems(defaultValues.ce_mapping?.data || []));
  },[defaultValues.ce_mapping?.data?.length]);
  const CE_TRACKER_URL = `${AppRoutes.CE_TRACKER}?project_id=${defaultValues.projectDetails.id}`

  return (
    <Box
      component={"section"}
      sx={{
        backgroundColor: "#FFFFFF",
        padding: "1rem",
        borderRadius: "15px",
      }}
    >
      <Grid container sx={{ marginBottom: '1em', marginTop: '1em' }} spacing={2} justifyContent="space-between" alignItems="center">

        <BoxFlex sx={{ gap: "1rem" }}>
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
            <Link target="_blank" to={CE_MAPPING_URL}>CE Mapping</Link>
          </Typography>
          <Tooltip title="CE Tracker" arrow>
            <Link target="_blank" to={CE_TRACKER_URL}> 
            <IconButton>
              <SettingsIcon  />
            </IconButton>
            </Link>
          </Tooltip>

          {(isAdmin() || isSuperAdmin()) ?
            <>
              <span style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => handleCopy(baseUrl + AppRoutes.CE_MAPPING_EXPERTS + "?code=" + encode(`${project_id}_${client_id}`), enqueueSnackbar, "Link")}>
                {"(  "} <ContentCopyIcon fontSize="small" sx={{ margin: "0 0.25rem", padding: "1px" }} /> Copy Client's view link {" )"}</span>
            </>
            : null}


          {searchText.length > 0 &&
            <Chip label={searchText} sx={{ ...searchTextSpan }}
              onDelete={handleClose}
              deleteIcon={<CloseIcon sx={{ ...searchTextBtn, color: 'white !important' }} />}
            ></Chip>}
        </BoxFlex>

        <SearchBar
          onSearch={(text) => { searchItem(text) }}
          placeholder="Search By Expert Name"
          searchValue={searchText}
          maxWidth="280px"
          minWidth={"280px"}
          p="5px"
        />
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        <MappingContainer
          titleColor="#4FB29C"
          componentColor="#4FB29C"
          title="Identified"
          items={body.IdentifiedItems}
        />

        <MappingContainer
          titleColor="#0E4C7F"
          componentColor="#0E4C7F"
          title="Contacted"
          items={body.ContactedItems}
        />

        <MappingContainer
          titleColor="#AF4052"
          componentColor="#AF4052"
          title="Refused"
          items={body.RefusedItems}
        />

        <MappingContainer
          titleColor="#577285"
          componentColor="#577285"
          title="Onboarding"
          items={body.OnboardingItems}
        />

        <MappingContainer
          titleColor="#6B5773"
          componentColor="#6B5773"
          title="Confirmed"
          items={body.ConfirmedItems}
        />
      </Grid>
    </Box>
  );
};

export default CEMapping;
