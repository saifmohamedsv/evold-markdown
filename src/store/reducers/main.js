const initState = {
    darkMode: true,
    sideMenuOpened: false,
}

const mainReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CHANGE_THEME':
            return {darkMode: !state.darkMode};
        case 'TOGGLE_DRAWER':
            return {...state, sideMenuOpened: !state.sideMenuOpened};
        default:
            return state;
    }
};

export default mainReducer;
