import React, { useState } from 'react';
import { Typography, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

const ExpandableFieldValue = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: theme.palette.text.secondary,
  cursor: 'pointer',
}));

interface ExpandableFieldProps {
    value: string;
    characterLimit?: number;
  }
  

const ExpandableField: React.FC<ExpandableFieldProps> = ({ value, characterLimit = 40 }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const truncatedValue = value.length > characterLimit 
    ? `${value.slice(0, characterLimit)}...` 
    : value;

  return (
    <Tooltip title={expanded || value.length <= characterLimit ? '' : 'Click to expand'} arrow>
      <ExpandableFieldValue onClick={toggleExpand}>
        {expanded ? value : truncatedValue}
      </ExpandableFieldValue>
    </Tooltip>
  );
};

export default ExpandableField;