import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { useEffect, useRef, useState } from "react";
import { paginationStyles } from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import { getProfileDetails } from "./helper";
import BoxCenter from "../../atoms/boxCenter";
import NoResultFoundFilters from "../../atoms/noResultsFilters";
import { AppRoutes } from "../../constants";
import CardsLoadingScreen from "../../atoms/cardsLoader";
import { isSelected, toggleItemInArray } from "../../common/select";
import ClientLoginProfileCard from "../../atoms/profile-cardV1/clientloginProfileCard";
import { useGetParams } from "../../utils/hooks/useGetParams";
import { filterPayload } from "../../pages/Experts/types";
import ProfilePictureDialog from "../../atoms/profile-picture-dialog";

type Props = {
    apiData: any;
    setApiData: any;
    filterPayload: any;
    selectedCards: any;
    setSelectedCards: any;
    selectExpert: any;
    isExpertLoading: any;
    setExpertLoading: any;
    setFilterPayload: any;
    controllerRef: any;
}

type Dialog = {
    showImage: { id: any; state: boolean; image: string | null };
}

const ClientLoginCards = ({
    apiData,
    setApiData,
    filterPayload,
    selectedCards,
    setSelectedCards,
    selectExpert,
    isExpertLoading,
    setExpertLoading,
    setFilterPayload,
    controllerRef
}: Props) => {
    const navigate = useNavigate();
    const project_id = useGetParams("project_id");
    const page = useGetParams("page");
    const [dialog, setDialog] = useState<Dialog>({
        showImage: { id: null, state: false, image: null }
    });


    const handleShowImageDialogOpen = (id: any, image: string | null) => {
        setDialog((prev) => ({
            ...prev,
            showImage: { state: true, id, image },
        }));
    };


    const paginationHandler = async (e: any, value: any) => {
        if (page && +page !== value) {
            setExpertLoading(true);
            navigate(AppRoutes.EXPERT_SEARCH + "?page=" + value);
        }
    };

    useEffect(() => {
        if (!filterPayload.isFilterChange) {
            if (page) {
                getProfileDetails(
                    page,
                    setApiData,
                    setExpertLoading,
                    filterPayload,
                    setFilterPayload,
                    project_id,
                    controllerRef
                );
            } else {
                navigate(AppRoutes.EXPERT_SEARCH + "?page=1");
            }
        }
        // eslint-disable-next-line
    }, [page, filterPayload.isFilterChange]);

    useEffect(() => {
        if (filterPayload.isFilterChange) {
            setFilterPayload((filters: filterPayload) => ({
                ...filters,
                isFilterChange: false,
            }));
            navigate(AppRoutes.EXPERT_SEARCH + "?page=1");
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterPayload.isFilterChange]);

    return (
        <>
            {!isExpertLoading ? (
                <>
                    {apiData?.total === 0 ? (
                        (!filterPayload.isFilterChange && project_id) ?
                            <NoResultFoundFilters text={"No experts are mapped to the specified Project with ID: " + project_id} /> : <NoResultFoundFilters />
                    ) : (
                        <>
                            <Grid container spacing={2} mt={1}>
                                {apiData?.data?.map((profile: any) => (
                                    <Grid key={profile.id} item xs={12} md={6} lg={4}>
                                        <ClientLoginProfileCard
                                            {...profile}
                                            pageNo={page}
                                            selected={isSelected<{ label: string; value: number }>(profile.id, selectedCards)}
                                            toggleSelected={() => {
                                                setSelectedCards(
                                                    toggleItemInArray<{ label: string; value: number }>(selectedCards, {
                                                        label: profile.name,
                                                        value: profile.id,
                                                    })
                                                );
                                            }}
                                            handleShowImageDialogOpen={() => handleShowImageDialogOpen(profile.id, profile.picture)}
                                            selectExpert={selectExpert}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                            <Pagination
                                sx={paginationStyles}
                                page={apiData?.page}
                                count={apiData?.totalPages}
                                onChange={paginationHandler}
                            />
                            <BoxCenter>
                                <p>
                                    Total Results : <span> {apiData?.total || 0}</span>
                                </p>
                            </BoxCenter>
                        </>
                    )}
                </>
            ) : (
                <CardsLoadingScreen />
            )}


            {/* Image Dialogs */}
            {dialog.showImage.state &&
                <ProfilePictureDialog
                    isOpen={dialog.showImage.state}
                    handleClose={() => setDialog((prev) => ({ ...prev, showImage: { id: null, state: false, image: null } }))}
                    image={dialog.showImage.image}
                    openEditDialog={() => { }}
                    openDeleteDialog={() => { }}
                />
            }
        </>
    );
};

export default ClientLoginCards;
