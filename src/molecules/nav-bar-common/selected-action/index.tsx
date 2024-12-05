import Button from "@mui/material/Button";
import { selectedBtnWrapper, selectedButtonStyle, selectedOverlayStyle } from "../style";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

type props = {
    selectedAction: {
        title: string;
        label: React.ReactNode;
        onClick(): void;
    }
}

const SelectedAction = ({ selectedAction }: props) => {
    const [isTutorial, setTutorial] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setTutorial(false);
        }, 1000)
    }, []);

    return (
        <>
            {isTutorial ?
                <>
                    <Box sx={selectedBtnWrapper}>
                        <SelectedActionBtn selectedAction={selectedAction} isTutorial={isTutorial} />
                    </Box>

                    {/* Overlay */}
                    <Box
                        onClick={() => setTutorial(false)}
                        sx={selectedOverlayStyle}>
                    </Box>
                </> :
                <SelectedActionBtn selectedAction={selectedAction} isTutorial={isTutorial} />
            }

        </>

    )
}

function SelectedActionBtn({ selectedAction, isTutorial }: props & { isTutorial: boolean }) {
    return (
        <Button
            onClick={selectedAction.onClick}
            sx={selectedButtonStyle(isTutorial)}
        >
            {selectedAction.label}

        </Button>
    )
}

export default SelectedAction