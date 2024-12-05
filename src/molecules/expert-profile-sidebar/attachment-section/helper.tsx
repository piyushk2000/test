import { AttachmentIcons } from "../../../atoms/attachment-icons/attachment-icon";
import File from "../../../assets/images/expert/file.png";
import Download from "../../../assets/images/expert/download.png";
import Visibility from "../../../assets/images/expert/visibility.png";
import DeleteIcon from "../../../assets/images/expert/delete-icon.png";
import { IconButton, Tooltip } from "@mui/material";
import { LocalDayjs } from "../../../utils/timezoneService";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import { EnqueueSnackbar, useSnackbar } from "notistack";
import { addDocument } from "../../../organisms/add-attachment-form/helper";
import { useGetParams } from "../../../utils/hooks/useGetParams";
import { isSuperAdmin } from "../../../utils/role";

type Documents = {
  id: number;
  doc_type: string;
  url: string;
  table: string;
  fk_id: number;
  created_at: string;
  fk_creator: number;
}[];

type doc = {
  label: string;
  url: string;
  createdAt: string
  doc_id: number
};

type FormattedDocuments = {
  "Financial Documents": doc[];
  Others: doc[];
};

const financialDocuments = [
  "PAN Card",
  "GST Certificate",
  "Cancelled Cheque",
  "PE Certificate",
];

export function formatDocuments(document: Documents) {
  let obj: FormattedDocuments = {
    "Financial Documents": [],
    Others: [],
  };
  document &&
    document.forEach((item) => {
      if (financialDocuments.includes(item.doc_type)) {
        obj["Financial Documents"].push({
          label: item.doc_type,
          url: item.url,
          createdAt: LocalDayjs(item.created_at).format("hh:mma DD-MM-YYYY"),
          doc_id: item.id,
        });
      } else {
        obj["Others"].push({
          label: item.doc_type,
          url: item.url,
          createdAt: LocalDayjs(item.created_at).format("hh:mma DD-MM-YYYY"),
          doc_id: item.id,
        });
      }
    });

  return obj;
}

const handleDelete = async (label: string, doc_id: number, enqueueSnackbar: EnqueueSnackbar, refetch: () => Promise<void>, expert_id: string | null) => {
  try {

    let payload;

    if (label === "PE Certificate") {
      payload = {
        doc_type: 'no_pe_certificate',
        id: expert_id
      }
    } else {
      payload = {
        doc_type: label,
        id: doc_id
      }
    }

    const response = await RequestServer(APIRoutes.documents, "DELETE", payload);

    if (response.success) {
      enqueueSnackbar(`${label} Deleted`, {
        variant: "success"
      })
      await refetch();
    } else {
      console.log({ response });
      enqueueSnackbar(response.message || response.error, {
        variant: "warning"
      })
    }

  } catch (err) {
    console.log(err);

  }
}

export function DocumentStrip({ label, url, createdAt, doc_id, refetch }: { label: string; url: string, createdAt: string | null, doc_id: number, refetch: () => Promise<void> }) {
  const { enqueueSnackbar } = useSnackbar();
  const expert_id = useGetParams("id");

  return (
    <div className="document">
      <Tooltip title={createdAt ? `${label} | Uploaded On: ${createdAt}` : label} arrow>
        <div>
          <img src={File} width="18px" height="18px" alt="file" />
          <p style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}>{label}</p>
        </div>
      </Tooltip>
      <div className="actions-on-document">
        <Tooltip title="Download" arrow>
          <IconButton
            onClick={() => handleDownload(url)}
            sx={{ padding: "8px" }}
          >
            <img width="14px" height="14px" src={Download} alt="download" />
          </IconButton>
        </Tooltip>
        {isSuperAdmin() &&
          <AttachmentIcons
            isIcon={true}
            title="Delete"
            icon={DeleteIcon}
            handleClick={async () => await handleDelete(label, doc_id, enqueueSnackbar, refetch, expert_id)}
          />
        }
        <AttachmentIcons
          isIcon={true}
          title="View"
          icon={Visibility}
          handleClick={() => window.open(url, "_blank")}
        />
      </div>
    </div>
  );
}

const handleDownload = async (fileUrl: string) => {
  try {
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    console.log(fileUrl);
    link.download = fileUrl.split("/").pop() || "download-file";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};