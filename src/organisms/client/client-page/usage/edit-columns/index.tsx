import { useEffect, useState } from "react";
import DialogModal from "../../../../../atoms/dialog";
import { FiltersPayload, SetFiltersPayload } from "../types";
import EditColumnForm from "./form";
import { CircularProgress } from "@mui/material";
import { formatDefaultValue } from "./helper";
import { useFullPageLoading } from "../../../../../atoms/full-page-loading/loadingContext";
import { RequestServer } from "../../../../../utils/services";
import { APIRoutes } from "../../../../../constants";
import { useSnackbar } from "notistack";

type Props = {
    filters: FiltersPayload;
    setFilters: SetFiltersPayload;
    fk_client: string | null;
    isOpen: boolean;
    handleClose(): void;
    columns: string;
}

export function EditColumnsDialog({ filters, setFilters, fk_client, isOpen, handleClose, columns }: Props) {
    const { setLoading } = useFullPageLoading();
    const { enqueueSnackbar } = useSnackbar();


    const onSubmit = async (formData: any) => {

        if(!formData.action) {
            enqueueSnackbar("Choose an action", {
                variant: "warning"
            });
            return;
        }

        const columns = {...formData};

        delete columns.action;

        const all_columns = Object.keys(columns)
        .filter(key => columns[key])
        .join(',');

        if(!all_columns) {
          enqueueSnackbar("Select at least one column", {
              variant: "warning"
          });
          return;
        }

        const payload = {
            view: formData.action,
            fk_client: fk_client,
            columns: all_columns
        }

        setLoading(true);
        try {
          const response = await RequestServer(
            APIRoutes.clientsUsage,
            "PATCH",
            payload
          );
    
          if (response.success) {
            enqueueSnackbar("Usage table columns updated.", {
              variant: "success",
            });
            handleClose();
            setFilters((prev) => ({...prev, isFilterChange: true}));
          } else {
            console.log({ response });
            enqueueSnackbar(response.message.toString(), { variant: "warning" });
          }
        } catch (err) {
          console.error({ err });
          enqueueSnackbar("Request failed.", { variant: "error" });
        } finally {
          setLoading(false);
        }
    }


    return (
        <DialogModal
            title={"Edit Columns"}
            isOpen={isOpen}
            handleClose={handleClose}
        >
            <EditColumnForm
                handleClose={handleClose}
                defaultValues={formatDefaultValue(columns, filters)}
                onSubmit={onSubmit}
            />

        </DialogModal>
    )
}