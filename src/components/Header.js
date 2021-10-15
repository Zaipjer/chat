import React from 'react';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Button, IconButton, Switch } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

// Redux
import { darkModeAction, isopenMenuAction } from '../actions/menuAction';
import { setUserAction } from '../actions/userAction';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Header = () => {

    // Utilizar useDispatch y te crea una función
    const dispatch = useDispatch();

    // Obtener el state
    const isopen = useSelector((state) => state.menu.isopen);
    const darkMode = useSelector((state) => state.menu.darkMode);
    const user = useSelector((state) => state.user.user);

    const toggleMenu = () => {
        dispatch(isopenMenuAction(!isopen));
    }

    const handleAuth = () => {
        if (user) {
            signOut(auth).then(() => {
                dispatch(setUserAction(null));
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    return (
        <div className="header">
            <div className="header__left">
                <IconButton style={{ color: "white" }} onClick={toggleMenu}>
                    <MenuIcon />
                </IconButton>
                <img
                    src="https://lh3.googleusercontent.com/vfrhg7RiAagkYgQh3-8FE6bcxjss5SdGc1tFmuwgGFrDzK_zxNXA3qWtWvC8Bpi_Gw=w300"
                    alt="logo" />
            </div>
            <div className="header__right">
                <Avatar src={user?.photoURL} alt="Usuario" />
                <Switch checked={darkMode} onChange={() => dispatch(darkModeAction(!darkMode))}/>
                {user &&
                    <Button variant="contained" onClick={handleAuth} sx={{ fontSize: '1rem', textTransform: 'none' }}>
                        Cerrar sesión
                    </Button>
                }
            </div>
        </div>
    );
}

export default Header;