import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {Box, Button, IconButton, Popover, Typography} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import {styled} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import formatDate from "../../utils/formatDate";
import {deleteFolder} from "../../store/actions/handleFolders";


const RenderFolders = () => {
    const files = useSelector(state => state.files)
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

    const handleDeleteFolder = (gid) => {
        dispatch(deleteFolder(gid))
        router('/')
    }


    return folders?.map(folder => (
        <Box key={folder.gid} display={"flex"} alignItems={"center"} justifyContent={"space-between"}
             sx={{cursor: "pointer"}}

        >
            <FolderAccordion files={files} folder={folder}/>
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
                    <Button onClick={() => handleDeleteFolder(folder.gid)} variant={"outlined"}>Delete Folder</Button>
                </Box>
            </Popover>
        </Box>
    ))
}




const FolderAccordion = ({folder, files}) => {
    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const router = useNavigate()

    const handleFileNav = (file) => {
        router(`mdfile/${file.fid}`)
    }

    const ourFiles = files?.filter((f, i) => f.fid === folder.files[i])

    return (
        <div>
            <Accordion expanded={expanded === folder?.name} onChange={handleChange(folder?.name)}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Box display={"flex"} alignItems={"center"}>
                        <FolderIcon sx={{fontSize: "48px", margin: "12px 6px 12px 0"}}/>
                        <Box>
                            <Typography variant={"body1"}>{folder.name}</Typography>
                            <Typography variant={"body2"} sx={{opacity: "0.6"}}>{folder.files.length} files</Typography>
                        </Box>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    {ourFiles?.map((file, index) => (
                        <Box key={index} display={"flex"} alignItems={"center"} justifyContent={"space-between"}
                             sx={{cursor: "pointer"}}

                        >
                            <Box onClick={() => handleFileNav(file)} display={"flex"} alignItems={"center"}
                                 key={file.fid}>
                                <InsertDriveFileIcon sx={{fontSize: "48px", mr: 1, margin: "12px 0"}}/>
                                <Box>
                                    <Typography variant={"body1"}>{file.name}</Typography>
                                    <Typography variant={"body2"}
                                                sx={{opacity: "0.6"}}>{formatDate(file.date)}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem'}}/>}
        {...props}
    />
))(({theme}) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default RenderFolders