import * as React from 'react';
import clsx from 'clsx';
import { ButtonProps } from '@mui/base/Button';
import { useButton } from '@mui/base';
import { styled } from '@mui/system';

const CustomButton = React.forwardRef(function CustomButton(
  props: ButtonProps,
  ref: React.ForwardedRef<any>,
) {
  const { children, disabled } = props;
  const { active, focusVisible, getRootProps } = useButton({
    ...props,
    rootRef: ref,
  });

  const classes = {
    active,
    disabled,
    focusVisible,
  };

  return (
    <CustomButtonRoot {...getRootProps()} className={clsx(classes)}>
      {children}
    </CustomButtonRoot>
  );
});

export default CustomButton

const blue = {
  500: '#252B3B',
  600: 'white',
  700: 'white',
};

const CustomButtonRoot = styled('button')`
  font-size: 0.875rem;
  line-height: 1.1875rem;
  background-color: white;
  color: ${blue[500]};
  font-weight: 400;
  padding: 8px 24px;
  cursor: pointer;
  transition: all 150ms ease;
  border: 1px solid #252B3B;
  border-radius: 77px;
  &:hover {
    background-color: ${blue[600]};
  }

  &.active {
    background-color: ${blue[700]};
  }

  &.focusVisible {
    box-shadow: 0 4px 20px 0 rgb(61 71 82 / 0.1), 0 0 0 5px rgb(0 127 255 / 0.5);
    outline: none;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;