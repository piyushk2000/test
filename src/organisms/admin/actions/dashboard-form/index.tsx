import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fields from "./fields"
import { defaultFormTheme } from "../../../../atoms/defaultFormTheme";
import { useSnackbar } from "notistack";
import { RequestServer } from "../../../../utils/services";
import { APIRoutes } from "../../../../constants";
import { useFullPageLoading } from "../../../../atoms/full-page-loading/loadingContext";
import { removeWhiteSpacesFromForm } from "../../../../utils/utils";
import { useEffect, useState } from "react";

export type Props = {
    handleClose: () => void;
    isChange: any;
    handleSubmitClose: () => void;
    admin_id: string | null;
    dashboards: any;
    refetchAdmin: any;
}

const AdminDashboard = ({ handleClose, isChange, handleSubmitClose, admin_id ,dashboards,refetchAdmin }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = useFullPageLoading();
    

    const generateMetabaseString = (metabaseObj: { [key: string]: number }): string => {
        if (!metabaseObj || Object?.keys(metabaseObj).length === 0) {
          return '';
        }
      
        return Object.entries(metabaseObj)
          .map(([key, value]) => `${key.trim()}=${value}`)
          .join(' ; ');
      }

    // useEffect(() => {
    //     const fetchDashboardIds = async () => {
    //         try {
    //             const response = await RequestServer(APIRoutes.getDashboardIds, 'get');
    //             setDashboardIds(response.data)
    //         }
    //         catch (error) {
    //             console.log('Failed to fetch dashboard IDs');
    //         }
    //     };
        
    //     fetchDashboardIds();
    // }, []);

    // useEffect(() => { console.log(dashboardIds) } , [dashboardIds])


    const onSubmit: SubmitHandler<{ dashboards:string }> =
        async (
            formData: {
                dashboards: string | null
            }
        ) => {
            const dashboard = formData.dashboards;
            console.log(dashboard)

            const parseMetabasedata = (metabase_data: string) => {
                let obj: { [key: string]: number } = {};
                if (!metabase_data) return null
                const metabaseArr = metabase_data.split(';')
    
                for (let ele of metabaseArr) {
                    const parts = ele.split('=')
                    const namePart = parts[0].trim()
                    const numberPart = Number(parts[1])
                    if (!parts[1]) {
                        enqueueSnackbar("Format error: Please ensure you're using the correct 'name=number;' structure.")
                        return null;
                    }
                    obj[namePart] = numberPart
                }
                return obj
            }
    
            let metabaseObj
            if (dashboard) {
                metabaseObj = parseMetabasedata(dashboard)
                if (!metabaseObj) {
                    return
                }
            }

            if (!admin_id) {
                    return;
             }
    
            const payload = {
                id: parseInt(admin_id),
                metabase: metabaseObj
            };

            try {
                const response = await RequestServer(
                    APIRoutes.UPDATE_METABASE_URL,
                    "PATCH",
                    payload
                );
    
                if (response.success) {
                    enqueueSnackbar("Employee edited.", {
                        variant: "success",
                    });
    
                } else {
                    console.log({ response });
                    enqueueSnackbar(response.message.toString(), { variant: "warning" });
                }
            } catch (err) {
                console.error({ err });
                enqueueSnackbar("Request failed.", { variant: "error" });
            } finally {
                setLoading(false);
                refetchAdmin();
                handleSubmitClose();
            }
        }

    const defaultValues = {
        dashboards : generateMetabaseString(dashboards),
    }

    const methods = useForm({ defaultValues });

    const defaultTheme = createTheme(defaultFormTheme);

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={defaultTheme}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <Fields handleClose={handleClose} isChange={isChange} />
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default AdminDashboard;
