import { Button, Grid, Typography } from "@mui/material";
import "./style.scss";
import Image from "../../assets/images/expert/link_colored.png";
import { handleCopy } from "../../molecules/expert-profile-sections/profile-section/helper";
import { useSnackbar } from "notistack";
import { contactedMedium, copyUrlStyles, medium } from "./helper";

const ExpertCardsDialogDetails = (props: any) => {
  const { isContactedForm, data } = props;
  const { enqueueSnackbar } = useSnackbar();
  const {
    name,
    source_link,
    note_visible_to_client,
    meta,
    domain_l0_value,
    domain_l1_value,
    domain_l2_value,
    domain_l3_value,
    domain_other,
    functions,
    internal_notes,
    referred_by_value,
    baseUrl,
    primary_email,
    primary_mobile,
  } = data;

  const isContactMedium = !!contactedMedium(
    meta?.contact_medium,
    meta,
    primary_email,
    primary_mobile
  );

  return (
    <Grid className="expert-card-dialog-container">
      <Grid container className="expert-card-dialog-header">
        <Grid item xs={3}>
          <Typography className="expert-card-dialog-data-type">
            Name:
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className="expert-card-dialog-data-value">
            {name}
          </Typography>
        </Grid>
      </Grid>

      <Grid container className="expert-card-dialog-header">
        <Grid item xs={3}>
          <Typography className="expert-card-dialog-data-type">
            Email:
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className="expert-card-dialog-data-value">
            {primary_email}
          </Typography>
        </Grid>
      </Grid>

      <Grid container className="expert-card-dialog-header">
        <Grid item xs={3}>
          <Typography className="expert-card-dialog-data-type">
            Phone No:
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className="expert-card-dialog-data-value">
            {primary_mobile}
          </Typography>
        </Grid>
      </Grid>

      {source_link &&
        <Grid container className="expert-card-dialog-header">
          <Grid item xs={3}>
            <Typography className="expert-card-dialog-data-type">
              Source Link:
            </Typography>
          </Grid>
          <Grid item xs={7.5}>
            <Typography className="expert-card-dialog-data-value link-color">
              {source_link}
            </Typography>
          </Grid>
          <Grid item xs={1.5} className="expert-card-dialog-btn">
            <Button
              sx={copyUrlStyles}
              onClick={() =>
                handleCopy(source_link, enqueueSnackbar, "Source Link")
              }
            >
              <img
                src={Image}
                alt="Copy Link"
                width={"16px"}
                style={{ marginRight: "3px" }}
              />
              Copy
            </Button>
          </Grid>
        </Grid>
      }

      {!isContactedForm && (
        <Grid container className="expert-card-dialog-header">
          <Grid item xs={3}>
            <Typography className="expert-card-dialog-data-type">
              Profile Link:
            </Typography>
          </Grid>
          <Grid item xs={7.5}>
            <Typography className="expert-card-dialog-data-value link-color">
              {baseUrl}
            </Typography>
          </Grid>
          <Grid item xs={1.5} className="expert-card-dialog-btn">
            <Button
              sx={copyUrlStyles}
              onClick={() =>
                handleCopy(baseUrl, enqueueSnackbar, "Profile Link")
              }
            >
              <img
                src={Image}
                alt="Copy Link"
                width={"16px"}
                style={{ marginRight: "3px" }}
              />
              Copy
            </Button>
          </Grid>
        </Grid>
      )}

      {note_visible_to_client && (
        <Grid container className="expert-card-dialog-header">
          <Grid item xs={3}>
            <Typography className="expert-card-dialog-data-type">
              Remark:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography className="expert-card-dialog-data-value">
              {note_visible_to_client}
            </Typography>
          </Grid>
        </Grid>
      )}

      {meta?.relevant_company &&
        <Grid container className="expert-card-dialog-header">
          <Grid item xs={3}>
            <Typography className="expert-card-dialog-data-type">
              Relevent Company:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography className="expert-card-dialog-data-value">
              {meta?.relevant_company?.name}
            </Typography>
            <Typography className="expert-card-dialog-data-value">
              ({meta?.relevant_company?.designation})
            </Typography>
          </Grid>
        </Grid>
      }

      {meta?.current_company && (
        <Grid container className="expert-card-dialog-header">
          <Grid item xs={3}>
            <Typography className="expert-card-dialog-data-type">
              Current Company:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography className="expert-card-dialog-data-value">
              {meta?.current_company?.name}
            </Typography>
            <Typography className="expert-card-dialog-data-value">
              ({meta?.current_company?.designation})
            </Typography>
          </Grid>
        </Grid>
      )}

      {(domain_l0_value || domain_l1_value || domain_l2_value || domain_l3_value || domain_other) &&
        <Grid container className="expert-card-dialog-header">
          <Grid item xs={3}>
            <Typography className="expert-card-dialog-data-type">
              Domains:
            </Typography>
          </Grid>
          <Grid item xs={9} className="expert-card-dialog-domain">
            <Typography className="expert-card-dialog-data-value">
              {domain_l0_value?.name}
            </Typography>
            <Typography className="expert-card-dialog-data-value">
              {domain_l1_value?.name}
            </Typography>
            <Typography className="expert-card-dialog-data-value">
              {domain_l2_value?.name}
            </Typography>
            {domain_l3_value?.name && (
              <Typography className="expert-card-dialog-data-value">
                {domain_l3_value?.name}
              </Typography>
            )}

            {domain_other?.split(", ")?.map((domain: any) => (
              <Typography className="expert-card-dialog-data-value">
                {domain}
              </Typography>
            ))}
          </Grid>
        </Grid>
      }

      {functions && (
        <Grid container className="expert-card-dialog-header">
          <Grid item xs={3}>
            <Typography className="expert-card-dialog-data-type">
              Functions:
            </Typography>
          </Grid>
          <Grid item xs={9} className="expert-card-dialog-domain">
            {functions?.split(", ")?.map((f: any) => (
              <Typography className="expert-card-dialog-data-value">
                {f}
              </Typography>
            ))}
          </Grid>
        </Grid>
      )}

      {internal_notes && (
        <Grid container className="expert-card-dialog-header">
          <Grid item xs={3}>
            <Typography className="expert-card-dialog-data-type">
              Internal Notes:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography className="expert-card-dialog-data-value">
              User Experience Design (UED). UX Research. User Interface
              Prototyping. Information Architecture. User-centered Design. User
              Flows
            </Typography>
          </Grid>
        </Grid>
      )}

      {referred_by_value && (
        <Grid container className="expert-card-dialog-header">
          <Grid item xs={3}>
            <Typography className="expert-card-dialog-data-type">
              Referee Expert:
            </Typography>
          </Grid>
          <Grid item xs={9} className="expert-card-dialog-domain">
            <Typography className="expert-card-dialog-data-value">
              {referred_by_value.name}
            </Typography>
            <Typography className="expert-card-dialog-data-value">
              (ID: {referred_by_value.id})
            </Typography>
          </Grid>
        </Grid>
      )}

      {!isContactedForm && isContactMedium && (
        <Grid container className="expert-card-dialog-header">
          <Grid item xs={3}>
            <Typography className="expert-card-dialog-data-type">
              Contact Medium:
            </Typography>
          </Grid>
          <Grid item xs={9} className="expert-card-dialog-domain">
            <Typography className="expert-card-dialog-data-value">
              {medium(meta?.contact_medium)}
            </Typography>
            <Typography className="expert-card-dialog-data-value">
              ({" "}
              {contactedMedium(
                meta?.contact_medium,
                meta,
                primary_email,
                primary_mobile
              )}{" "}
              )
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default ExpertCardsDialogDetails;
