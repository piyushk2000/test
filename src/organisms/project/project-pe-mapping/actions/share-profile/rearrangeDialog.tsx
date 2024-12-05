import { Grid } from "@mui/material";
import DialogModal from "../../../../../atoms/dialog";
import FormCancelSubmitBtns from "../../../../../atoms/formCancelSubmitBtns";
import DragDropList from "../../../../../molecules/drag-and-drop-list";
import { usePeMappingContext } from "../../helper";
import { SharedProfiles } from "../../type";
import { BoxFlex } from "../../../../../atoms/boxSpaceBtw";
import { useState } from "react";
import { ExpertBadge } from "../../../../../atoms/profile-cardV1/ProfileCardV1";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    expertCards: SharedProfiles[];
}

export function ReArrangeExpertsDialog({ isOpen, handleClose, expertCards }: Props) {
    const { setPeDialog } = usePeMappingContext();
    const [list, setList] = useState<SharedProfiles[]>(expertCards);

    const handleSubmit = () => {
        // opening Expert details to page - copy to clipboard
        setPeDialog((prev) => ({
            ...prev,
            actions: {
                ...prev.actions,
                shareProfileExperts: {
                    ...prev.actions.shareProfileExperts,
                    email_format: true,
                    experts: list,
                    isChange: false,
                    reaarange_expert: false
                }
            }
        }))
    }

    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title="ReArrange Experts"
        >
            <Grid container>
                <Grid item xs={12}>
                    <DragDropList<SharedProfiles>
                        lists={expertCards}
                        ListComponent={(details) =>
                            <li>
                                <BoxFlex sx={{gap: "0.5rem"}}>
                                    <p style={{ fontSize: "16px", fontWeight: "600" }}>{details.expert_name}</p>
                                    {details.badge && (
                                        <ExpertBadge img_style={{ width: "18px", borderRadius: "100%", cursor: "pointer" }} badge={details.badge} />
                                    )}
                                    - {[details.company, details.designation].filter(d => !!d).join(",")}
                                </BoxFlex>
                            </li>}
                        updatedList={(list) => setList(list)}
                        keyExtractor={(item) => item.pe_id as number}
                        listItemSx={{ "& p": { fontWeight: "500" } }}
                        listContainerSx={{ width: '100%'}}
                    />
                </Grid>

                <FormCancelSubmitBtns
                    handleClose={handleClose}
                    handleSubmitBtnClick={handleSubmit}
                    submitLabel="Next"
                />
            </Grid>

        </DialogModal>
    )
}
