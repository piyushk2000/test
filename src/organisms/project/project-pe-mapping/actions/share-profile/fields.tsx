import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Snippets from "./fields/snippets";
import { lineBreakStyle } from "./style";
import { FieldProps } from "./type";
import ProfileSection from "./fields/profileSection";
import FormFields from "./fields/formFields";
import FormCancelSubmitBtns from "../../../../../atoms/formCancelSubmitBtns";
import CustomBtnFilled from "../../../../../atoms/form-molecules/CustomBtnFilled";
import { useHookFormContext } from "../../../../../utils/hooks/useHookFormContext";
import { useEffect } from "react";
import { handleCopy } from "../../../../../molecules/expert-profile-sections/profile-section/helper";
import { useSnackbar } from "notistack";
import { AppRoutes } from "../../../../../constants";
import { useGetParams } from "../../../../../utils/hooks/useGetParams";
import { getPeMappingSharedUrlWithoutToken } from "../../../../project-detail/mapping/helper";
import { useProjectDetailsContext } from "../../../../../atoms/project-details/projectContext";

const Fields = ({ handleClose, expert_id, handleChange, designation, company, is_agenda_respond, expertsData, location, isUsedInBulk, isBulkLast,group }: FieldProps) => {
  const project_id = useGetParams("project_id");
  const { watch } = useHookFormContext();
  const { enqueueSnackbar } = useSnackbar()

  const { defaultValues } = useProjectDetailsContext();
  const client_id = defaultValues?.projectDetails?.client_id || "";
  const snippetsData = expertsData?.snippets?.length !== 0
    ? expertsData.snippets.map((snip: any, index: any) => ({
      ...snip,
      id: `snip-${index}`,
    }))
    : []

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        handleChange();
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <Grid container overflow={"hidden"}>
      <Grid item xs={12} md={8} sx={{ position: "relative" }}>
        <Snippets expert_id={expert_id} snippetsData={snippetsData} />
      </Grid>
      <Grid item xs={12} sm={0.2} margin={{ xs: "1rem", sm: "0" }}>
        <Box sx={lineBreakStyle}></Box>
      </Grid>

      <Grid
        container
        item xs={12} md={3.8} sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start"
        }}>
        <Grid container item xs={12}>
          <ProfileSection expertsData={expertsData} expert_id={expert_id} company={company} designation={designation} location={location} />
          <FormFields is_agenda_respond={is_agenda_respond} group={group} />
          <Grid
            item
            xs={12}
            display={"flex"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
            mb={"1rem"}
          >
            <CustomBtnFilled
              label="Copy Link"
              variant="outlined"
              onClick={() => {
                const previewUrl = getPeMappingSharedUrlWithoutToken(project_id, client_id, String(expert_id))
                handleCopy(previewUrl, enqueueSnackbar, "Link")
              }}
              styles={{ width: "100%", fontWeight: "400", marginTop: "7px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormCancelSubmitBtns cancelLabel={isUsedInBulk ? "Skip" : "Cancel"} handleClose={handleClose} submitLabel={
              isUsedInBulk ? (isBulkLast ? "Share" : "Share & Next") : "Share"
            } />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Fields;
