import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

import { PEExperts, SetExpertsState, getPEMappedExperts } from './helper';
import CustomBtnFilled from '../../../atoms/form-molecules/CustomBtnFilled';
import BoxSpaceBtw, { BoxFlex } from '../../../atoms/boxSpaceBtw';

type Props = {
    handleSubmit: (e: React.FormEvent) => void;
    handleClose: () => void;
    id: number;
    experts: PEExperts[] | null;
    setExperts: SetExpertsState;
    handleBackBtn: () => void;
}

const PEMapped = ({ handleClose, handleSubmit, id, experts, setExperts, handleBackBtn }: Props) => {

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const expert_id = parseInt(e.target.name);

        setExperts((prev) => {
            if (prev) {
                const expertIndex = prev.findIndex((expert) => expert.fk_expert === expert_id);
                if (expertIndex !== -1) {
                    const updatedExperts = [...prev];
                    updatedExperts[expertIndex] = {
                        ...prev[expertIndex],
                        checked: !prev[expertIndex].checked
                    };
                    return updatedExperts;
                }
            }

            return prev;
        });

    }

    const isAllExpertChecked = experts?.findIndex(expert => expert.checked === false) === -1

    const toggleAllExperts = () => {
        const checked = isAllExpertChecked ? false: true;
        setExperts(
            (prev) => {
                if (prev) {
                    return prev.map((expert) => ({ ...expert, checked: checked }))
                } else {
                    return prev;
                }
            })
    }


    React.useEffect(() => {
        getPEMappedExperts(id, setExperts)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <FormControl component="form" onSubmit={handleSubmit} fullWidth>
            <Grid
                margin={"0 30px 0 30px"}
                padding={"20px 15px 20px 20px"}
                style={{
                    backgroundColor: "#F5F4F4",
                    borderRadius: "10px",
                    marginBottom: "1rem",
                }}
            >
                <BoxSpaceBtw>
                    <Typography
                        fontSize={"16px"}
                        fontWeight={"600"}
                        style={{ opacity: "0.80" }}
                    >
                        PE Mapped
                    </Typography>
                    <BoxFlex>
                        <Typography
                            fontSize={"16px"}
                            fontWeight={"600"}
                            style={{ opacity: "0.80" , cursor: "pointer", userSelect: "none"}}
                            onClick={toggleAllExperts}
                        >
                            Select All
                        </Typography>
                        <Checkbox
                            name={"Select All"}
                            checked={isAllExpertChecked}
                            color="default"
                            sx={{ color: "#EC9324" }}
                            onChange={toggleAllExperts}
                        />
                    </BoxFlex>
                </BoxSpaceBtw>

                <hr style={{ opacity: "0.75", margin: "8px 0 20px 0" }} />
                <Grid container sx={{ maxHeight: "50vh", overflowY: "auto", gap: "0.5em",marginRight: "0.5em" }}>
                    {experts && experts.map((expert) => 
                    <Grid
                        item
                        xs={12}
                        style={{
                            backgroundColor: "white",
                            borderRadius: "19px",
                            height: "38px",
                            display: "flex",
                        }}
                    >
                        <FormControlLabel
                            sx={{
                                display: "flex",
                                flexDirection: "row-reverse",
                                width: "100%",
                                margin: "0 15px",
                                justifyContent: "space-between",
                                "& span": {
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    opacity: "0.85"
                                }

                            }}
                            label={`${expert.expert_name} ( ${expert.state} )`}
                            control={
                                <Checkbox
                                    name={expert.fk_expert.toString()}
                                    checked={expert.checked}
                                    color="default"
                                    sx={{ color: "#EC9324" }}
                                    onChange={handleOnChange}
                                />
                            }
                        />

                    </Grid>)}
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6}>
                    <CustomBtnFilled
                        label="cancel"
                        variant="outlined"
                        onClick={handleClose}
                    />
                </Grid>
                <Grid sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "0.5em"
                }} item xs={6}>
                    <CustomBtnFilled
                        label="Back"
                        variant="outlined"
                        onClick={handleBackBtn}
                    />
                    <CustomBtnFilled
                        label="log"
                        variant="contained"
                        buttonType="submit"
                    />
                </Grid>
            </Grid>
        </FormControl>
    )
}

export default PEMapped