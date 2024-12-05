import Box from '@mui/material/Box';
import { BoxFlex } from '../boxSpaceBtw';

type Props = {
    isSelected: boolean;
    label: string;
}

const FilterSelected = ({ label, isSelected }: Props) => {
    return (
        <BoxFlex sx={{ gap: "0.5rem" }}>
            <p>{label}</p>
            <Box
                sx={{
                    height: "10px",
                    width: "10px",
                    borderRadius: "50px",
                    backgroundColor: isSelected ? "var(--green-color)" : "white"
                }}
            >

            </Box>
        </BoxFlex>

    )
}

export default FilterSelected