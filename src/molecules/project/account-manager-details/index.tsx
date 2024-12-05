import { Grid } from "@mui/material";
import DialogModal from "../../../atoms/dialog"
import { TitleValueProject } from "../../../pages/Profile-shared/projectDetailsCard";
import { useFetch } from "../../../utils/hooks/useFetch";
import { APIRoutes } from "../../../constants";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import PageLayout from "../../../atoms/page-layout";
import { useEffect } from "react";

type Props = {
    isOpen: boolean;
    handleClose: () => void;
    acc_manager_id: number | null;
}

const AccountManagerContactDetails = ({ isOpen, handleClose, acc_manager_id }: Props) => {
    const { data: AccManagerDetails, loading } = useFetch(`${APIRoutes.users}?id=${acc_manager_id}&show_columns=name,email,mobile`, {
        variables: [acc_manager_id]
    })

    const { setLoading } = useFullPageLoading();

    useEffect(() => {
        setLoading(loading);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    return (
        <PageLayout>
            {!!AccManagerDetails &&
                <DialogModal
                    title={"Contact Details"}
                    isOpen={isOpen}
                    handleClose={handleClose}
                >
                    <Grid container sx={{ "& p": { fontSize: "14px" } }} mt={"10px"}>
                        <TitleValueProject title="Name:" value={AccManagerDetails[0]?.name} />
                        <TitleValueProject title="Email:" value={AccManagerDetails[0]?.email} />
                        <TitleValueProject title="Phone Number:" value={AccManagerDetails[0]?.mobile} />
                    </Grid>
                </DialogModal>
            }
        </PageLayout>

    )
}

export default AccountManagerContactDetails