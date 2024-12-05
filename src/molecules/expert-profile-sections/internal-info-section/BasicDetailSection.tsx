
import { Box } from "@mui/material";
import { getCurrentUserName } from "../../../utils/role";
import "../basic-details-section/basic-detail-section.scss";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import { useState } from "react";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import { allowQc } from "../../../organisms/expert-filter-dialog/helper";
import { useSnackbar } from "notistack";







const InternalInfoSection = (props: any) => {
  const {
    id,
    qc_notes,
    offlimit_companies,
    offlimit_topics,
    internal_notes
  } = props.apiData;

  const {enqueueSnackbar} = useSnackbar();
  
  const allow_qc = allowQc()

  const [qcNote , setQcNote] = useState(qc_notes)
  const { setLoading } = useFullPageLoading();

  const note = `Quality Checked - ${getCurrentUserName()} | Date: ${new Date().toLocaleDateString('en-GB')}`

  const handleClick  = async () => {
    try {
    setLoading(true)
    const response = await RequestServer( APIRoutes.editExpert, "PATCH", {id:id,action: 'QualityCheck' ,qc_notes:note });
    if(response.success){
      enqueueSnackbar(response.message, {
        variant: "success",
      });
      setQcNote(note)
    } else{
      enqueueSnackbar(response.message, {
      variant: "warning",
    });
    }

    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false)
    }

  }

  return (
    <>
      <section className="profile-details-section expert-profile-basic-details">
        <h3>Internal Info</h3>
        <div>

          {internal_notes &&
            <div className="basic-detail">
              <h5>Internal Notes:</h5>
              <p>{internal_notes}</p>
            </div>
          }
          {qcNote ?
            <div className="basic-detail">
              <h5>QC Notes:</h5>
              <p>{qcNote}</p>
            </div>
            :
            allow_qc ?
              <div className="basic-detail">
                <h5>QC Notes:</h5>
                <Box sx={{ height: "21px" }} >
                  <AddCircleIcon
                    onClick={handleClick}
                    sx={{
                      color: "#EC9324",
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                    }}
                  />
                </Box>
              </div>
              :
              <></>
          }



          {offlimit_topics && (
            <div className="basic-detail">
              <h5>Off Limit Topics:</h5>
              <div className="function">
                {offlimit_topics.split(", ").map((f_name: any, index: any) => (
                  <p key={f_name + index}>{f_name}</p>
                ))}
              </div>
            </div>
          )}

          {offlimit_companies && (
            <div className="basic-detail">
              <h5>Off Limit Companies:</h5>
              <div className="function">
                {offlimit_companies.split(", ").map((f_name: any, index: any) => (
                  <p key={f_name + index}>{f_name}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
export default InternalInfoSection;
