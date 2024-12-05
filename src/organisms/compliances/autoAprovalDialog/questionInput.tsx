import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { QuestionProps } from './types';

const QuestionComponentCompliance: React.FC<QuestionProps> = ({ type, value, handleChange, minLength, maxLength, minValue, maxValue,
    multiline,
    rows,placeholder }) => {
    const [error, setError] = React.useState<string>('');

    useEffect(() => {
        let errorMessage = '';

        if (typeof value === 'string') {
            if (minLength !== undefined && value.length < minLength) {
              errorMessage = `Minimum length allowed is ${minLength}. `;
            } else if (maxLength !== undefined && value.length > maxLength) {
              errorMessage = `Maximum length allowed is ${maxLength}. `;
            }
          }

        const numericValue = Number(value);
        if (!isNaN(numericValue)) {
            if (minValue !== undefined && numericValue < minValue) {
                errorMessage += `Minimum value allowed is ${minValue}. `;
            } else if (maxValue !== undefined && numericValue > maxValue) {
                errorMessage += `Maximum value allowed is ${maxValue}. `;
            }
        }

        setError(errorMessage.trim());
    }, [value, minLength, maxLength, minValue, maxValue]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setValue(event.target.value);
        handleChange(event);
    };

    return (
        <div>
            <TextField sx={{marginTop:'0.5rem',fontSize:'12px'}}
                placeholder={placeholder}
                type={type}
                variant="outlined"
                value={value}
                onChange={handleInputChange}
                error={!!error}
                helperText={error}
                fullWidth
                size="small"
                multiline={multiline}
                rows={3}
            />
        </div>
    );
};

export default QuestionComponentCompliance;