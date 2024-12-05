import { Grid } from "@mui/material";
import FormCancelSubmitBtns from "../../../../atoms/formCancelSubmitBtns";
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext";
import { useEffect } from "react";
import { RequiredTextField } from "../../../../molecules/input-components/RequiredTextField";
import { HookRichTextField } from "../../../../atoms/rich-text-editor/HookRichTextEditor";
import { HookRadioButton } from "../../../../atoms/form-fields/SLFieldRadioButton";
import { complianceStateOptions } from "../helper";

type Props = {
    handleClose(): void;
    isEdit: boolean;
    setChange(): void;
}

export default function Fields({ handleClose, isEdit, setChange }: Props) {
    const { watch, registerState } = useHookFormContext();

    useEffect(() => {
        let subscription = watch((value, { name, type }) => {
            if (type === "change") {
                setChange();
            }
        });

        return () => subscription.unsubscribe();
        //eslint-disable-next-line
    }, [watch]);

    return (
        <Grid container spacing={2} mt={"10px"}>
            <Grid item xs={12}>
                <RequiredTextField
                    id="title"
                    label="Title"
                />
            </Grid>
            <Grid item xs={12}>
                <RequiredTextField
                    id="description"
                    label="Description"
                />
            </Grid>
            <Grid item xs={12}>
                <RequiredTextField
                    id="questions"
                    label="Questions"
                    multiline
                    minRows={4}
                    maxRows={15}
                    max={10000000}
                />
            </Grid>

            {isEdit &&
                <Grid item xs={12}>
                    <HookRadioButton
                        {...registerState("state")}
                        label="Compliance State"
                        radioGroupProps={{
                            sx: {
                                "& .MuiTypography-root": {
                                    marginLeft: "-5px !important",
                                },
                            },
                        }}
                        fields={complianceStateOptions}
                    />
                </Grid>
            }

            {/* SUBMIT & CANCEL FORM */}
            <FormCancelSubmitBtns
                handleClose={handleClose}
            />
        </Grid>
    )
}