import './../login/Login.css';
import React from 'react'
import logo from '../../images/logo1.svg'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Paper } from '@material-ui/core'
import { logout, selectUser } from '../../features/userSlice';

export default function Logout() {
    const user = useSelector(selectUser)

    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout())
    }
// this is only for testing purpose
    return (<>
        <Grid>
            <Grid align='center' className="headingLoginPages">
                <img className="svgLogo" src={logo} alt="logo" />
                <h1 className="mainHeading">MrLaju</h1>
                <h3 className="loginHeading">Welcome {user.name}</h3>
            </Grid>
            <Paper elevation={10} className="formContainer">
                <Button onClick={(e) => handleLogout(e)}>Logout</Button>
            </Paper>
        </Grid>
    </>
    )
}
