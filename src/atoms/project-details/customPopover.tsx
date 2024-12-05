import React, { useRef, useState, useEffect } from 'react';
import Info from "../../assets/images/info.png";
import { Box, Popover, CircularProgress, Typography, Avatar, Chip, Divider, ClickAwayListener } from "@mui/material";
import { styled } from '@mui/material/styles';
import { RequestServer } from "../../utils/services";
import { APIRoutes } from '../../constants';

interface CustomPopoverProps {
  expert_id: number;
  relevant_division: string | null | undefined;
  relevant_designation: string | null | undefined;
  relevant_company: string | null | undefined;
}

const PopoverContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 350,
  backgroundColor: 'rgb(0,0,0,0.7)',
  color: 'white',
  borderRadius: theme.shape.borderRadius,
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(1),
  fontSize: '10px'
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  minWidth: 140,
  display: 'flex',
  justifyContent: 'space-between',
  marginRight: theme.spacing(1),
}));

const InfoValue = styled(Typography)(({ theme }) => ({
  flex: 1,
}));

const calculateTotalExperience = (workExperiences: any[]): number | 'NA' => {
  if (!workExperiences || workExperiences.length === 0) return 'NA';

  const total = workExperiences.reduce((total: number, exp: { start_date: string | number | Date; end_date: string | number | Date; }) => {
    const startDate = new Date(exp.start_date);
    const endDate = exp?.end_date ? new Date(exp?.end_date) : new Date();
    const years = endDate.getFullYear() - startDate.getFullYear();
    return total + (years + (endDate.getMonth() - startDate.getMonth()) / 12);
  }, 0);

  return Number(total.toFixed(1));
};

const getWorkExp = (work_experiences: any, meta: any) => {
  const current_company = work_experiences?.find((exp: any) => exp.currently_works_here) || meta?.current_company || null;
  const current_company_name = current_company?.company || current_company?.name || 'N/A';
  const current_company_designation = current_company?.designation || 'N/A';

  return `${current_company_name}, ${current_company_designation}`;
};

const CustomPopover: React.FC<CustomPopoverProps> = ({ expert_id, relevant_division, relevant_designation, relevant_company }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [popoverContent, setPopoverContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const iconRef = useRef<HTMLImageElement>(null);

  const handleInfoClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(iconRef.current);
    setIsLoading(true);
    setError(null);

    const url = `${APIRoutes.getExpert}?id=${expert_id}&embed=YES&stakeholders=YES`;
    try {
      const response = await RequestServer(url, "get");
      setPopoverContent(response.data[0]);
    } catch (error) {
      console.error("Error fetching expert data:", error);
      setError("Error loading expert information");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInfoClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    const handleScroll = () => {
      if (open && iconRef.current) {
        setAnchorEl(null);
        setTimeout(() => setAnchorEl(iconRef.current), 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [open]);

  const renderContent = () => {
    if (isLoading) {
      return <CircularProgress size={24} />;
    }

    if (error) {
      return <Typography color="error">{error}</Typography>;
    }

    if (!popoverContent) {
      return <Typography>No data available</Typography>;
    }

    let relevantCompanyDetails;
    if (relevant_company || relevant_designation || relevant_division) {
      relevantCompanyDetails = [
        relevant_company,
        relevant_designation,
        relevant_division
      ].filter(Boolean).join(', ');
    } else if (popoverContent.meta?.relevant_company) {
      relevantCompanyDetails = `${popoverContent.meta.relevant_company.name}, ${popoverContent.meta.relevant_company.designation}`;
    } else {
      relevantCompanyDetails = 'N/A';
    }

    return (
      <>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            src={popoverContent.picture}
            alt={popoverContent.name}
            sx={{ width: 60, height: 60, marginRight: 2 }}
          />
          <Box>
            <Typography variant="h6">{popoverContent.name}</Typography>
            <Typography variant="body2">
              {popoverContent?.base_location_value?.name || 'N/A'}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2, backgroundColor: 'rgba(255,255,255,0.2)' }} />
      <InfoItem>
        <InfoLabel variant="body2">
          Relevant Company<span>:</span>
        </InfoLabel>
        <InfoValue variant="body2">{relevantCompanyDetails}</InfoValue>
      </InfoItem>
      <Divider sx={{ my: 1, backgroundColor: 'rgba(255,255,255,0.2)' }} />
      <InfoItem>
        <InfoLabel variant="body2">
          Current Work<span>:</span>
        </InfoLabel>
        <InfoValue variant="body2">
          {getWorkExp(popoverContent?.work_experiences, popoverContent?.meta)}
        </InfoValue>
      </InfoItem>
      <Divider sx={{ my: 1, backgroundColor: 'rgba(255,255,255,0.2)' }} />
      <InfoItem>
        <InfoLabel variant="body2">
          Function<span>:</span>
        </InfoLabel>
        <InfoValue variant="body2">
          {popoverContent?.functions || 'N/A'}
        </InfoValue>
      </InfoItem>
      <Divider sx={{ my: 1, backgroundColor: 'rgba(255,255,255,0.2)' }} />
      <InfoItem>
        <InfoLabel variant="body2">
          Total Experience<span>:</span>
        </InfoLabel>
        <InfoValue variant="body2">
          {typeof calculateTotalExperience(popoverContent?.work_experiences) === 'number'
            ? `${calculateTotalExperience(popoverContent?.work_experiences)} years`
            : 'NA'}
        </InfoValue>
      </InfoItem>
    </>
    );
  };

  return (
    <ClickAwayListener onClickAway={handleInfoClose}>
      <Box>
        <img
          ref={iconRef}
          src={Info}
          alt="Info"
          onClick={handleInfoClick}
          style={{ height: '15px', width: '15px', cursor: 'pointer' }}
        />
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleInfoClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            style: {
              pointerEvents: 'auto',
            },
          }}
          sx={{
            pointerEvents: 'none',
          }}
          disableScrollLock={true}
          disableRestoreFocus
        >
          <PopoverContent onClick={(e) => e.stopPropagation()}>
            {renderContent()}
          </PopoverContent>
        </Popover>
      </Box>
    </ClickAwayListener>
  );
};

export default CustomPopover;