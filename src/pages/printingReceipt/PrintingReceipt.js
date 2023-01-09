import { Box, Button, Paper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import './PrintingReciept.css'


export default function PrintingReciept() {
    const [counter, setCounter] = useState(0);
    const navigate = useNavigate();

    let { condo } = useParams();
    const paper = {
        padding: '1.25rem',
        minHeight: '100vh',
    }
    let textStyle = {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '13px',
        lineHeight: '20px',
        color: '#505050'
    }
    let textStyleBold = {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '13px',
        lineHeight: '20px',
        color: '#505050',
    }

    return (
        <>
            <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>
                <Navbar title={'Printing'} backButtonPath={`/merchant/merchant-app/${condo}/runner-details`} />
                <Box sx={{
                    minHeight: '86vh',
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'

                }}>
                    <Box>

                        <Typography style={textStyle}>How many receipt to print per order?</Typography>
                        <Box
                            sx={{
                                background: '#FFFFFF',
                                border: '1px solid #D1D1D1',
                                borderRadius: '8px',
                                p: .5,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mt:1
                            }}>

                            <button className="plusBtn" onClick={() => {
                                setCounter(counter + 1)
                            }}>+</button>

                            <Typography style={textStyleBold}>{counter}</Typography>
                            <button className="minusBtn" onClick={() => {
                                if (counter > 0) {
                                    setCounter(counter - 1)
                                }
                            }}>-</button>
                        </Box>

                    </Box>
                    <Button className="viewOnMap" variant="contained" onClick={() => navigate(`/merchant/merchant-app/${condo}/store-setup`)}>Next</Button>
                </Box>
            </Paper>
        </>
    )
}
