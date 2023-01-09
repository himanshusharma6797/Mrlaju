import React from 'react'
import { Grid } from '@material-ui/core';
import logo from '../../images/logo1.svg'


export default function SplashOne() {

    return (
        <>
            <Grid align='center' elevation={10} className="GridContainerSplashOne">
                <img className="svgLogoSplashOne" src={logo} alt="logo" />
                <h1 className="mainHeadingSplashOne">MrLaju</h1>
                <h3 className="loginHeadingSplashOne">Nearby Value Deals</h3>
            </Grid>
        </>
    )
}
