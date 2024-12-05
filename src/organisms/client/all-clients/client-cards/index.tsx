import Pagination from "@mui/material/Pagination";
import CardsLoadingScreen from "../../../../atoms/cardsLoader";
import NoResultFoundFilters from "../../../../atoms/noResultsFilters";
import { clientCardsProps, getClientsData } from "../types";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import PaginationComponent from "../../../../atoms/pagination";
import ClientCard from "../../../../molecules/client-card/ClientCard";

const ClientCards = ({ apiData }: clientCardsProps) => {
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1
  })
  const [currentData, setData] = useState<getClientsData[] | null>(null);
  const rowsPerPage = 12;

  function paginationHandler(e: any, page: any) {
    if (!apiData) return;

    setPagination((prev) => ({
      ...prev,
      page: page
    }));

    // WHY deleting 1 from page, because that's how we have
    // written our slice function, we want when page 1 is clicked
    // slice should be (0,12) , not (12,24).
    const newPage = page - 1;

    const rowData = apiData.data.slice(
      newPage * rowsPerPage,
      newPage * rowsPerPage + rowsPerPage
    );

    setData(rowData);
  }

  useEffect(() => {
    if (apiData) {
      setPagination({
        page: 1,
        totalPages: Math.ceil(apiData.data.length / rowsPerPage)
      })
      setData(apiData.data.slice(0, rowsPerPage))
    }
  }, [apiData]);

  return (
    <>
      {(apiData?.success && currentData) ? (
        apiData.data.length > 0 ? (
          <>
            <Grid container spacing={2}>
              {currentData.map((data: getClientsData) => (
                <Grid key={data.id} item xs={12} md={6} lg={4}>
                  <ClientCard {...data} />
                </Grid>
              ))}
            </Grid>
            <PaginationComponent
              page={pagination.page}
              totalPages={pagination.totalPages}
              paginationHandler={paginationHandler}
              totalResult={apiData.data.length}
              hideRowsPerPage
            />
          </>
        ) : (
          <NoResultFoundFilters />
        )
      ) : (
        <CardsLoadingScreen />
      )}
    </>
  );
};

export default ClientCards;
