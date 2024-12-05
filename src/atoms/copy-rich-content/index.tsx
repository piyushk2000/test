import React, { useRef } from 'react';
import CustomBtnFilled from '../form-molecules/CustomBtnFilled';
import { useSnackbar } from 'notistack';
import { handleCopy } from '../../molecules/expert-profile-sections/profile-section/helper';
import { copyHtml } from '../../utils/copyHtml';

interface CopyRichTextBtnProps {
    content: string;
    btnText?: string;
}

const CopyRichTextBtn: React.FC<CopyRichTextBtnProps> = ({ content, btnText }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const {enqueueSnackbar} = useSnackbar();

    const handleCopyText = async () => {
        if (contentRef.current) {
            const text = Array.from(contentRef.current.childNodes)
                .map((node: Node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const element = node as HTMLElement;
                        if (element.tagName === 'P' || element.tagName === 'A') {
                            return element.textContent;
                        }
                    }
                    return '';
                })
                .join('\n')
                .trim();

                await copyHtml(contentRef,enqueueSnackbar)
        }
    };

    return (
        <div>
            <div style={{ display: "none" }} ref={contentRef} dangerouslySetInnerHTML={{ __html: content }} />
            <CustomBtnFilled
                variant="outlined"
                label={btnText || "Copy Text"}
                onClick={handleCopyText}
            />
        </div>
    );
};

export default CopyRichTextBtn;