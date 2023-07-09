import React from 'react';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, SCOPES, AUTHORIZE_URL, SPACE_DELIMITER } from '../../auth'

const Login = () => {
    const handleLogin = () => {
        window.location = AUTHORIZE_URL + '?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&redirect_uri=' + REDIRECT_URI + '&scope=' + SCOPES + '&response_type=token&show_dialog=true';
    }

    return (
        <div className='login'>
            <h1>Login with Spotify</h1>
            <button onClick={() => handleLogin()}>Login</button>
        </div>
    );
}

export default Login;