import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const RadioButton = (props: any) => {
  return (
    <>
      <FormControl>
        <FormLabel className="personal-info-email">{props.name}</FormLabel>
        <RadioGroup defaultValue={props.defaultValue}>
          {props.data.map((obj: any) => {
            return (
              <>
                <div className="radio-btn">
                  <div>
                    <FormControlLabel
                      value={obj.value}
                      control={
                        <Radio
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 13,
                              color: "orange",
                            },
                          }}
                        />
                      }
                      label={<span id="label">{obj.label}</span>}
                    />
                  </div>
                  <div>
                    {obj.isHome && <span>(Home)</span>}
                    {obj.isOffice && <span>(Office)</span>}
                    {obj.isPrimary && <span id="primary">Primary</span>}
                  </div>
                </div>
              </>
            );
          })}
        </RadioGroup>
      </FormControl>
    </>
  );
};
export default RadioButton;
