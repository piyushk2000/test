import { Backdrop, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useFullPageLoading } from './loadingContext';
     
const MyBackdrop = styled(Backdrop)({   
  color: '#ff9800',
  zIndex: 100000
})

const FullPageLoading = () => {
    const { isLoading } = useFullPageLoading()
  return (
    <MyBackdrop open={isLoading}>
      <CircularProgress color="inherit" />
    </MyBackdrop>
  );
};

export default FullPageLoading;
