import React, {useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {toggleSideMenu} from "../../store/actions/toggleSideMenu";

import {Box, Divider, Drawer, IconButton, TextField, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {useNavigate} from "react-router-dom";

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
    const [term, setTerm] = useState('')
    const dispatch = useDispatch()
    const router = useNavigate()
    const handleDrawerClose = () => {
        dispatch(toggleSideMenu())
    };

    const handleChange = (e) => {
        setTerm(e.target.value)
        router(`?q=${e.target.value}`)

    }

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
                {/*<Formik*/}
                {/*    initialValues={{search: ""}}*/}
                {/*    onSubmit={() => {*/}
                {/*    }}*/}
                {/*>*/}
                {/*    {(formikProps) => (*/}
                {/*        <Form style={{margin: "12px 0"}}>*/}
                {/*            <InputHandler label={"Search a file or folder"} name={"search"}/>*/}
                {/*        </Form>*/}
                {/*    )}*/}
                {/*</Formik>*/}
                <TextField sx={{m: 1}} value={term} onChange={handleChange} label={"Search a file or folder"}/>
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