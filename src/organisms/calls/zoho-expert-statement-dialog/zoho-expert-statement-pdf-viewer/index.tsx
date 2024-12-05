import React, { useState, useEffect } from "react";
import { base64toBlob } from "../../../../utils/utils";
import { RequestServer } from "../../../../utils/services";
import { APIRoutes } from "../../../../constants";
import { CircularProgress } from "@mui/material";
import PdfViewer from "../../../../atoms/pdf-viewer/pdf";
import { BoxFlex } from "../../../../atoms/boxSpaceBtw";
import { useFullPageLoading } from "../../../../atoms/full-page-loading/loadingContext";
import NoResultFoundFilters from "../../../../atoms/noResultsFilters";

type Props = {
  filter: string;
};

function ZohoExpertStatementPdfViewer({ filter }: Props) {
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const { setLoading , isLoading} = useFullPageLoading();

  useEffect(() => {
    // Fetch the PDF as a Blob from your API
    fetchPdfBlob();
  }, []);

  const fetchPdfBlob = async () => {
    setLoading(true);
    try {
      // Fetch the PDF as a Blob from your API
      const response = await RequestServer(APIRoutes.ZohoExpertStatement + filter, "GET");

      if (response.success) {
        const blob = base64toBlob(response.data.base64Data, "application/pdf");
        const url = window.URL.createObjectURL(blob);
        setPdfBlobUrl(url);
      } else {
        setPdfBlobUrl(null);
      }
    } catch (error) {
      console.error("Error fetching PDF Blob:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {!isLoading ? 
      <>
      {
        pdfBlobUrl ? 
        <PdfViewer pdfUrl={pdfBlobUrl} /> :
        <NoResultFoundFilters text={"No Data Found"} />
      }
      </>
      : <CircularProgress sx={{ color: "var(--primary-color)", mt: "10px" }} />}
    </div>
  );
}

export default ZohoExpertStatementPdfViewer;
