import React, {useState} from "react";
import {Box, Button, IconButton, Popover} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateFileModal from "../create-file-modal/createFileModal";
import CreateFolderModal from "../create-folder-modal/createFolderModal";

const DrawerPopOver = () => {
    const [newFileModalOpen, setNewFileModalOpen] = useState(false);
    const [newFolderModalOpen, setNewFoldereModalOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <div>
            <IconButton onClick={handleClick}>
                <AddCircleOutlineIcon/>
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
                    <Button variant={"outlined"} onClick={() => setNewFileModalOpen(true)}>New File</Button>
                    <Button variant={"outlined"} onClick={() => setNewFoldereModalOpen(true)}>New Folder</Button>
                </Box>
            </Popover>
            <CreateFileModal open={newFileModalOpen} setOpen={setNewFileModalOpen}/>
            <CreateFolderModal open={newFolderModalOpen} setOpen={setNewFoldereModalOpen}/>
        </div>
    );

}

export default DrawerPopOver