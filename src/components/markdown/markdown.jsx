import React, {useEffect} from 'react';
import ReactMarkdown from "react-markdown";
import {Alert, Box, Button, Snackbar, TextField, Typography} from "@mui/material";
import {
    FileDetails__Container,
    FileOptions__Container,
    FileOptions__Icon,
    FileTags__Container,
    Left__Input,
    Markdown__Container,
    Markdown__SaveBtn,
    Right__Input
} from "./style";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {deleteFile, updateFileContent} from "../../store/actions/handleFiles";
import IconButton from "@mui/material/IconButton";

const Markdown = () => {
    const {fid} = useParams()
    const currentFile = useSelector(state => state.files.find(f => f.fid === fid))
    const dispatch = useDispatch()
    const router = useNavigate()
    const [value, setValue] = React.useState(currentFile?.content);

    const [snackOpen, setSnackOpen] = React.useState(false);
    const [markdownView, setMarkDownView] = React.useState(true);

    const handleSnackOpen = () => {
        setSnackOpen(true);
    };


    const handleMarkDown = () => {
        setMarkDownView(prev => !prev);
    };

    const handleFileDelete = () => {
        dispatch(deleteFile(currentFile))
        router('/')

    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOpen(false)
    };

    const onSaveChanges = (values, fileID) => {
        dispatch(updateFileContent(values, fileID))
        handleSnackOpen()
    }

    useEffect(() => {
        setValue(currentFile?.content)
    }, [dispatch, fid, currentFile?.content])

    return (
        <Box>

            {/* FILE NAME + OPTIONS */}
            <Box display={"flex"} flexDirection={{md: "row", xs: "column"}}
                 alignItems={{md: "center", xs: "flex-start"}}
                 sx={{mb: 2, gap: "12px"}}
            >
                <Box sx={FileDetails__Container}>
                    <Typography variant={"h5"}>{currentFile?.name}</Typography>
                </Box>
                <Box sx={FileOptions__Container}>

                    {/* DELETE FILE */}
                    <IconButton onClick={handleFileDelete}>
                        <DeleteIcon sx={FileOptions__Icon}/>
                    </IconButton>

                    {/* TOGGLE VIEW */}
                    <IconButton onClick={handleMarkDown}>
                        {markdownView ? <VisibilityOffIcon sx={FileOptions__Icon}/> :
                            <VisibilityIcon sx={FileOptions__Icon}/>}
                    </IconButton>

                    <IconButton>
                        <CreateNewFolderIcon sx={FileOptions__Icon}/>
                    </IconButton>
                </Box>
            </Box>

            {/* TAGS */}
            <Box sx={FileTags__Container}>
                <Typography variant={"h5"}>Tags</Typography>
            </Box>

            {/* MARKDOWN INPUT + VIEW */}
            <Box sx={Markdown__Container}>
                <Box sx={Left__Input}>
                    <TextField sx={{width: "100%", height: "calc(100vh - 244px)"}} minRows={28} multiline value={value}
                               onChange={(e) => setValue(e.target.value)}/>
                </Box>

                {markdownView && (
                    <Box sx={Right__Input}>
                        <ReactMarkdown>
                            {value}
                        </ReactMarkdown>
                    </Box>
                )}

                <Button onClick={() => onSaveChanges(value, currentFile.fid)} sx={Markdown__SaveBtn}
                        variant={"contained"}>
                    Save Changes
                </Button>
                <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity="success" sx={{width: '100%'}}>
                        Your file has been saved successfully!
                    </Alert>
                </Snackbar>
            </Box>

        </Box>
    );
};

export default Markdown;