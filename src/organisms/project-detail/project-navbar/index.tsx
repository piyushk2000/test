import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Autocomplete, Box, Button, Card, CardActions, CardContent, Drawer, TextField, Tooltip, Typography } from "@mui/material";
import "./project-navbar.scss";
import EditIcon from "../../../assets/images/expert/edit.png";
import { useNavigate } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link, useLocation } from "react-router-dom";
import calender from "../../../assets/images/expert/calendar_expert.png";
// import HoverMenu from "../../../atoms/HoverMenu";
import TooltipIcons from "../../../atoms/project-card-footer-icons";
import { useContext, useEffect, useState } from "react";
import { NavbarSkeletonLoader } from "../../../atoms/project-details/SkeletonLoader";
import { ProjectContext } from "../../../pages/Projects/helper";
import { useProjectDetailsContext } from "../../../atoms/project-details/projectContext";
import {
  dialogTypes,
  projectApiDataItem,
  projectDetailsDefaultValues,
  setProjectDetailsDefaultValues,
} from "../../../pages/Projects/types";
import { APIRoutes, AppRoutes } from "../../../constants";
import WarningDialog from "../../../molecules/form-close-warning";
import { ProjectWarning, handleClose, reopenCloseProject } from "./helper";
import { useSnackbar } from "notistack";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import { isAdmin, isClient, isSuperAdmin } from "../../../utils/role";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import SearchBar from "../../../molecules/app-bar-common/search-bar/searchOnChange";
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { RequestServer } from "../../../utils/services";
import { useGeoFetch } from "../../../utils/hooks/useGeoFetch";
import { LocalDayjs } from "../../../utils/timezoneService";
import { CustomChip } from "../../../atoms/chips/CustomChip";
import FlashOnIcon from '@mui/icons-material/FlashOn';
import dnd from "../../../assets/images/expert/no-call-expert.png";
import diamondIcon from "../../../assets/images/expert/diamond_expert.png";
import AceBadge from "../../../assets/images/expert/ace-badge.png";
import proBadge from "../../../assets/images/expert/crown-badge.png"
import championBadge from "../../../assets/images/expert/trophy-badge.png";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { getprojectDetails } from "../helper";
import { getPEMapping } from "../mapping/helper";



export type FormattedDomains = {
  value: string;
  label: string;
  parent_id: string | null;
  level: string;
};


type Domains = {
  id: string;
  name: string;
  parent_id: string | null;
  level: string;
  created_at: Date | null;
  updated_at: Date | null;
}[];

const formatDomainsData = (domains: Domains) => {
  let formattedData: { [key: string]: FormattedDomains[] } = {};
  if (domains && domains.length) {
    for (let i = 0; i < domains.length; i++) {
      const item = domains[i];

      const formattedItem = {
        label: item.name,
        value: item.id,
        level: item.level,
        parent_id: item.parent_id,
      };

      if (item.level in formattedData) {
        formattedData[item.level].push(formattedItem);
      } else {
        formattedData[item.level] = [formattedItem];
      }
    }
  }
  return formattedData;
};


type Props = {
  isLoading: boolean;
  page: string | null;
  openEditProjectDialog: () => void;
  id: string | null;
  topic: string | undefined;
  openAddAgendaDialog: () => void;
  refetchExpertsStaged: () => void;
  setDefaultValues: setProjectDetailsDefaultValues;
  defaultValues: projectDetailsDefaultValues;
};

type Experts = {
  id: string,
  added_by_name: string
}

const ProjectNavbar = (props: Props) => {
  const [projectWarning, setProjectWarning] = useState<ProjectWarning>({
    isOpen: false,
    action: null,
  });
  const { onlyCountryList: countryGeoList, allGeoList: geographiesList } = useGeoFetch();
  const navigate = useNavigate();
  const { setDialog } = useContext(ProjectContext);
  const { defaultValues, setModalOpen, isAdminAllowed, stagedExperts, setDefaultValues } = useProjectDetailsContext();
  const projectDefault: projectApiDataItem | null = defaultValues.projectDetails;
  const { enqueueSnackbar } = useSnackbar();
  const { setLoading } = useFullPageLoading();
  const [showStaging, setShowStaging] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchAddedValue, setSearchAddedValue] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [searchedExperts, setSearchedExperts] = useState<any[]>([]);
  const [showValueObj, setShowValueObj] = useState<any>({});
  const [addedByOptions, setAddedByOptions] = useState<any[]>([]);
  const [formattedDomains, setFormattedDomains] = useState<{ [key: string]: FormattedDomains[] }>({})
  const [currentDate, setCurrentDate] = useState(LocalDayjs(new Date()));
  const [filterDate, setFilterDate] = useState(false);

  const returnValueLast24 = (value: any) => {
    return (currentDate.diff(LocalDayjs(value.added_on), 'hour', true) < (currentDate.day() === 1 ? 72 : 24)) && (value.added_by !== projectDefault?.account_manager_value?.id)
  }

  const onSearch = (text: string) => {
    const searchText = text.toLocaleLowerCase();
    let searchData = stagedExperts.filter((value: any) => value.fk_expert_value.name.toLocaleLowerCase().includes(searchText) || value.fk_expert_value.meta.current_company?.name?.toLocaleLowerCase().includes(searchText) || value.fk_expert_value.meta.current_company?.designation?.toLocaleLowerCase().includes(searchText));
    searchData = searchData.filter((value: any) => value.added_by_name.includes(searchAddedValue || ''));
    if (filterDate) {
      searchData = searchData.filter((value: any) => returnValueLast24(value));
    }
    setSearchedExperts([...searchData || []]);
    setSearchValue(searchText);
  }

  const onSearchAdded = (text: string | null) => {
    let searchData = stagedExperts.filter((value: any) => value.fk_expert_value.name.toLocaleLowerCase().includes(searchValue) || value.fk_expert_value.meta.current_company?.name?.toLocaleLowerCase().includes(searchValue) || value.fk_expert_value.meta.current_company?.designation?.toLocaleLowerCase().includes(searchValue));
    searchData = searchData.filter((value: any) => value.added_by_name.includes(text || ''));
    if (filterDate) {
      searchData = searchData.filter((value: any) => returnValueLast24(value));
    }
    setSearchedExperts([...searchData || []]);
    setSearchAddedValue(text);
  }


  const dateFormatFilter = () => {
    let filterState = !filterDate;
    setFilterDate(filterState);
    let searchData = stagedExperts.filter((value: any) => value.fk_expert_value.name.toLocaleLowerCase().includes(searchValue) || value.fk_expert_value.meta.current_company?.name?.toLocaleLowerCase().includes(searchValue) || value.fk_expert_value.meta.current_company?.designation?.toLocaleLowerCase().includes(searchValue));
    searchData = searchData.filter((value: any) => value.added_by_name.includes(searchAddedValue || ''));
    if (filterState) {
      searchData = searchData.filter((value: any) => returnValueLast24(value));
    }
    // searchData.filter((value: any) => console.log(currentDate.diff(LocalDayjs(value.added_on),'hour',true)));
    setSearchedExperts([...searchData || []]);
  }

  const returnBadge = (badge: string) => {
    let src
    if (badge === "Ace") {
      src = AceBadge
    } else if (badge === "Pro") {
      src = proBadge
    } else if (badge === "Champion") {
      src = championBadge
    }
    return src
  }

  const getCountry = (id: any) => {
    let country = countryGeoList?.find(val => val.value == id);
    return country?.label || '';
  }

  const getDomain = (value: any, domain: any) => {
    let country = formattedDomains[domain]?.find(val => val.value == value);
    return country?.label || '';
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let domainsData = await RequestServer(APIRoutes.domains, "GET");
        let formattedDomains = formatDomainsData(domainsData?.data);
        setFormattedDomains({ ...formattedDomains })
      } catch (error) {

      }
    };
    fetchData();

    if (stagedExperts && stagedExperts.length) {
      setSearchedExperts(stagedExperts);
      let obj: any = {};
      let arr: any[] = []
      stagedExperts.map((val: Experts) => {
        obj[val.id] = false;
        arr.push(val.added_by_name)
      })
      setAddedByOptions([...Array.from(new Set([...arr]))])
      setShowValueObj({ ...obj })
    }
  }, [stagedExperts])

  const isProjectOpen = defaultValues.projectDetails?.status === "Open";
  const loggedInUser = localStorage.getItem("id");
  const isProjectAM = loggedInUser ? defaultValues.projectDetails?.account_manager === parseInt(loggedInUser) : false

  return (
    <>
      <Box sx={{ mt: isMobile ? "0" : "1.5rem" }}>
        <Grid className="navbar-container" container>
          <Grid
            sx={{
              alignSelf: "center",
            }}
            item
            xs={2.2}
            md={12}
            lg={4}
            xl={4}
          >
            <Button
              sx={{
                color: "#000000",
                textTransform: "capitalize",
                fontSize: "15px",
                alignSelf: "center",
                fontFamily: "inherit",


                padding: isMobile ? "8px 0" : "8px"
              }}
              onClick={() =>
                navigate(`/layout/projects/all?page=` + props.page)
              }
            >
              <ArrowBackIcon />
              {!isMobile && <span className="back-btn-title">Back to Projects</span>}
            </Button>
            {!showStaging && (isSuperAdmin() || isAdmin()) && (
              <Tooltip title={'Open Staged Experts'} arrow>
                <Button
                  sx={{
                    color: "#000000",
                    fontSize: "15px",
                    fontFamily: "inherit",

                    position: 'fixed',
                    right: '-3px',
                    top: '40%',

                    background: '#80808082',
                    padding: isMobile ? "8px 0" : "8px",
                    transition: "all 0.3s ease",
                    "& .extra-content": {
                      display: "none",
                    },
                    "&:hover .extra-content": {
                      display: "inline-block",
                    },
                    "&:hover .chevron-icon": {
                      marginRight: "10px",
                    }
                  }}
                  onClick={() =>
                    setShowStaging(true)
                  }
                >
                  <span>
                    <ChevronLeftIcon className="chevron-icon" sx={{ fontSize: "25px", marginBottom: '-7px' }} />
                    <span className="extra-content">
                      T: ({stagedExperts?.length || 0})
                      <FlashOnIcon style={{ verticalAlign: 'middle', marginLeft: '4px', marginRight: '4px' }} />:
                      ({stagedExperts?.filter((value: any) => returnValueLast24(value)).length || 0})
                    </span>

                  </span>
                </Button>
              </Tooltip>
            )}
          </Grid>
          <Drawer anchor={'right'} open={showStaging} onClose={() => setShowStaging(false)} >
            <Box sx={{ position: 'sticky', top: 0, background: '#f5f5f5', zIndex: 99999, padding: '20px', display: 'flex', justifyContent: 'space-around', borderBottom: '1px solid #ddd' }}>
              <SearchBar
                minWidth="45%"
                m={{
                  xs: "0.75rem 0",
                  sm: "0.5em 1rem",
                }}
                placeholder={'Search...'}
                onSearch={onSearch}
                searchValue={searchValue || ""}
              />
              <Autocomplete
                autoHighlight
                value={searchAddedValue}
                onChange={(event: any, newValue: string | null) => {
                  onSearchAdded(newValue)
                }}
                id="combo-box-demo"
                options={addedByOptions}
                sx={{ width: '40%', marginTop: '-6px' }}
                renderInput={(params) => <TextField variant="standard" {...params} label="Added By" />}
              />
              <Tooltip title={'See expert(s) staged since yesterday'} leaveTouchDelay={5000} enterTouchDelay={0} arrow>
                <FlashOnIcon onClick={dateFormatFilter} sx={{ cursor: 'pointer', minWidth: '8%', marginTop: '15px', color: filterDate ? 'rgba(24, 168, 72, 1)' : '#888' }} />
              </Tooltip>
            </Box>
            <Grid container spacing={2} sx={{ padding: 2, width: isMobile ? '22em' : '35em', background: '#f5f5f5' }}>
              {searchedExperts.map((value: any, index) => {

                const current_company = value.work_experiences.find((d: any) => d.currently_works_here) || value.fk_expert_value.meta.current_company || null;

                const current_company_name = current_company?.company || current_company?.name || null
                const current_company_designation = current_company?.designation || null

                return (
                  <Grid item xs={12} sm={12} md={12} key={index}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
                      <CardContent>
                        <span>
                          <Link to={AppRoutes.EXPERT_PROFILE + "?id=" + value.fk_expert_value.id + "&page=1"} target="_blank" style={{ padding: "0" }}>
                            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: "600", color: '#333', display: 'inline' }}>
                              {value.fk_expert_value.salutation} {value.fk_expert_value.name}
                            </Typography>
                          </Link>

                          {value?.fk_expert_value?.badge && <img src={returnBadge(value?.fk_expert_value?.badge)} alt="" style={{ width: '20px', height: '20px', display: 'inline-block', marginLeft: '5px' }} />}
                          {value?.fk_expert_value?.dnd_enabled && <img src={dnd} alt="" style={{ width: '20px', height: '20px', display: 'inline-block', marginLeft: '5px' }} />}
                          {value?.fk_expert_value?.premium_expert && <img className="diamond-icon" src={diamondIcon} alt="Premium Expert Icon" style={{ display: 'inline-block', marginLeft: '5px', width: '20px', height: '20px', }} />}
                        </span>


                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0px', my: -0.7 }}>
                          {(current_company_name && current_company_designation) ? (
                            <>
                              <Typography sx={{ fontWeight: "500", color: '#666', my: 1 }}>
                                {[current_company_designation, current_company_name].filter(c => !!c).join(", ")}
                              </Typography>
                              <CardActions>
                                <Tooltip title={'Add expert to PE'} arrow>
                                  <Button
                                    sx={{
                                      color: "white",
                                      fontSize: "14px",
                                      fontFamily: "inherit",

                                      background: '#ec9324',
                                      padding: '0px',
                                      borderRadius: '25px!important',
                                      "&:hover": {
                                        background: '#ec9324'
                                      }
                                    }}
                                    onClick={async () => {
                                      setDialog((prev: dialogTypes) => ({
                                        ...prev,
                                        addPE: {
                                          state: true,
                                          id: props.id,
                                          isChange: false,
                                          isProjectDetails: false,
                                          selectedExpert: {
                                            label: `ID: ${value.fk_expert_value.id}, ${value.fk_expert_value.name}`,
                                            value: parseInt(value.fk_expert_value.id),
                                          },
                                          refetch: props.refetchExpertsStaged
                                        },
                                      }));
                                    }}
                                  >
                                    PE+
                                  </Button>
                                </Tooltip>
                              </CardActions>
                            </>
                          ) : (
                            <>
                              <Typography component={'p'} sx={{ fontWeight: "500", color: '#666' }}>
                                {value.fk_expert_value.price_per_hour_currency} {value.fk_expert_value.price_per_hour}/Hr
                              </Typography>
                              <CardActions>
                                <Tooltip title={'Add expert to PE'} arrow>
                                  <Button
                                    sx={{
                                      color: "white",
                                      fontSize: "14px",
                                      fontFamily: "inherit",
                                      background: '#ec9324',

                                      padding: '0px',
                                      borderRadius: '25px!important',
                                      "&:hover": {
                                        background: '#ec9324'
                                      }
                                    }}
                                    onClick={async () => {
                                      setDialog((prev: dialogTypes) => ({
                                        ...prev,
                                        addPE: {
                                          state: true,
                                          id: props.id,
                                          isChange: false,
                                          isProjectDetails: false,
                                          selectedExpert: {
                                            label: `ID: ${value.fk_expert_value.id}, ${value.fk_expert_value.name}`,
                                            value: parseInt(value.fk_expert_value.id),
                                          },
                                          refetch: props.refetchExpertsStaged
                                        },
                                      }));
                                    }}
                                  >
                                    PE+
                                  </Button>
                                </Tooltip>
                              </CardActions>
                            </>
                          )}
                        </Box>

                        {value.fk_expert_value?.meta?.current_company && (
                          <Typography component={'p'} sx={{ fontWeight: "500", color: '#666' }}>
                            {value.fk_expert_value.price_per_hour_currency} {value.fk_expert_value.price_per_hour}/Hr
                          </Typography>
                        )}
                        <div style={{ marginTop: '5px', display: 'flex', flexWrap: 'wrap' }}>

                          {value.fk_expert_value.base_location && (
                            <CustomChip
                              sx={{ margin: '2px', border: "1px solid #ec9324" }}
                              label={<span><LocationOnIcon sx={{ fontSize: '15px', position: 'relative', top: '3px' }} /> {getCountry(value.fk_expert_value.base_location)}</span>}
                              color="black"
                              bg="white"
                            />
                          )}

                          {value.added_by_name && (
                            <CustomChip
                              sx={{ margin: '2px' }}
                              label={<span><PersonIcon sx={{ fontSize: '16px', position: 'relative', top: '3px' }} /> {value.added_by_name} on {LocalDayjs(value.added_on).format("DD MMM YYYY")}</span>}
                              color="black"
                              bg="#80808036"
                            />
                          )}
                        </div>
                        <div style={{ marginTop: '5px', display: 'flex', flexWrap: 'wrap' }}>
                          {value.fk_expert_value.domain_l0 && (
                            <CustomChip
                              sx={{ margin: '2px' }}
                              label={getDomain(value.fk_expert_value.domain_l0, 'L0')}
                              color="rgba(63, 81, 181, 1)" // Indigo
                              bg="rgba(63, 81, 181, 0.1)"
                            />
                          )}
                          {value.fk_expert_value.domain_l1 && (
                            <CustomChip
                              sx={{ margin: '2px' }}
                              label={getDomain(value.fk_expert_value.domain_l1, 'L1')}
                              color="rgba(233, 30, 99, 1)" // Pink
                              bg="rgba(233, 30, 99, 0.1)"
                            />
                          )}
                          {value.fk_expert_value.domain_l2 && (
                            <CustomChip
                              sx={{ margin: '2px' }}
                              label={getDomain(value.fk_expert_value.domain_l2, 'L2')}
                              color="rgba(0, 150, 136, 1)" // Teal
                              bg="rgba(0, 150, 136, 0.1)"
                            />
                          )}
                          {value.fk_expert_value.domain_l3 && (
                            <CustomChip
                              sx={{ margin: '2px' }}
                              label={getDomain(value.fk_expert_value.domain_l3, 'L3')}
                              color="rgba(255, 152, 0, 1)" // Orange
                              bg="rgba(255, 152, 0, 0.1)"
                            />
                          )}


                        </div>
                      </CardContent>

                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          </Drawer>

          {props.isLoading ? (
            <NavbarSkeletonLoader />
          ) : (
            <Grid className="navbar-btns" item xs={9.8} md={12} lg={8} xl={8}>
              {!isClient() && (
                <>
                  <TooltipIcons
                    icon={EditIcon}
                    title="Edit Project"
                    isIcon={true}
                    handleClick={props.openEditProjectDialog}
                    isDisabled={props.isLoading || !isProjectOpen}
                  />
                  {defaultValues?.projectDetails &&
                    <TooltipIcons
                      text="A"
                      isIcon={false}
                      title="Agenda"
                      handleClick={() => {
                        setDialog((prev: dialogTypes) => ({
                          ...prev,
                          agenda: {
                            state: true,
                            project_id: props.id,
                            openAddAgenda: props.openAddAgendaDialog,
                            isAdminAllowed: isAdminAllowed,
                            isProjectOpen: defaultValues?.projectDetails?.status === "Open"
                          },
                        }));
                      }}
                    />
                  }

                  <TooltipIcons
                    text="CE+"
                    isIcon={false}
                    title="Add CE"
                    isDisabled={!isProjectOpen}
                    handleClick={() => {
                      setDialog((prev: dialogTypes) => ({
                        ...prev,
                        addCE: {
                          state: true,
                          id: props.id,
                          isChange: false,
                          mapped_project: {
                            label: defaultValues.projectDetails?.topic,
                            value: props.id,
                          },
                          refetch: async () => await getprojectDetails(setLoading, setDefaultValues, props.id, true)
                        },
                      }));
                    }}
                  />
                </>
              )}

              {!isClient() ? (
                <>
                  <TooltipIcons
                    text={"SE+"}
                    isIcon={false}
                    isDisabled={!isProjectOpen}
                    title={"Add to Staging"}
                    handleClick={async () => {
                      setDialog((prev: dialogTypes) => ({
                        ...prev,
                        addSPE: {
                          state: true,
                          id: props.id,
                          isChange: false,
                          isProjectDetails: false,
                          refetch: props.refetchExpertsStaged
                        },
                      }));
                    }}
                  />
                </>
              ) : (<span></span>
              )}

              {isClient() ? (
                <>
                  {isProjectOpen &&
                    <Button
                      sx={{
                        boxShadow: "none",
                        color: "#14171f !important",
                        backgroundColor: "#E7E9E8 !important",
                      }}
                      className="button"
                      variant="contained"
                      disabled={!isProjectOpen}
                      disableElevation
                      onClick={async () => {
                        setDialog((prev: dialogTypes) => ({
                          ...prev,
                          addPE: {
                            state: true,
                            id: props.id,
                            isChange: false,
                            isProjectDetails: false,
                          },
                        }));
                      }}
                    >
                      Add An Expert
                    </Button>
                  }
                </>
              ) : (
                <>
                  <TooltipIcons
                    text={"T"}
                    isIcon={false}
                    // isDisabled={!isProjectOpen}
                    title={"TAT"}
                    handleClick={async () => {
                      setDialog((prev: dialogTypes) => ({
                        ...prev,
                        TAT: {
                          state: true,
                          apiData: props.defaultValues.projectDetails,
                          expert_invitation_counts: getPEMapping(props.defaultValues.pe_mapping || []).expert_invitation_counts
                        }
                      }));
                    }}
                  />
                  <TooltipIcons
                    text={"PE+"}
                    isIcon={false}
                    isDisabled={!isProjectOpen}
                    title={"Add PE"}
                    handleClick={async () => {
                      setDialog((prev: dialogTypes) => ({
                        ...prev,
                        addPE: {
                          state: true,
                          id: props.id,
                          isChange: false,
                          isProjectDetails: false,
                        },
                      }));
                    }}
                  />
                </>
              )}
              {isProjectOpen &&
                <TooltipIcons
                  icon={calender}
                  isIcon={true}
                  title="Calender"
                  isDisabled={!isProjectOpen}
                  handleClick={() =>
                    navigate(AppRoutes.CALENDER + "?id=" + props.id)
                  }
                />
              }

              {isProjectOpen && isClient() && (
                <Button
                  sx={{
                    boxShadow: "none",
                    color: "#14171f !important",
                    backgroundColor: "#E7E9E8 !important",
                  }}
                  className="button"
                  variant="contained"
                  disableElevation
                  onClick={() => {
                    setModalOpen &&
                      setModalOpen((prev) => ({
                        ...prev,
                        suggestExpert: {
                          state: true,
                          isChange: false
                        }
                      }))
                  }}
                >
                  Suggest An Expert
                </Button>
              )}

              {!isClient() && (
                <>
                  {(isProjectOpen && (isAdmin() ? isProjectAM : true)) ? (
                    <Button
                      sx={{
                        boxShadow: "2px 2px 2px rgba(0,0,0,0.1)",
                        "&:hover": {
                          boxShadow: "2px 2px 2px rgba(0,0,0,0.15)",
                        },
                      }}
                      className="button close-btn"
                      variant="contained"
                      onClick={() =>
                        setProjectWarning((prev) => ({
                          isOpen: true,
                          action: "Close",
                        }))
                      }
                    >
                      Close Project
                    </Button>
                  ) : (
                    <>
                      {!isAdmin() &&
                        <Button
                          sx={{
                            boxShadow: "none",
                          }}
                          className="button reOpen-btn"
                          variant="contained"
                          disableElevation
                          onClick={() =>
                            setProjectWarning((prev) => ({
                              isOpen: true,
                              action: "Reopen",
                            }))
                          }
                        >
                          Reopen
                        </Button>
                      }
                    </>
                  )}
                </>
              )}
            </Grid>
          )}
        </Grid>
      </Box >

      {/* ReOpen / Close Project Warnings */}
      < WarningDialog
        open={projectWarning.isOpen}
        handleYesClick={async () => {
          props.id &&
            projectWarning.action &&
            (await reopenCloseProject(
              props.id,
              projectWarning.action,
              enqueueSnackbar,
              setLoading,
              props.setDefaultValues,
              setProjectWarning
            ));
        }}
        handleClose={() => {
          handleClose(setProjectWarning);
        }}
        text={
          projectWarning.action === "Close"
            ? "Are you sure you want to close this Project?"
            : "Are you sure you want to Reopen this Project?"
        }
      />
    </>
  );
};

export default ProjectNavbar;
// export const showStagedExperts=(Props:any)=>{
//   return(
//     <>
//     <Grid container>
//       <Grid item xs={12}>
//       <Typography variant="h3" sx={{ fontWeight: "500" }}>
//             {Props.expert.fk_expert_value.name}
//       </Typography>
//       </Grid>
//       <Grid item xs={12}>
//       <Typography variant="h6" sx={{fontWeight: "500" }}>
//             {Props.expert.added_by_name}
//       </Typography>
//       </Grid>
//     </Grid>
//     </>
//   )
//   }



