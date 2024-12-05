import "./personal-info-section.scss";
import PrimaryTab from "../../../atoms/expert-profile/primaryTab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DetailHeadingStyles, paraStyles } from "./styles";
import { HowToUploadPE, secondaryFields } from "./helper";
import { handleCopy } from "../profile-section/helper";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../constants";
import { useSnackbar } from "notistack";
import { isAdmin, isInfollion } from "../../../utils/role";
import { Stack } from "@mui/material";

const PersonalInfoSection = (props: any) => {
  const {
    primary_email,
    primary_mobile,
    nicknames,
    no_pe_certificate,
    price_per_hour,
    price_per_hour_currency,
    additional_email_one,
    additional_email_two,
    additional_mobile_one,
    additional_mobile_two,
    primary_bank,
    id
  } = props.apiData;

  return (
    <Box
      component="section"
      className="profile-details-section expert-profile-personal-info"
    >
      <Typography variant="h6" component="h3">
        Personal Info
      </Typography>
      <Grid container spacing={"0.5rem"}>
        <Grid item xs={12}>
          <InfoDetailsTable
            title="Email ID"
            primary_feild={primary_email}
            secondary_feilds={secondaryFields(additional_email_one, additional_email_two)}
            isEmail
          />
        </Grid>
        <Grid item xs={12}>
          <InfoDetailsTable
            title="Mobile Number"
            primary_feild={primary_mobile}
            secondary_feilds={secondaryFields(additional_mobile_one, additional_mobile_two)}
          />
        </Grid>
        {nicknames &&
          <Grid item xs={12}>
            <InfoDetailsTable
              title="Nick Names"
              secondary_feilds={nicknames.split(",")}
            />
          </Grid>
        }
        {!isInfollion() &&
          <>
            <Grid item xs={12}>
              {
                <InfoDetailsTable
                  title="Bank Details"
                  isAvailable={primary_bank}
                  addBank={!primary_bank}
                  link={`${AppRoutes.EXPERT_PROFILE}?id=${id}&add_bank=1`}
                  isVisible={isAdmin() ? !!primary_bank : true}
                />
              }
            </Grid>
            <Grid item xs={12}>
              <InfoDetailsTable
                title="PE Certificate"
                pe_cert={{ is_pe: true, url: no_pe_certificate }}
              />
            </Grid>
          </>
        }
        {price_per_hour && price_per_hour_currency &&
          <Grid item xs={12}>
            <InfoDetailsTable
              title="Cost Price"
              secondary_feilds={[price_per_hour + " / hr ( " + price_per_hour_currency + " )"]}
            />
          </Grid>
        }
      </Grid>
    </Box>
  );
};
export default PersonalInfoSection;

function InfoDetailsTable({
  primary_feild,
  title,
  isAvailable,
  secondary_feilds,
  pe_cert = { is_pe: false, url: "" },
  isEmail = false,
  addBank = false,
  link,
  isVisible = true
}: {
  primary_feild?: string;
  title: string;
  isAvailable?: boolean;
  secondary_feilds?: string[];
  pe_cert?: { is_pe: boolean; url: string };
  isEmail?: boolean;
  addBank?: boolean;
  link?: string,
  isVisible?: boolean
}) {
  const { enqueueSnackbar } = useSnackbar();
  const fullBankAddURL = window.location.href + "&add_bank=1";
  return (
    <>
      {isVisible && (
        <>
          <Grid container>
            <Grid item xs={5} sm={3.5} md={2} lg={1.5}>
              <Typography component="h4" sx={DetailHeadingStyles}>
                {title}
              </Typography>
            </Grid>

            <Grid item xs={7} sm={8.5} md={10} lg={10.5}>
              {isAvailable ? (
                <Stack
                  sx={{
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { sm: "center", xs: "flex-start" },
                    gap: { xs: "0.5rem", sm: "1rem" }
                  }}
                >
                  <p style={{ color: "rgb(35, 174, 73)", fontWeight: "500" }}>
                    Available
                  </p>
                  <p
                    onClick={() =>
                      handleCopy(
                        fullBankAddURL,
                        enqueueSnackbar,
                        "Bank Form Link"
                      )
                    }
                    style={{
                      color: "black",
                      fontWeight: "600",
                      border: "1px solid black",
                      padding: "1px 8px",
                      borderRadius: "15px",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    Bank Form Link
                  </p>
                </Stack>

              ) : null}
              {addBank && (
                <Stack
                  sx={{
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { sm: "center", xs: "flex-start" },
                    gap: { xs: "0.5rem", sm: "1rem" }
                  }}
                >
                  <p>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      to={link || ""}
                      style={{
                        backgroundColor: "red",
                        fontWeight: "bold",
                        color: "white",
                        padding: "3px 8px",
                        borderRadius: "15px",
                        fontSize: "12px",
                      }}
                    >
                      Add Bank Account
                    </Link>
                  </p>
                  <p
                    onClick={() =>
                      handleCopy(
                        fullBankAddURL,
                        enqueueSnackbar,
                        "Bank Form Link"
                      )
                    }
                    style={{
                      color: "black",
                      fontWeight: "600",
                      border: "1px solid black",
                      padding: "1px 8px",
                      borderRadius: "15px",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    Bank Form Link
                  </p>
                </Stack>
              )}

              {pe_cert?.is_pe &&
                (pe_cert.url ? (
                  <p style={{ color: "rgb(35, 174, 73)", fontWeight: "500" }}>
                    <a
                      href={pe_cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </p>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <HowToUploadPE />
                  </Box>
                ))}

              {!!primary_feild ? (
                <>
                  <PrimaryTab
                    handlClick={async () =>
                      isEmail &&
                      handleCopy(
                        primary_feild,
                        enqueueSnackbar,
                        "Primary Email"
                      )
                    }
                    label={primary_feild}
                    isEmail={isEmail}
                  />
                </>
              ) : null}

              {secondary_feilds &&
                secondary_feilds.map((item: any, index: any) => (
                  <Box
                    width={"100%"}
                    maxWidth={"max-content"}
                    key={item + index}
                  >
                    <Typography
                      onClick={async () =>
                        isEmail && handleCopy(item, enqueueSnackbar, item)
                      }
                      key={item + index}
                      sx={
                        isEmail
                          ? { ...paraStyles, cursor: "pointer" }
                          : paraStyles
                      }
                      component="p"
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
