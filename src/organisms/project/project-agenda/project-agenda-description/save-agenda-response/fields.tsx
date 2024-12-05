import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { inputRow } from "../styles";
import { HookRadioButton } from "../../../../../atoms/form-fields/SLFieldRadioButton";
import { useHookFormContext } from "../../../../../utils/hooks/useHookFormContext";
import { shareAgendaResponseAns } from "../../helper";
import { HookTextField } from "../../../../../atoms/form-fields/SLFieldTextField";
import { commonInputStyles } from "../styles";
import { memo } from "react";
import { BoxFlex } from "../../../../../atoms/boxSpaceBtw";

type Props = {
  question: string;
  index: number;
  isLast?: boolean;
};

const Fields = ({ question, index, isLast }: Props) => {
  const { registerState } = useHookFormContext();

  return (
    <Grid container>
      {/* Question */}
      <Grid item xs={12} sx={inputRow}>
        <BoxFlex sx={{alignItems: "flex-start", gap: "1rem"}}>
          <Typography
            fontSize={"12px"}
            fontWeight={600}
            sx={{
              color: "#484C57",
              opacity: "0.75",
              "& span": { color: "#252B3B", opacity: "0.85" },
            }}
            style={{ whiteSpace: "pre-wrap" }}
          >
            <span>Q{index + 1}.</span>
          </Typography>
          <Typography
            fontSize={"12px"}
            fontWeight={600}
            sx={{
              color: "#484C57",
              opacity: "0.75",
              "& span": { color: "#252B3B", opacity: "0.85" },
            }}
            style={{ whiteSpace: "pre-wrap" }}
          >
            {question}
          </Typography>
        </BoxFlex>
      </Grid>

      {/* Answer */}
      <Grid item xs={12} sx={inputRow}>
        <HookRadioButton
          {...registerState("answer-" + index)}
          defaultValue={null}
          radioGroupProps={{
            sx: {
              "& .MuiTypography-root": {
                marginLeft: "-5px !important",
              },
              "& span": {
                fontSize: "12px",
              },
            },
          }}
          fields={shareAgendaResponseAns}
          rules={{
            required: {
              value: true,
              message: "Please answer this question",
            },
          }}
        />
      </Grid>

      {/* Expert Notes */}
      <Grid item xs={12} sx={{ ...inputRow, paddingRight: "15px" }}>
        <HookTextField
          {...registerState("expert_note-" + index)}
          textFieldProps={{
            ...commonInputStyles,
            label: "Notes",
            multiline: true,
            fontSize: "12px"
          }}
        />
      </Grid>
      {!isLast ? (
        <Grid xs={12} item>
          <hr style={{ opacity: "0.75", margin: "10px 0" }} />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default memo(Fields);
