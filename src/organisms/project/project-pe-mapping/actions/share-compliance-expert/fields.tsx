import { Grid } from "@mui/material";
import { useHookFormContext } from "../../../../../utils/hooks/useHookFormContext";
import FormCancelSubmitBtns from "../../../../../atoms/formCancelSubmitBtns";
import { HookRadioButton } from "../../../../../atoms/form-fields/SLFieldRadioButton";
import { useFetch } from "../../../../../utils/hooks/useFetch";
import { APIRoutes } from "../../../../../constants";
import { CompliancesData, FormattedCompliances } from "./types";
import {  useMemo } from "react";
import AutoApprovalForm from "../../../../compliances/autoAprovalDialog";


type Props = {
    handleClose(): void;
    client_id: number;
}

const Fields = ({ handleClose, client_id }: Props) => {
    const { registerState , watch} = useHookFormContext();
    const complaince = watch("compliance");
    const {data: complianceFull , formattedData: complianceHead} = useFetch<CompliancesData[], FormattedCompliances>(`${APIRoutes.EXPERT_COMPLIANCE}?notin___state=InActive&fk_client=${client_id}`, {
        formatter(data) {
            return data.map((d) => ({
                label: d.title,
                value: d.id.toString()
            }))
        },
    });

    const selected_compliance = useMemo(() => {
        return complianceFull?.find(d => d.id === +complaince) || {questions: []}
    },[complaince]);

    console.log({selected_compliance});

    return (
        <Grid container spacing={2} mt="10px">
            <Grid item xs={9} sx={{maxHeight:'20em',overflowY:'auto'}}>
                {/* Show Questions of the Selected Compliance */}
                {/* {selected_compliance["questions"]} */}
                <AutoApprovalForm questions={selected_compliance["questions"]}/>
            </Grid>
            <Grid item xs={3}>
                <HookRadioButton
                    {...registerState("compliance")}
                    label="Choose a Compliance"
                    radioGroupProps={{
                        sx: {
                            "& .MuiTypography-root": {
                                marginLeft: "-5px !important",
                            },
                        },
                        row: false
                    }}
                    fields={complianceHead || []}
                />
            </Grid>

            <FormCancelSubmitBtns
                handleClose={handleClose}
            />
        </Grid>
    );
};

export default Fields;
