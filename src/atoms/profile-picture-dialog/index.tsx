import Grid from '@mui/material/Grid';
import DialogModal from '../dialog'
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { isClient, isInfollion } from '../../utils/role';

type Props = {
    isOpen: boolean;
    handleClose(): void;
    image: string | null;
    openEditDialog(): void;
    openDeleteDialog(): void;
}

const ProfilePictureDialog = ({ isOpen, handleClose, image, openEditDialog, openDeleteDialog }: Props) => {
    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title="Profile photo"
            contentSx={{
                backgroundColor: "#1B1F23",
                color: "#ffffff"
            }}
            titleSx={{
                backgroundColor: "#1B1F23",
                color: "#ffffff",
                "& p": {
                    fontWeight: "600 !important"
                }
            }}
        >
            <Grid container>
                <Grid item sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "5rem",
                }} xs={12}>
                    {image ? <img src={image} alt='profile' /> : <p>No Image to Show</p>}
                </Grid>
                {!isClient() && !isInfollion() &&
                    <Grid item xs={12} sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                        <Button variant="outlined"
                            onClick={openEditDialog}
                            startIcon={<EditIcon />}
                            sx={{
                                borderColor: "white",
                                color: "white",
                                textTransform: "capitalize",
                                "&:hover": {
                                    borderColor: "white"
                                }
                            }}
                        >
                            {image ? "Edit" : "Add"}
                        </Button>
                        {image &&
                            <Button variant="text"
                                onClick={openDeleteDialog}
                                startIcon={<DeleteOutlinedIcon />}
                                sx={{
                                    borderColor: "white",
                                    color: "white",
                                    textTransform: "capitalize",
                                    "&:hover": {
                                        borderColor: "white"
                                    }
                                }}
                            >
                                Delete
                            </Button>
                        }
                    </Grid>
                }
            </Grid>
        </DialogModal>
    )
}

export default ProfilePictureDialog