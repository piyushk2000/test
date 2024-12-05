import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { CustomFontTheme, deleteBankDetails, getFormattedDetails, getbankDetails, setAsPrimary } from "./helper";
import styles from "./style.module.scss";
import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled";
import { useSnackbar } from "notistack";
import Loading from "../../atoms/loading";
import { isAdmin, isSuperAdmin } from "../../utils/role";
import BankDetailsFormModal from "../../organisms/add-bank-details-modal";
import { useBoolean } from "../../utils/hooks/useBoolean";
import { Link } from "react-router-dom";

type Props = {
  open: boolean;
  closeDialog: () => void;
  bankDetail: any;
  isPrimary: boolean;
  refresh: any;
};

export default function BankDetails({
  open,
  closeDialog,
  bankDetail,
  isPrimary,
  refresh
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { value: isEditBankFormOpen, setFalse: closeEditBankForm, setTrue: openEditBankForm } = useBoolean();
  const [loading, setLoading] = React.useState(false);

  async function setPrimary() {
    try {
      setLoading(true)
      const response = await setAsPrimary(bankDetail.id);

      if (response.success) {
        enqueueSnackbar("Bank account set as primary.", {
          variant: "success",
        });
        refresh()
        closeDialog();
      } else {
        if (response.error) {
          enqueueSnackbar(response?.error, { variant: "warning" });
        }

        if (response?.message) {
          enqueueSnackbar(response?.message?.toString(), {
            variant: "warning",
          });
        }
      }
      setLoading(false)
    } catch (err) {
      console.error({ err });
      enqueueSnackbar("Request failed.", { variant: "error" });
      setLoading(false)
    }
  }

  return (
    <>
      <ThemeProvider theme={CustomFontTheme}>
        <Dialog maxWidth={"sm"} open={open} onClose={closeDialog}>
          <Loading loading={loading} />
          <DialogTitle
            sx={{
              minWidth: "500px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className="dialog-header px-8 py-5"
          >
            <p>Bank Details</p>
            <IconButton aria-label="close" onClick={closeDialog}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent
            sx={{ paddingBottom: 0 }}
            className="add-project-modal-content gray-scroolbar"
          >
            <div className={styles.bankDetailsContainer}>
              <div className={styles.bankDetails}>
                <div>
                  <p className={styles.accountNumber}>
                    {bankDetail?.bank_details?.account_number}
                  </p>
                  <p className={styles.bankName}>
                    {bankDetail?.bank_details?.bank_name}
                  </p>
                </div>
              </div>
            </div>

            {/* <div className={styles.devider}></div>
          <div className={styles.container}>
            <div className={styles.toggle}>
              <p>Set As Primary</p>

              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
          </div> */}

            <div className={styles.devider}></div>

            <div className={styles.container}>
              <div className={styles.mainDetails}>
                {getFormattedDetails(bankDetail, isPrimary).map((data) => {

                  if (!data.value) return <></>;

                  if (data.label === "MSME Certificate") {
                    return <>
                      <div className={styles.row}>
                        <div className={styles.label}>{data.label}</div>
                        <Link target="_blank" rel="noopener noreferrer" to={data.value} className={styles.valueLink}>View</Link>
                      </div>
                    </>
                  }

                  return (
                    <div className={styles.row}>
                      <div className={styles.label}>{data.label}</div>
                      <div className={styles.value}>{data.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </DialogContent>

          {
            !isAdmin() &&
            <DialogActions className={styles.actions}>
              {isSuperAdmin() &&
                <CustomBtnFilled
                  label="Delete"
                  variant="Contained"
                  styles={{
                    backgroundColor: "#FD5C63",
                    fontWeight: "600"
                  }}
                  onClick={async () => {
                    await deleteBankDetails(getbankDetails(bankDetail, isPrimary), enqueueSnackbar, refresh,
                      closeDialog)
                  }}
                />
              }

              <CustomBtnFilled
                label="Edit Bank Details"
                variant="outlined"
                onClick={openEditBankForm}
              />
              {isPrimary ? null : (
                <>
                  <CustomBtnFilled
                    label="Set as primary account"
                    variant="outlined"
                    onClick={setPrimary}
                  />
                </>
              )}
            </DialogActions>
          }


        </Dialog>
      </ThemeProvider>

      {/* Edit Bank Details */}
      {isEditBankFormOpen &&
        <BankDetailsFormModal
          open={isEditBankFormOpen}
          closeDialog={() => {
            closeEditBankForm()
            closeDialog()
          }}
          refresh={refresh}
          isEdit
          formDefaultValues={getbankDetails(bankDetail, isPrimary)}
          showMainPageValue
          msmeUrl={bankDetail.bank_details.msme_certificate || ""}
        />
      }
    </>
  );
}
