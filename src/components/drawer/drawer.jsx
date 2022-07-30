import React from 'react';

import {useDispatch, useSelector} from "react-redux";
import {toggleSideMenu} from "../../store/actions/toggleSideMenu";

import InputHandler from "../input-handler/inputHandler";
import {Form, Formik} from "formik";

import {Box, Divider, Drawer, IconButton, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import {Drawer__SearchContainer} from "./style";
import RenderFolders from "../renderFoldersList/renderFolders";
import RenderFiles from "../renderFilesList/renderFiles";
import DrawerPopOver from "../drawer-popover/drawerPopover";

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 0),
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