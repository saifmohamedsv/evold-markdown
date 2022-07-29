import React, {useEffect} from 'react';
import ReactMarkdown from "react-markdown";
import {Alert, Box, Button, Snackbar, TextField, Typography} from "@mui/material";
import {FileDetails__Container, Left__Input, Markdown__Container, Markdown__SaveBtn, Right__Input} from "./style";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {updateFileContent} from "../../store/actions/handleFiles";

const Markdown = () => {
    const {fid} = useParams()
    const currentFile = useSelector(state => state.files.find(f => f.fid === fid))
    const dispatch = useDispatch()
    const [value, setValue] = React.useState(currentFile?.content);

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

    const onSaveChanges = (values, fileID) => {
        dispatch(updateFileContent(values, fileID))
        handleSnackOpen()
    }

    useEffect(() => {
        setValue(currentFile?.content)
    }, [dispatch, fid, currentFile?.content])

    return (
        <Box>
            <Box>
                <Box sx={FileDetails__Container}>
                    <Typography variant={"h5"}>{currentFile?.name}</Typography>
                </Box>
                {/*  options will lie here  */}
            </Box>
            <Box sx={FileDetails__Container}>
                <Typography variant={"h5"}>Tags</Typography>
            </Box>
            <Box sx={Markdown__Container}>
                <Box sx={Left__Input}>
                    <TextField sx={{width: "100%", height: "calc(100vh - 244px)"}} minRows={28} multiline value={value}
                               onChange={(e) => setValue(e.target.value)}/>
                </Box>
                <Box sx={Right__Input}>
                    <ReactMarkdown>
                        {value}
                    </ReactMarkdown>
                </Box>
                <Button onClick={() => onSaveChanges(value, currentFile.fid)} sx={Markdown__SaveBtn}
                        variant={"contained"}>
                    Save Changes
                </Button>
                <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity="success" sx={{width: '100%'}}>
                        Your File has been saved successfully!
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default Markdown;