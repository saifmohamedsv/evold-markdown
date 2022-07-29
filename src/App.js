import {createTheme, Paper, styled, ThemeProvider} from "@mui/material";
import {useSelector} from "react-redux";
import Navbar from "./components/navbar/navbar";
import Box from "@mui/material/Box";
import SideDrawer from "./components/drawer/drawer";

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

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <Paper sx={{height: "100vh", borderRadius: "0"}}>
                <Navbar/>
                <Box display={"flex"}>
                    <SideDrawer drawerWidth={drawerWidth}/>
                    <Main open={sideMenuOpened}>
                        123
                    </Main>
                </Box>
            </Paper>
        </ThemeProvider>

    );
}

export default App;
