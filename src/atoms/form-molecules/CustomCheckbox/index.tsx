
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import classes from './Checkbox.module.scss';

type InputProps={
    label:string;
    required?:boolean;
    defaultChecked?:boolean;
}

export default function customCheckbox({ label,required=false,defaultChecked=false }:InputProps) {
    return (
        <FormControlLabel control={<Checkbox defaultChecked={defaultChecked} />} required={required} label={label} />
    )
}