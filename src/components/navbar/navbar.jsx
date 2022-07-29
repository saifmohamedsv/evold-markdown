import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from "react-redux";
import {changeTheme} from "../../store/actions/changeTheme";
import {toggleSideMenu} from "../../store/actions/toggleSideMenu";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const darkMode = useSelector(state => state.main.darkMode)
    const dispatch = useDispatch()
    const router = useNavigate()

    const toggleTheme = () => dispatch(changeTheme())
    const toggleDrawer = () => dispatch(toggleSideMenu())
    const navToHome = () => router('/')

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1, cursor: "pointer"}} onClick={navToHome}>
                        Markdown editor
                    </Typography>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={toggleTheme}
                    >
                        {darkMode ? <LightModeIcon/> : <DarkModeIcon/>}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;