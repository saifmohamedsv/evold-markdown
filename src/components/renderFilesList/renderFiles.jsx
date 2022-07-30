import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, Typography} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import formatDate from "../../utils/formatDate";
import IconButton from "@mui/material/IconButton";
import {OverlayTrigger, Popover} from "react-bootstrap";
import {addFileToFolder} from "../../store/actions/handleFolders";


const RenderFiles = () => {
    const files = useSelector(state => state.files)
    const folders = useSelector(state => state.folders)


    const onChooseFolder = (gid, fid) => {
        dispatch(addFileToFolder(gid, fid))
    }


    const dispatch = useDispatch()

    const router = useNavigate()


    const handleFileNav = (file) => {
        router(`mdfile/${file.fid}`)
    }




    return (
        <>
            {files?.map((file, index) => (
                <Box key={index} display={"flex"} alignItems={"center"} justifyContent={"space-between"}
                     sx={{cursor: "pointer"}}
                >
                    <Box onClick={() => handleFileNav(file)} display={"flex"} alignItems={"center"} key={file.fid}>
                        <InsertDriveFileIcon sx={{fontSize: "48px", mr: 1, margin: "12px 0"}}/>
                        <Box>
                            <Typography variant={"body1"}>{file.name}</Typography>
                            <Typography variant={"body2"} sx={{opacity: "0.6"}}>{formatDate(file.date)}</Typography>
                        </Box>
                    </Box>

                    {/*<IconButton onClick={handleClick}>*/}
                    {/*    <MoreVertIcon/>*/}
                    {/*</IconButton>*/}
                    <OverlayTrigger trigger="click" placement="right" overlay={
                        <Popover id="popover-basic">
                            <Box sx={{display: "flex", flexDirection: "column", gap: "12px", p: 1}}>
                                <Button variant={"contained"} onClick={() => {
                                    dispatch(deleteFile(file))
                                }}>
                                    Delete
                                    File
                                </Button>

                                <OverlayTrigger trigger="click" placement="right" overlay={
                                    <Box display={"flex"} flexDirection={"column"} gap={2}>
                                        {folders?.map((folder, index) => (
                                            <Box key={index} sx={{p: 1, borderBottom: "1px solid gray"}}>
                                                <Button variant={"contained"}
                                                        onClick={() => onChooseFolder(folder.gid, file.fid)}>{folder.name}</Button>
                                                {/*<Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>*/}
                                                {/*    <Alert onClose={handleSnackClose} severity="success" sx={{width: '100%'}}>*/}
                                                {/*        Your file has been added to {folder.name} successfully*/}
                                                {/*    </Alert>*/}
                                                {/*</Snackbar>*/}
                                            </Box>
                                        ))}
                                    </Box>
                                }>
                                    <Button
                                        variant={"contained"}
                                    >
                                        Add To Folder
                                    </Button>
                                </OverlayTrigger>
                            </Box>
                        </Popover>}
                    >
                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>
                    </OverlayTrigger>

                    {/* HERE IS THE PROB */}
                    {/*<Popover*/}
                    {/*    id={file.fid}*/}
                    {/*    open={open}*/}
                    {/*    anchorEl={anchorEl}*/}
                    {/*    onClose={handleClose}*/}
                    {/*    anchorOrigin={{*/}
                    {/*        vertical: 'bottom',*/}
                    {/*        horizontal: 'left',*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <Box sx={{display: "flex", flexDirection: "column", gap: "12px", p: 1}}>*/}
                    {/*        <Button variant={"outlined"} onClick={() => {*/}
                    {/*            // dispatch(deleteFile(file))*/}
                    {/*            console.log(file)*/}
                    {/*        }}>*/}
                    {/*            Delete*/}
                    {/*            File*/}
                    {/*        </Button>*/}
                    {/*        <Button*/}
                    {/*            variant={"outlined"}*/}
                    {/*            onClick={handlePopoverOpen}*/}
                    {/*        >*/}
                    {/*            Add To Folder*/}
                    {/*        </Button>*/}
                    {/*        /!* CHOOSE A FOLDER *!/*/}

                    {/*        /!*<FoldersOnHover folders={folders} file={file}/>*!/*/}
                    {/*        <Popover*/}
                    {/*            open={ChooseFolderopen}*/}
                    {/*            anchorEl={anchorEl2}*/}
                    {/*            anchorOrigin={{*/}
                    {/*                vertical: 'bottom',*/}
                    {/*                horizontal: 'right',*/}
                    {/*            }}*/}
                    {/*            transformOrigin={{*/}
                    {/*                vertical: 'top',*/}
                    {/*                horizontal: 'left',*/}
                    {/*            }}*/}
                    {/*            onClose={handlePopoverClose}*/}
                    {/*        >*/}
                    {/*            <Box sx={{width: "100%"}} display={"flex"} flexDirection={"column"} gap={2}>*/}
                    {/*                {folders?.map((folder, index) => (*/}
                    {/*                    <Box key={index} sx={{p: 1, borderBottom: "1px solid gray"}}>*/}
                    {/*                        <Button variant={"contained"}*/}
                    {/*                                onClick={() => onChooseFolder(folder, file)}>{folder.name}</Button>*/}
                    {/*                        /!*<Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>*!/*/}
                    {/*                        /!*    <Alert onClose={handleSnackClose} severity="success" sx={{width: '100%'}}>*!/*/}
                    {/*                        /!*        Your file has been added to {folder.name} successfully*!/*/}
                    {/*                        /!*    </Alert>*!/*/}
                    {/*                        /!*</Snackbar>*!/*/}
                    {/*                    </Box>*/}
                    {/*                ))}*/}
                    {/*            </Box>*/}
                    {/*        </Popover>*/}
                    {/*    </Box>*/}
                    {/*</Popover>*/}
                </Box>
            ))}
        </>
    )
}


export default RenderFiles