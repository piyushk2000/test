import Grid from "@mui/material/Grid";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { inputRowCommonStyles } from "../../../common/formStyles";
import FormCancelSubmitBtns from "../../../atoms/formCancelSubmitBtns";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import { FileUpload } from "../../../molecules/input-components/FileUpload";
import { DateOptions, SetExcelFile } from "../types";
import { acceptedExcelFileTypes } from "../helper";
import { BoxFlex } from "../../../atoms/boxSpaceBtw";

type Props = {
    handleClose(): void;
    setFile: SetExcelFile;
    dateOptions: DateOptions;
}

const ExchangeRateFields = ({ handleClose, setFile, dateOptions }: Props) => {
    const { registerState } = useHookFormContext();


    return (
        <Grid container spacing={3} mt={"5px"}>
            <Grid item xs={6} sx={inputRowCommonStyles}>
                <HookAutoComplete
                    {...registerState("date")}
                    textFieldProps={{ label: "Date", size: "small" }}
                    rules={{
                        required: { value: true, message: "This field is required" },
                    }}
                    autocompleteProps={{
                        multiple: false,
                        freeSolo: false,
                        options: dateOptions || [],
                        size: "small",
                        style: { backgroundColor: "white" },
                    }}
                />
            </Grid>
            <Grid item xs={12} sx={inputRowCommonStyles}>
                <FileUpload fileAcceptedTypes={acceptedExcelFileTypes} getFile={(file) => setFile(file)} errorFileAcceptedMsg="Accepted formats: .xlsx, .xls, .ods, .csv, .xlsm, .xlsb" dropzoneConfig={{
                    text:
                        <BoxFlex sx={{ flexDirection: "column", gap: "1rem", alignItems: "flex-start", "& p": { fontSize: "16px", fontWeight: "500" } }}>
                            <p>Drag and drop an .xlsx file here or click to select one.</p>
                            <BoxFlex sx={{ flexDirection: "column", alignItems: "flex-start" }}>
                                <p>Ensure the file has 2 columns:</p>
                                <p>1. currency</p>
                                <p>2. buy_rate</p>
                            </BoxFlex>
                            <p>The buy_rate should be up to 2 decimal places, and currency values must be unique.</p>
                        </BoxFlex>
                }} />
            </Grid>


            {/* ACTION BUTTONS */}
            <FormCancelSubmitBtns
                handleClose={handleClose}
            />

        </Grid>
    );
};

export default ExchangeRateFields;
