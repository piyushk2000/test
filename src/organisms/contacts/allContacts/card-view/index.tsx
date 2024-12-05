import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ContactCard from "../../../../molecules/contact/contact-card";
import { contactData, getAllContactsAPI } from "../types";
import NoResultFoundFilters from "../../../../atoms/noResultsFilters";
import CardsLoadingScreen from "../../../../atoms/cardsLoader";

type Props = {
  apiData: getAllContactsAPI | null;
  isFilter: boolean;
  openEditContact: (id: number) => void;
};

const ContactCards = ({ apiData, isFilter, openEditContact }: Props) => {
  return (
    <>
      {apiData?.success ? (
        <>
          {apiData?.data?.length > 0 ? (
            <Grid container spacing={2}>
              {apiData?.data?.map((data: contactData) => (
                <Grid key={data.id} item xs={12} md={6} lg={4}>
                  <ContactCard data={data} openEditContact={openEditContact} />
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

export default ContactCards;