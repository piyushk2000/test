import Box from "@mui/material/Box";
import {
  contactCardContainer,
  contactCardContent,
  contactCardQuestionContent,
} from "./style";
import Chip from "@mui/material/Chip";
import EditIcon from '@mui/icons-material/Edit';
import { complianceData } from "../../../organisms/compliances/allCompliances/types";
import { LocalDayjs } from "../../../utils/timezoneService";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { NumberQuestion } from "../../../organisms/compliances/autoAprovalDialog/types";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
import { BoxFlex } from "../../../atoms/boxSpaceBtw";

type Props = {
  data?: complianceData;
  openReviewDialog: (questions: NumberQuestion[]) => void;
  openEditDialog: (data: complianceData) => void;
};

const ComplianceCard = ({ data, openReviewDialog, openEditDialog }: Props) => {

  return (
    <Box sx={contactCardContainer}>
      <Box sx={{ padding: '4px 15px', background: '#f9f1e7', fontWeight: '500' }}>
        <h2>{data?.title}</h2>
      </Box>
      <Box sx={contactCardContent}>
        <Box sx={contactCardQuestionContent}>
          <h6>No of Questions: {data?.questions.length}</h6> {data?.state == 'Active' && <Chip sx={{ background: '#e3f3ef' }} label={'Active'} />}{data?.state != 'Active' && <Chip sx={{ background: '#e3f3ef' }} label={'Inactive'} />}
        </Box>
        <Box sx={contactCardQuestionContent}>
          <h6>Created At: {LocalDayjs(data?.created_at || undefined).format('DD MMMM, YYYY ')}</h6>
        </Box>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <BoxFlex>
            <Tooltip title="Edit" arrow>
              <IconButton onClick={() => data && openEditDialog(data)}>
                <EditIcon sx={{ width: "20px" }} />
              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Auto Approve Depedency" arrow>
              <IconButton>
                <ShareIcon style={{ width: '15px' }} />
              </IconButton>
            </Tooltip> */}
          </BoxFlex>

          <CustomBtnFilled
            styles={{ justifySelf: "flex-end" }}
            label="Review"
            variant="outlined"
            onClick={() => {
              openReviewDialog(data?.questions || [])
            }}
          />
        </div>
      </Box>
    </Box>
  );
};


export default ComplianceCard;
