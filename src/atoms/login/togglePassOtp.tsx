import Typography from '@mui/material/Typography'
import { orStyles, loginSecondBtnStyles } from '../../organisms/login/style'
import CustomBtnFilled from '../form-molecules/CustomBtnFilled'

type Props = {
    label: string;
    onClick: () => void;
}

const TogglePassOtp = ({ label, onClick }: Props) => {
    return (
        <>
            <Typography sx={orStyles}>OR</Typography>
            <CustomBtnFilled
                label={label}
                variant='contained'
                onClick={onClick}
                styles={{ ...loginSecondBtnStyles, textTransform: "initial" }}
            />
        </>
    )
}

export default TogglePassOtp