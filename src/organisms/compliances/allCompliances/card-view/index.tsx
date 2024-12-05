import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ContactCard from "../../../../molecules/contact/contact-card";

import NoResultFoundFilters from "../../../../atoms/noResultsFilters";
import CardsLoadingScreen from "../../../../atoms/cardsLoader";
import ComplianceCard from "../../../../molecules/compliance/compliance-card";
import { complianceData,getAllComplianceAPI } from "../types";
import { NumberQuestion } from "../../autoAprovalDialog/types";

type Props = {
  apiData: getAllComplianceAPI | null;
  isFilter: boolean;
  openReviewDialog:(questions:NumberQuestion[])=>void;
  openEditDialog: (data: complianceData) => void;
};


const ComplianceCards = ({ apiData, isFilter,openReviewDialog, openEditDialog }: Props) => {
  return (
    <>
      {apiData?.success ? (
        <>
          {apiData?.data?.length > 0 ? (
            <Grid container spacing={2}>
              {apiData?.data?.map((data: complianceData) => (
                <Grid key={data.id} item xs={12} md={6} lg={4}>
                  <ComplianceCard data={data} openReviewDialog={openReviewDialog} openEditDialog={openEditDialog} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <>
              {!isFilter ? (
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    mt={4}
                  >
                    <Typography
                      variant="h2"
                      sx={{ fontSize: "20px", fontWeight: "500" }}
                    >
                      No Client Contacts Found
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <NoResultFoundFilters />
              )}
            </>
          )}
        </>
      ) : (
        <CardsLoadingScreen />
      )}
    </>
  );
};

export default ComplianceCards;
