// import "../project-detail/project-detail-card/project-detail-cards.scss";
import Box from "@mui/material/Box";
import "./attachment-section.scss";
import CloseIcon from "../../../assets/images/expert/close.png";
import { AttachmentIcons } from "../../../atoms/attachment-icons/attachment-icon";
import { useBoolean } from "../../../utils/hooks/useBoolean";
import AddAttachmentForm from "../../../organisms/add-attachment-form";
import { useGetParams } from "../../../utils/hooks/useGetParams";
import { useFetch } from "../../../utils/hooks/useFetch";
import { APIRoutes } from "../../../constants";
import { DocumentStrip, formatDocuments } from "./helper";
import { ChipSkeleton } from "../../../atoms/skeletons/chipSkeleton";
import { TextSkeleton } from "../../../atoms/skeletons/textSkeleton";

const AttachmentSection = (props: any) => {
  const {
    value: open,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean();
  const id = useGetParams("id");
  const {
    loading,
    data: documents,
    error,
    refetch,
  } = useFetch(APIRoutes.documents + "?fk_id=" + id);

  const formattedDocuments = formatDocuments(documents);

  return (
    <>
      <Box className="attachment-section">
        <div className="attachment-header">
          <h2>Attachment</h2>
          <AttachmentIcons
            isIcon={true}
            title="Close"
            icon={CloseIcon}
            handleClick={props.closeAttachment}
          />
        </div>
        <div>
          <button onClick={openModal} className="upload-btn">
            + Upload Attachment
          </button>
        </div>
        <>
          <div className="document-details">
            <h3>Financial Documents</h3>
            {formattedDocuments["Financial Documents"].length > 0 ? (
              <>{formattedDocuments["Financial Documents"].map((item) => (
                  <DocumentStrip {...item} key={item.label} doc_id={item.doc_id} refetch={refetch} />
                ))}</>
            ) : null}
            {props.pe_certificate_url &&
              <DocumentStrip createdAt={null} label="PE Certificate" url={props.pe_certificate_url} doc_id={props.pe_certificate_url} refetch={async () => {
                await refetch();
                await props.getAllProfileDetails();
              }} />
            }
          </div>
        </>

        {loading && (
          <>
            <TextSkeleton />
            <ChipSkeleton />
            <ChipSkeleton />
            <ChipSkeleton />
          </>
        )}

        {formattedDocuments["Others"].length > 0 ? (
          <>
            <div className="document-details">
              <h3>Others</h3>
              {formattedDocuments["Others"].map((item) => (
                <DocumentStrip {...item} key={item.label} doc_id={item.doc_id} refetch={refetch} />
              ))}
            </div>
          </>
        ) : null}

        <AddAttachmentForm
          refetch={refetch}
          open={open}
          closeDialog={closeModal}
          getAllProfileDetails={props.getAllProfileDetails}
        />
      </Box>
    </>
  );
};
export default AttachmentSection;
