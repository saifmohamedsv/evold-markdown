import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Alert, Box, Button, IconButton, Popover, Snackbar, Typography} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import formatDate from "../../utils/formatDate";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {deleteFile} from "../../store/actions/handleFiles";
import {addFileToFolder} from "../../store/actions/handleFolders";

const RenderFiles = () => {
    const files = useSelector(state => state.files)

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const dispatch = useDispatch()

    const router = useNavigate()


    const handleFileNav = (file) => {
        router(`mdfile/${file.fid}`)
    }


    return (
        <>
            {files?.map(file => (
                <Box key={file.fid} display={"flex"} alignItems={"center"} justifyContent={"space-between"}
                     sx={{cursor: "pointer"}}
                >
                    <Box onClick={() => handleFileNav(file)} display={"flex"} alignItems={"center"} key={file.fid}>
                        <InsertDriveFileIcon sx={{fontSize: "48px", mr: 1, margin: "12px 0"}}/>
                        <Box>
                            <Typography variant={"body1"}>{file.name}</Typography>
                            <Typography variant={"body2"} sx={{opacity: "0.6"}}>{formatDate(file.date)}</Typography>
                        </Box>
                    </Box>

                    <IconButton onClick={handleClick}>
                        <MoreVertIcon/>
                    </IconButton>

                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Box sx={{display: "flex", flexDirection: "column", gap: "12px", p: 1}}>
                            <Button variant={"outlined"} onClick={() => dispatch(deleteFile(file))}>Delete
                                File</Button>
                            <FoldersOnHover fid={file.fid}/>
                        </Box>

                    </Popover>
                </Box>
            ))}
        </>
    )
}


const FoldersOnHover = ({fid}) => {
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [snackOpen, setSnackOpen] = React.useState(false);

    const handleSnackOpen = () => {
        setSnackOpen(true);
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOpen(false)
    };

    const handlePopoverOpen = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl2(null);
    };


    const folders = useSelector(state => state.folders)

    const dispatch = useDispatch()

    const onChooseFolder = (gid) => {
        dispatch(addFileToFolder(gid, fid))
        handleSnackOpen()
    }

    const open = Boolean(anchorEl2);

    return (
        <div>
            <Button
                variant={"outlined"}
                onMouseEnter={handlePopoverOpen}
            >
                Add To Folder
            </Button>
            <Popover
                id="mouse-over-popover"
                open={open}
                anchorEl={anchorEl2}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Box sx={{width: "100%"}} display={"flex"} flexDirection={"column"} gap={2}>
                    {folders?.map(folder => (
                        <Box key={folder.gid} sx={{p: 1, borderBottom: "1px solid gray"}}>
                            <Button variant={"contained"}
                                    onClick={() => onChooseFolder(folder.gid)}>{folder.name}</Button>
                            <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                                <Alert onClose={handleSnackClose} severity="success" sx={{width: '100%'}}>
                                    Your file has been added to {folder.name} successfully
                                </Alert>
                            </Snackbar>
                        </Box>
                    ))}
                </Box>
            </Popover>
        </div>
    );
}


export default RenderFiles