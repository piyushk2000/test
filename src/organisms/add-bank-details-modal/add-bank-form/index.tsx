import { FormProvider, useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import styles from "../style.module.scss";
import CountryDetails from "../country-details";
import { emptyDefaultValues, submitIndiaForm, submitUsForm } from "../helper";
import { SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import FullDetailsForm from "../full-details-form";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useBankContext } from "../context";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";


type Props = {
  refresh(): void;
  handleClose(): void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit?: boolean;
  formDefaultValues?: any;
  showMainPageValue?: boolean;
}

export default function BankDetailsForm(props: Props) {
  const defaultValues = ("formDefaultValues" in props && props.isEdit) ? props.formDefaultValues : emptyDefaultValues;
  const methods = useForm({ defaultValues });
  const [showMainPage, setShowMainPage] = useState(props.showMainPageValue);
  const { msmeFileUrl } = useBankContext();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const id = queryParams.get("id");

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    if (!id) {
      enqueueSnackbar("Expert ID not found", {
        variant: "warning",
      });
      return;
    }

    if (props.isEdit && !props.formDefaultValues?.id) {
      enqueueSnackbar("Bank ID not found", {
        variant: "warning",
      });
      return;
    }

    if (!showMainPage) {
      setShowMainPage(true);
    } else {
      try {
        let response;
        props.setLoading(true);
        if (newFormData.bank_country === "India") {
          response = await submitIndiaForm(newFormData, parseInt(id), !!props.isEdit, props.formDefaultValues?.id, msmeFileUrl);
        } else {
          response = await submitUsForm(newFormData, parseInt(id), !!props.isEdit, props.formDefaultValues?.id);
        }

        if (response.success) {
          enqueueSnackbar(props.isEdit ? response.message : "Added Bank Account Successfully.", {
            variant: "success",
          });
          props.refresh();
          props.handleClose();
        } else {
          console.log({ response });
          if (response.error) {
            enqueueSnackbar(response?.error, { variant: "warning" });
          }

          if (response?.message) {
            enqueueSnackbar(response?.message?.toString(), {
              variant: "warning",
            });
          }
        }
        props.setLoading(false);
      } catch (err) {
        console.error({ err });
        enqueueSnackbar("Request failed.", { variant: "error" });
        props.setLoading(false);
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <Grid className={styles.formContainer} container>
          {showMainPage ? <FullDetailsForm isEdit={!!props.isEdit} /> : <CountryDetails />}

          <Grid className={styles.actionRow} item xs={12}>
            {showMainPage && !props.isEdit ? (
              <CustomBtnFilled
                label="back"
                variant="outlined"
                onClick={() => {
                  setShowMainPage(false);
                }}
              />
            ) : (
              <CustomBtnFilled
                label="cancel"
                variant="outlined"
                onClick={props.handleClose}
              />
            )}

            <CustomBtnFilled
              label={showMainPage ? "submit" : "Proceed"}
              variant="contained"
              buttonType="submit"
            />
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
