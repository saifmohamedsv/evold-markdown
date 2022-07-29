import React from 'react';
import {styled} from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useDispatch, useSelector} from "react-redux";
import {toggleSideMenu} from "../../store/actions/toggleSideMenu";
import Typography from "@mui/material/Typography";
import {Form, Formik} from "formik";
import InputHandler from "../input-handler/inputHandler";
import Box from "@mui/material/Box";
import {Drawer__SearchContainer} from "./style";
import {Button, Popover} from "@mui/material";


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
            </Box>

            <Divider/>

        </Drawer>
    );
};

const DrawerPopOver = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

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
                <Box sx={{display: "flex", flexDirection: "column", gap:"12px",p:1}}>
                    <Button variant={"outlined"}>New File</Button>
                    <Button variant={"outlined"}>New Folder</Button>
                </Box>
            </Popover>
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