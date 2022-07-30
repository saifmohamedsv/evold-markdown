import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Box, Button, Typography} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import formatDate from "../../utils/formatDate";
import IconButton from "@mui/material/IconButton";
import {OverlayTrigger, Popover} from "react-bootstrap";
import {deleteFile} from "../../store/actions/handleFiles";
import {addFileToFolder, reFetch} from "../../store/actions/handleFolders";


const RenderFiles = () => {
    const [query, setQ] = useSearchParams()
    const files = useSelector(state => state.files)
    const folders = useSelector(state => state.folders)


    const onChooseFolder = (gid, fid) => {
        dispatch(addFileToFolder(gid, fid))
        dispatch(reFetch())
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

                </Box>
            ))}
        </>
    )
}


export default RenderFiles