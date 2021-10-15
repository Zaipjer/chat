import { Button } from '@mui/material';
import React from 'react';
import './Login.css';
import { auth, provider } from '../firebase';
import { signInWithPopup } from "firebase/auth";

// Redux
import { useDispatch } from 'react-redux';
import { setUserAction} from '../actions/userAction';

const Login = () => {

    const dispath = useDispatch();

    const signin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                //console.log(result);
                dispath(setUserAction(result.user));
            }).catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="login">
            <h1>Welcome to our Chat App !</h1>
            <Button variant="contained" color="primary" onClick={signin}>
                Sign in with Google
            </Button>
        </div>
    );
}

export default Login;