import React, { useEffect, useState } from 'react';
import { Box, Button, DialogContent, Typography } from '@mui/material';
import DialogModal from '../dialog';
import PdfViewer from '../pdf-viewer/pdf';

type MultiPdfViewerProps = {
  pdfUrls: { url: string; filename: string }[];
  handleClose: () => void;
};

const MultiPdfViewer: React.FC<MultiPdfViewerProps> = ({ pdfUrls, handleClose }) => {
  const [currentPdfIndex, setCurrentPdfIndex] = useState(0);
  const pdfCount = pdfUrls.length;

  useEffect(() => {
    if (pdfCount === 0) {
      handleClose();
    }
  }, [pdfCount, handleClose]);

  const cyclePdfIndex = (step: number) => {
    setCurrentPdfIndex((prevIndex) => {
      const newIndex = prevIndex + step;
      if (newIndex < 0) return pdfCount - 1;
      if (newIndex >= pdfCount) return 0;
      return newIndex;
    });
  };

  const handleNext = () => cyclePdfIndex(1);
  const handlePrevious = () => cyclePdfIndex(-1);

  if (pdfCount === 0) return null;

  const currentPdf = pdfUrls[currentPdfIndex];

  return (
    <DialogModal 
      isOpen={true} 
      dialogSx={{ height: '100%' }} 
      handleClose={handleClose} 
      title={currentPdf?.filename || 'PDF Viewer'}
      TitleEl={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button onClick={handlePrevious} disabled={pdfCount <= 1}>Previous</Button>
          <Typography variant="body1" sx={{ color: 'black' }}>
            Receipt {currentPdfIndex + 1} of {pdfCount}
          </Typography>
          <Button onClick={handleNext} disabled={pdfCount <= 1}>Next</Button>
        </Box>
      }
    >
      <DialogContent>
        <Box sx={{ height: '80vh' }}>
          {currentPdf && <PdfViewer pdfUrl={currentPdf.url} />}
        </Box>
      </DialogContent>
    </DialogModal>
  );
};

export default MultiPdfViewer;