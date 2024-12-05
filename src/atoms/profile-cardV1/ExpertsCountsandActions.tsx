import React, { useState } from 'react';
import { Grid, Box, Stack, Typography, Tooltip, IconButton, Avatar } from '@mui/material';
import { NumericData } from "./expert-call-detail-tooltip";
import { AccountBalanceTwoTone as AccountBalanceTwoToneIcon, ContentCopyOutlined as ContentCopyOutlinedIcon } from '@mui/icons-material';
import { AddToProject } from "../../organisms/expert-cards/add-to-project";
import { AppRoutes } from "../../constants";
import AddToStaging from "../../organisms/experts/add-to-staging";
import { useSnackbar } from "notistack";
import { handleCopy } from "../../molecules/expert-profile-sections/profile-section/helper";
import { isSuperAdmin } from "../../utils/role";
import EditIcon from "../../assets/images/expert/edit.png";
import timelineGrey from "../../assets/images/expert/timeline_grey.png";
import { selectedCardsTypes } from "../../pages/Experts/types";
const grayCircleStyle = {
  backgroundColor: '#e7e9e8',
  borderRadius: '50%',
  color: '#14171F',
  fontSize: '14px',
  width: '35px',
  height: '35px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
export default function ExpertsCountsandActions(props: any) {
  const validStatuses = ["Identified", "Contacted", "Onboarding"];
  const {
    id,
    name,
    status,
    editExpertClickHandler,
    handleOpenProfileLink,
    calls_data,
    openTimeline,
  } = props;
  const { enqueueSnackbar } = useSnackbar();
  const fullBankAddURL = window.location.href + "&add_bank=1";
  const [addToProjectOpen, setAddToProjectOpen] = useState(false);
  const [addToSEOpen, setAddToSEOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState({ label: props.name, value: props.id });
  const callCount = calls_data?.callCount ?? 0;
  const projectCount = calls_data?.projectCount ?? 0;
  const badCallCount = calls_data?.badCallCount ?? 0;
  const handleStageSubmit = (res: any) => {
    console.log("Submit:", res);
  };
  const handleOpenAddExpert = () => {
    setAddToProjectOpen(true);
  };


  const handleCloseAddToProject = () => {
    setAddToProjectOpen(false);
  };
  const handleOpenSE = () => {
    setAddToSEOpen(true);
  };

  const handleCloseSE = () => {
    setAddToSEOpen(false);
  };
  const selectedCards: selectedCardsTypes = [selectedExpert];
  return (
    <>
      {status === 'Confirmed' && (
        <div className="card-padding">
          <Grid container spacing={0} justifyContent="space-between" paddingTop={0} marginBottom={0} marginTop={0}>
            <Grid item xs={4}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{
                  padding: '10px',
                  width: '100%',
                  height: 'auto',
                  justifyContent: 'center',
                }}
              >
                <NumericData
                  value={callCount}
                  valueStyle={{ fontSize: '16px', color: '#EC9324', fontWeight: 500 }}
                  isLink
                  expert_id={id}
                  expert_name={name}
                  textDecoration="none"
                  valueClass=""
                />
                <Typography variant="caption" color="#000000DE" noWrap>
                  Calls
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{
                  padding: '10px',
                  width: '100%',
                  height: 'auto',
                  justifyContent: 'center'
                }}
              >
                <NumericData
                  value={projectCount}
                  isLink={projectCount && projectCount > 0}
                  link={AppRoutes.PROJECTS + "/all" + "?page=1" + "&projectIds=" + calls_data?.projects}
                  valueStyle={{ fontSize: '16px', color: '#EC9324', fontWeight: 500 }}
                  textDecoration="none"
                  valueClass=""
                />
                <Typography variant="caption" color="#000000DE" noWrap>
                  Projects
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{
                  padding: '10px',
                  width: '100%',
                  height: 'auto',
                  justifyContent: 'center'
                }}
              >
                <NumericData
                  value={badCallCount}
                  valueStyle={{ fontSize: '16px', color: '#EC9324', fontWeight: 500 }}
                  valueClass=""
                />
                <Typography variant="caption" color="#000000DE" noWrap>
                  Bad Calls
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <div className="separator" />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              marginBottom: "-35px",
              overflow: 'hidden',
              flexWrap: 'nowrap',
              maxWidth: '100%',
              '@media (max-width: 375px)': {
                overflow: 'hidden',
                '& .MuiButtonBase-root': {
                  padding: '4px !important'
                },
                '& .info-icon': {
                  minWidth: '28px',
                  minHeight: '28px',
                },
                '& .info-icon span': {
                  fontSize: '14px',
                }
              },
            }}
          >
             {(isSuperAdmin() || validStatuses.includes(status)) && (
              <Tooltip title="Edit Expert" arrow>
                <IconButton onClick={() => editExpertClickHandler(id)} className="info-icon">
                  <Avatar
                    sx={{
                      backgroundColor: '#e7e9e8',
                      borderRadius: '50%',
                      width: '35px',
                      height: '35px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      alt="Edit icon"
                      src={EditIcon}
                      style={{
                        width: '16px',
                        height: '16px',
                        color: '#14171F',
                      }}
                    />
                  </Avatar>
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="Timeline" arrow>
              <IconButton
                onClick={() => openTimeline(id)}
                className="info-icon"
              >
                <Avatar
                  sx={{
                    backgroundColor: '#e7e9e8',
                    borderRadius: '50%',
                    width: '35px',
                    height: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    alt="Timeline"
                    src={timelineGrey}
                    style={{
                      width: '20px',
                      height: '20px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Tooltip title="Bank Details" arrow >
              <IconButton
                onClick={() => handleCopy(fullBankAddURL, enqueueSnackbar, "Bank Form Link")}
                color="info"
                className="bank-button"
                sx={{
                  '@media (max-width: 375px)': {
                    padding: '0px'
                  }
                }}
              >
                <Avatar sx={grayCircleStyle}>
                  <AccountBalanceTwoToneIcon sx={{ color: '#606060' }} />
                </Avatar>
              </IconButton>
            </Tooltip>

            {status === "Confirmed" && (
              <>
                <Tooltip title="PE+" arrow>
                  <IconButton onClick={handleOpenAddExpert} className="info-icon">
                    <Typography component="span" sx={{
                      backgroundColor: '#e7e9e8',
                      borderRadius: '50%',
                      color: '#14171F',
                      fontSize: '14px',
                      width: '35px',
                      height: '35px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>PE+</Typography>
                  </IconButton>
                </Tooltip>
              </>
            )}

            {status === "Confirmed" && (
              <>
                <Tooltip title="SE+" arrow>
                  <IconButton onClick={handleOpenSE} className="info-icon">
                    <Typography component="span" sx={{
                      backgroundColor: '#e7e9e8',
                      borderRadius: '50%',
                      color: '#14171F',
                      fontSize: '14px',
                      width: '35px',
                      height: '35px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>SE+</Typography>
                  </IconButton>
                </Tooltip>
              </>
            )}
           
            {status === "Confirmed" &&
              <>
                <Tooltip title="Copy Profile Link" arrow>
                  <IconButton
                    onClick={async () => await handleOpenProfileLink(id)}
                    className="info-icon"
                  >
                    <Avatar
                      sx={{
                        backgroundColor: '#e7e9e8',
                        borderRadius: '50%',
                        width: '35px',
                        height: '35px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ContentCopyOutlinedIcon
                        sx={{
                          color: "#606060",
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </>
            }
          </Stack>
          {addToSEOpen && (
            <AddToStaging
              isOpen={addToSEOpen}
              handleClose={handleCloseSE}
              handleStageSubmit={handleStageSubmit}
              selectedCards={selectedCards}
            />
          )}
          <AddToProject
            isOpen={addToProjectOpen}
            handleClose={handleCloseAddToProject}
            handleFormChange={() => { }}
            handleSubmitClose={handleCloseAddToProject}
            selectedExpert={selectedExpert}
          />
        </div>
      )}
    </>
  );
};


