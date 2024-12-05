import { multipleFieldContainerStyle } from "../styles";
import { Box, Typography } from "@mui/material";
import RichTextDisplayer from "../../../atoms/rich-text-editor/RichTextDisplayer";
import EditRemoveButtons from "../common/EditRemoveButtons";

interface SnippetDetail {
  heading: string;
  description: string;
  id: string;
}

type Props = {
  snippetDetail: SnippetDetail;
  removeSnippet: () => void;
  editSnippet: () => void;
};

const DisplaySnippet = ({
  snippetDetail,
  removeSnippet,
  editSnippet,
}: Props) => {
  return (
    <Box sx={{ ...multipleFieldContainerStyle, padding: "1rem" }}>
      <Typography
        sx={{ fontSize: "16px", fontWeight: "500", color: "#252B3B" }}
      >
        {snippetDetail.heading}
      </Typography>

      <RichTextDisplayer text={snippetDetail.description}/>
      <EditRemoveButtons handleRemove={removeSnippet} handleEdit={editSnippet}      
      />
    </Box>
  );
};

export default DisplaySnippet;
