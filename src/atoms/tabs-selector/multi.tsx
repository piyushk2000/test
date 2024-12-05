import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from "@mui/material/styles";
import React from "react";
import styles from "./style.module.scss";

interface StyledTabProps {
    label: string;
    value: string;
    onClick: (e: any) => void;
    className?: string;
}

const MyToggleButton = styled((props: StyledTabProps) => (<ToggleButton {...props}>{props.label}</ToggleButton>))(({ theme }) => ({
    border: "none",
    textTransform: "capitalize",
    fontFamily: "inherit",

}))

type Props = {
    setFormats: (s: Array<string>) => void;
    options: { label: string, value: string, bg?: string, color?: string }[];
    formats: Array<string>;
    bg?: string;
};

export default function MultiTabFilters({ formats, setFormats, options, bg }: Props) {


    const handleFormat = (
        event: React.MouseEvent<HTMLElement>,
        newFormats: string[],
    ) => {
        setFormats(newFormats);
    };

    const buttonStyle = (bg: string | undefined, color: string | undefined) => ({
        position: "relative",
        "&.Mui-selected": {
            color: "#EC9324",
            backgroundColor: "#F5F4F4 !important"
        },
        "&::after": {
            content: `""`,
            display: "flex",
            width: "80%",
            height: "2px",
            backgroundColor: "#EC9324",
            position: "absolute",
            bottom: "0",
            left: "10%",
            transformOrigin: "bottom left",
            transform: "scaleX(1)",
            transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        }
    })

    return (
        <ToggleButtonGroup
            value={formats}
            onChange={handleFormat}
            aria-label="Multi Tab Filters"
            sx={{
                display: "flex",
                flexWrap: "wrap",
                // gap: "1rem"
            }}
        >
            {options.map((option) => (
                <MyToggleButton
                    className={formats.includes(option.value) ? "" : styles["button-with-line-toggle"]}
                    value={option.value}
                    label={option.label}
                    key={option.value}
                    onClick={() => console.log("Clicked")}
                    sx={buttonStyle(option.bg, option.color)}
                />
            ))}
        </ToggleButtonGroup>
    );
}

