import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import EditExpertNavbar from "../../molecules/edit-expert-navbar";
import ExpertProfileHeader from "../../molecules/app-bars/expert-profile";
import { editExpertContainer, warningBackgroundStyle } from "./styles";
import { formDefaultValues, getDefaultValues } from "./helper";
import { SyntheticEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FormCloseWarningDialog from "../../molecules/form-close-warning";
import PersonalInfoAccordian from "./personal-info/accordian";
import BasicDetailsAccordian from "./basic-details/accordian";
import AboutAccordian from "./about/accordian";
import ExperienceAccordian from "./experience/accordian";
import EducationAccordian from "./education/accordian";
import AwardsAccordian from "./awards/accordian";
import PublicationAccordian from "./publication/accordian";
import PatentsAccordian from "./patents/accordian";
import WebHandleAccordian from "./web-handle/accordian";
import SnippetsAccordian from "./snippets/accordian";
import { isExpert } from "../../utils/role";
import { useFetch } from "../../utils/hooks/useFetch";
import { APIRoutes, AppRoutes } from "../../constants";
import { GetProfileEdit } from "../expert-pending-approval/type";
import { Link } from "react-router-dom";
import InternalInfoAccordian from "./internal-info/accordian";

const EditExpert = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [isWarningOpen, setWarning] = useState<boolean>(false);
  const [isBackdropOpen, setBackdropOpen] = useState<boolean>(false);
  const [isFormChange, setFormChange] = useState<any>({
    personalInfo: false,
    basicDetails: false,
    about: false,
    experience: false,
    education: false,
    awards: false,
    publication: false,
    patents: false,
    webHandles: false,
    snippets: false,
    internal: false
  });
  const [formDefaultValues, setFormDefaultValues] = useState<formDefaultValues>(
    {
      personalInfo: null,
      basicDetails: null,
      about: null,
      experience: null,
      education: null,
      awards: null,
      publication: null,
      patents: null,
      webHandles: null,
      snippets: null,
      relevant_company: null,
      pendingEdits: null,
      internal: null
    }
  );

  const is_expert = isExpert();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const page = queryParams.get("page");

  const { data: profileEdit, loading: profileEditLoading } = useFetch<GetProfileEdit["data"]>(APIRoutes.profileEdit + "?fk_expert=" + id, {
    variables: [id, isExpert()]
  });

  const handleChange =
    (panel: string) => async (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);

      if (isExpanded === false) {
        // setting form change again to false
        setFormChange((prevFormChangeValues: any) => ({
          ...prevFormChangeValues,
          [panel]: false,
        }));
      }
    };

  // Getting default Values for the first time
  useEffect(() => {
    if (!profileEditLoading) {
      getDefaultValues(id, setFormDefaultValues, profileEdit);
    }

    //eslint-disable-next-line
  }, [profileEditLoading]);

  return (
    <>
      <ExpertProfileHeader />
      <Box component="div" sx={editExpertContainer}>
        {!profileEditLoading &&
          <EditExpertNavbar id={id} page={page} NumberPendingApproval={profileEdit?.length || formDefaultValues.pendingEdits || 0} />
        }

        {/* warning Screen */}
        {expanded && isFormChange[expanded] && (
          <Box
            sx={warningBackgroundStyle}
            onClick={() => setWarning(true)}
          ></Box>
        )}

        <FormCloseWarningDialog
          open={isWarningOpen}
          handleClose={() => setWarning(false)}
          handleYesClick={async () => {
            setWarning(false);
            if (expanded) {
              setFormDefaultValues((prevFormValues) => ({
                ...prevFormValues,
                [expanded]: null,
              }));
            }
            setExpanded(false);
            setBackdropOpen(true);
            await getDefaultValues(id, setFormDefaultValues, profileEdit);
            setBackdropOpen(false);
            if (expanded) {
              // Changing Form Changes to False
              setFormChange((prevFormChangeValues: any) => ({
                ...prevFormChangeValues,
                [expanded]: false,
              }));
            }
          }}
        />

        {/* Backdrop */}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 10000 }}
          open={isBackdropOpen}
        >
          <CircularProgress color="inherit" />
        </Backdrop>


        <Box component="main">

          {(formDefaultValues.pendingEdits || profileEdit?.length) ?
            <Box sx={{
              backgroundColor: "#fd5c63",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "10px",
              color: "white",
            }}>
              {isExpert() ?
                <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                  You had made previously made changes in your profile. All the changes you had submitted for review have been retained below.
                </Typography> :
                <Typography>
                  The expert has submitted changes in his/her profile. Please accept/decline
                  {" "}
                  <Link to={`${AppRoutes.EXPERT_PENDING_APPROVAL}?id=${id}`}
                    target="_blank"
                    rel="noopener,noreferrer"
                    style={{ textDecoration: "underline", fontWeight: "500" }}
                  >
                    those changes
                  </Link>
                  {" "}before making any change in the profile.
                </Typography>
              }
            </Box> : null
          }

          {(!isExpert() ? !formDefaultValues?.pendingEdits : true) &&
            <>
              {/* Personal Info Form */}
              <PersonalInfoAccordian
                expanded={expanded}
                id={id}
                handleChange={handleChange}
                isFormChange={isFormChange}
                formDefaultValues={formDefaultValues}
                setExpanded={setExpanded}
                setFormChange={setFormChange}
                setFormDefaultValues={setFormDefaultValues}
                setBackdropOpen={setBackdropOpen}
              />

              {/* Basic Details Form */}
              <BasicDetailsAccordian
                expanded={expanded}
                id={id}
                handleChange={handleChange}
                isFormChange={isFormChange}
                formDefaultValues={formDefaultValues}
                setExpanded={setExpanded}
                setFormChange={setFormChange}
                setFormDefaultValues={setFormDefaultValues}
                setBackdropOpen={setBackdropOpen}
              />
              {/* ABOUT Form */}
              <AboutAccordian
                expanded={expanded}
                id={id}
                handleChange={handleChange}
                isFormChange={isFormChange}
                formDefaultValues={formDefaultValues}
                setExpanded={setExpanded}
                setFormChange={setFormChange}
                setFormDefaultValues={setFormDefaultValues}
                setBackdropOpen={setBackdropOpen}
              />
              {/* Experience Form */}
              <ExperienceAccordian
                expanded={expanded}
                id={id}
                handleChange={handleChange}
                isFormChange={isFormChange}
                formDefaultValues={formDefaultValues}
                setExpanded={setExpanded}
                setFormChange={setFormChange}
                setFormDefaultValues={setFormDefaultValues}
                setBackdropOpen={setBackdropOpen}
              />
              {/* Education */}
              <EducationAccordian
                expanded={expanded}
                id={id}
                handleChange={handleChange}
                isFormChange={isFormChange}
                formDefaultValues={formDefaultValues}
                setExpanded={setExpanded}
                setFormChange={setFormChange}
                setFormDefaultValues={setFormDefaultValues}
                setBackdropOpen={setBackdropOpen}
              />
              {/* Awards */}
              <AwardsAccordian
                expanded={expanded}
                id={id}
                handleChange={handleChange}
                isFormChange={isFormChange}
                formDefaultValues={formDefaultValues}
                setExpanded={setExpanded}
                setFormChange={setFormChange}
                setFormDefaultValues={setFormDefaultValues}
                setBackdropOpen={setBackdropOpen}
              />
              {/* Publications Forms */}
              <PublicationAccordian
                expanded={expanded}
                id={id}
                handleChange={handleChange}
                isFormChange={isFormChange}
                formDefaultValues={formDefaultValues}
                setExpanded={setExpanded}
                setFormChange={setFormChange}
                setFormDefaultValues={setFormDefaultValues}
                setBackdropOpen={setBackdropOpen}
              />
              {/* Patents Forms */}
              <PatentsAccordian
                expanded={expanded}
                id={id}
                handleChange={handleChange}
                isFormChange={isFormChange}
                formDefaultValues={formDefaultValues}
                setExpanded={setExpanded}
                setFormChange={setFormChange}
                setFormDefaultValues={setFormDefaultValues}
                setBackdropOpen={setBackdropOpen}
              />
              {/* Web Handle */}
              <WebHandleAccordian
                expanded={expanded}
                id={id}
                handleChange={handleChange}
                isFormChange={isFormChange}
                formDefaultValues={formDefaultValues}
                setExpanded={setExpanded}
                setFormChange={setFormChange}
                setFormDefaultValues={setFormDefaultValues}
                setBackdropOpen={setBackdropOpen}
              />
            </>}
          {/* Snippets */}
          {!is_expert &&
            <SnippetsAccordian
              expanded={expanded}
              id={id}
              handleChange={handleChange}
              isFormChange={isFormChange}
              formDefaultValues={formDefaultValues}
              setExpanded={setExpanded}
              setFormChange={setFormChange}
              setFormDefaultValues={setFormDefaultValues}
              setBackdropOpen={setBackdropOpen}
            />
          }

          {/* Internal */}
          {!is_expert &&
            <InternalInfoAccordian
              expanded={expanded}
              id={id}
              handleChange={handleChange}
              isFormChange={isFormChange}
              formDefaultValues={formDefaultValues}
              setExpanded={setExpanded}
              setFormChange={setFormChange}
              setFormDefaultValues={setFormDefaultValues}
              setBackdropOpen={setBackdropOpen}
            />
          }
        </Box>
      </Box>
    </>
  );
};

export default EditExpert;
