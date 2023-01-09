import React from 'react'
import { Paper, Grid } from '@material-ui/core';
import logo from '../../images/logoSplash2.svg';


export default function SplashTwo() {
    const paper = {
        padding: '1.25rem',
        height: '100vh',
        backGroundColor: '#35498E'
    }
  return (
    <>
            <Paper sx={{ flexGrow: 1 }} align='center' elevation={10} style={paper}>
                <Grid className="GridContainerSplashTwo">
                    <div></div>
                    <img className="svgLogoSplashTwo" src={logo} alt="logo" />
                    <div>
                    <h3 className="loginHeadingSplashTwo">Resident Value</h3>
                    <h3 className="loginHeadingSplashTwo">Meals & Delivery</h3>
                    </div>
                </Grid>
            </Paper>
        </>
  )
}
