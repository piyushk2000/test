import Grid from "@mui/material/Grid";
import { inputRow } from "../style";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { CheckboxOptions } from "../helper";

const DomainFields = ({ domains }: any) => {
    const { registerState } = useHookFormContext();
    return (
        <>
            {/* Domains */}
            <Grid item xs={12} md={6} sx={inputRow}>
                <HookAutoComplete
                    {...registerState("domains")}
                    textFieldProps={{
                        label: "Domains",
                        size: "small",
                    }}
                    autocompleteProps={{
                        isOptionEqualToValue: (option: any, value: any) =>
                            option?.value === value?.value,
                        multiple: true,
                        options: domains || [],
                        noOptionsText: "Loading...",
                        size: "small",
                        style: { background: "white" },
                        disableCloseOnSelect: true,
                        renderOption: CheckboxOptions,
                        filterOptions: (options, { inputValue }) => {
                            const inputValueLowercased: string = inputValue.toLowerCase();
                            return options.filter((option: any) =>
                                option?.label.toLowerCase().includes(inputValueLowercased)
                            );
                        },
                    }}
                />
            </Grid>

            {/* Other Domains */}
            <Grid item xs={12} md={6} sx={inputRow}>
                <HookAutoComplete
                    {...registerState("other_domains")}
                    textFieldProps={{ label: "Other Domains", size: "small" }}
                    autocompleteProps={{
                        multiple: true,
                        freeSolo: true,
                        options: [],
                        size: "small",
                        style: { backgroundColor: "white" },
                    }}
                />
            </Grid>
        </>
    );
};

export default DomainFields;
