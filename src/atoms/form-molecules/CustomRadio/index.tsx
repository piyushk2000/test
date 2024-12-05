
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
// import classes from './Radio.module.scss';

type InputProps={
    label:string;
    required?:boolean;
    defaultChecked?:boolean;
}

export default function customRadio({ label,required=false,defaultChecked=false }:InputProps) {
    return (
        <FormControlLabel className='mr-8' value={label} control={<Radio />} label={label} />
    )
}