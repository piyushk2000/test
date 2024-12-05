import React from 'react';

type PdfViewerProps = {
    pdfUrl: string;
};

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
    return (
        <iframe
            src={pdfUrl}
            style={{ 
                width: '100%', 
                height: '100%', 
                border: 'none',
                overflow: 'hidden'  // Try to hide any overflow if necessary
            }}
            title="PDF Viewer"
            scrolling="no"  // Disable scrolling to avoid unnecessary scrollbars
        />
    );
};

export default PdfViewer;
