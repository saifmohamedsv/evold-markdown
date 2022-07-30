import {Box, createTheme, Paper, styled, ThemeProvider} from "@mui/material";
import {useSelector} from "react-redux";
import Navbar from "./components/navbar/navbar";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import SideDrawer from "./components/drawer/drawer";
import Markdown from "./components/markdown/markdown";

const drawerWidth = 300;


const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);


function App() {

    const darkMode = useSelector(state => state.main.darkMode)
    const sideMenuOpened = useSelector(state => state.main.sideMenuOpened)

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const lightTheme = createTheme({});

    const LayOut = () => {
        return (
            <Paper sx={{height: "100vh", borderRadius: "0"}}>
                <Navbar/>
                <Box display={"flex"} sx={{flexGrow: 1}}>
                    <SideDrawer drawerWidth={drawerWidth}/>
                    <Main open={sideMenuOpened}>
                        <Outlet/>
                    </Main>
                </Box>
            </Paper>
        )
    }

    return (
        <BrowserRouter>
            <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                <Routes>
                    <Route path={'/'} element={<LayOut/>}>
                        <Route index element={
                            <h1 style={{margin: "auto", width: "fit-content"}}>
                                Choose a file to show
                                markdowns
                            </h1>}
                        />
                        <Route path="mdfile/:fid" element={<Markdown/>}/>
                    </Route>
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
