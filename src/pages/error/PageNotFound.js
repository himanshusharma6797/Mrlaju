import React from 'react';
import { Card, Typography } from '@mui/material';
import { Box, Paper } from '@material-ui/core';
import Navbar from '../../components/Navbar';


export function PageNotFound() {

    const paper = {
        padding: '1.25rem',
        height: '100vh'
    }

    return (
        <>
            <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>
                <Navbar title={'Error 404'} backButtonPath={'/'} />
                <Box style={{ height: '30vh', display: 'flex', alignItems: 'center', flexFlow: 'column', justifyContent: 'space-around', padding:'2rem' }}>
                    <Typography variant="h2">
                        Page 404
                        </Typography>
                    <Typography variant="lightCallout" style={{textAlign:'center'}}>
                        The request URL was not found on this server.
                    </Typography>
                </Box>
            </Paper>
        </>
    );
}