import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'

import {useDispatch, useSelector} from "react-redux";
import {toggleSideMenu} from "../../store/actions/toggleSideMenu";

import InputHandler from "../input-handler/inputHandler";
import {Form, Formik} from "formik";

import {Box, Button, Divider, Drawer, IconButton, Popover, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import {Drawer__SearchContainer} from "./style";
import CreateFileModal from "../create-file-modal/createFileModal";
import formatDate from "../../utils/formatDate";
import {deleteFile} from "../../store/actions/handleFiles";
import CreateFolderModal from "../create-folder-modal/createFolderModal";

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
}));

const SideDrawer = ({drawerWidth}) => {
    const open = useSelector(state => state.main.sideMenuOpened)
    const dispatch = useDispatch()

    const handleDrawerClose = () => {
        dispatch(toggleSideMenu())
    };

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    p: 1,
                }
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHead handleDrawerClose={handleDrawerClose}/>

            <Box sx={Drawer__SearchContainer}>
                <Formik
                    initialValues={{search: ""}}
                    onSubmit={() => {
                    }}
                >
                    {(formikProps) => (
                        <Form style={{margin: "12px 0"}}>
                            <InputHandler label={"Search a file or folder"} name={"search"}/>
                        </Form>
                    )}
                </Formik>
                <DrawerPopOver/>
                <Divider/>
            </Box>
            <RenderFiles/>
            <RenderFolders/>
        </Drawer>
    );
};

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

    return files?.map(file => (
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
                    <Button variant={"outlined"} onClick={() => dispatch(deleteFile(file))}>Delete File</Button>
                </Box>
            </Popover>
        </Box>

    ))
}

// Render a list of folders
const RenderFolders = () => {
    const folders = useSelector(state => state.folders)
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


    return folders?.map(folder => (
        <Box key={folder.gid} display={"flex"} alignItems={"center"} justifyContent={"space-between"}
             sx={{cursor: "pointer"}}

        >
            <Box display={"flex"} alignItems={"center"} key={folder.gid}>
                <FolderIcon sx={{fontSize:"48px", margin: "12px 6px 12px 0"}} />
                <Box>
                    <Typography variant={"body1"}>{folder.name}</Typography>
                    <Typography variant={"body2"} sx={{opacity: "0.6"}}>{folder.files.length} files</Typography>
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
                    <Button variant={"outlined"}>Delete Folder</Button>
                </Box>
            </Popover>
        </Box>

    ))
}


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


const DrawerHead = ({handleDrawerClose}) => {
    return (
        <>
            <DrawerHeader>
                <Typography variant={"h6"}>Markdown Editor</Typography>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronRightIcon/>
                </IconButton>
            </DrawerHeader>
            <Divider/>
        </>
    )
}
export default SideDrawer;