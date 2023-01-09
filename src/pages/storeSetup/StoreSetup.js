import { Box, Button, Paper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar'

const week = [
    'Noodle', 'Rice', 'Alaca', 'Drinks', 'Western', 'Pizza', 'Daal', 'Chawal'
]

export default function StoreSetup() {
    const [counter, setCounter] = useState(0);
    const navigate = useNavigate();

    let { condo } = useParams();
    const paper = {
        padding: '1.25rem',
        minHeight: '100vh',
    }
    let textStyleBold = {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '13px',
        lineHeight: '20px',
        color: '#505050'
    }
    const removeTiming = (arr, ele) => {
        const index = arr.indexOf(ele);
        if (index > -1) {
            return arr.splice(index, 1);
        }
    }
    const addTiming = (arr) => {
        arr.push('Dish')
    }
    return (
        <>
            <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>
                <Navbar title={`Store Setup`} backButtonPath={`/merchant/merchant-app/${condo}/print-receipt`} />
                <Box sx={{
                    minHeight: '86vh',
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'

                }}>
                    <Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>

                            <Typography style={textStyleBold}>Category</Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    background: '#FFFFFF',
                                    border: '1px solid #656565',
                                    borderRadius: '50%',
                                    color: '#505050',
                                    fontSize: '15px',
                                    width: '16px',
                                    height: '16px',
                                    m: 0,
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    console.log(counter)
                                    setCounter(counter + 1)
                                    addTiming(week)
                                }}
                            >+</Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            pt: 1,
                            flexWrap: 'wrap'
                        }}>
                            {week.map((eleTwo, ind) => {
                                return <Box key={ind}>
                                    <Box
                                        sx={{
                                            background: '#FFFFFF',
                                            border: '1px solid #656565',
                                            borderRadius: '5px',
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            fontWeight: '400',
                                            fontSize: '11px',
                                            lineHeight: '16px',
                                            color: '#505050',
                                            width: '5.625rem',
                                            height: '1.625rem',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            ml: 0.5,
                                            mr: 0.5
                                        }}>{eleTwo}</Box>
                                    <Box
                                        sx={{
                                            transform: 'rotate(-45deg)',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            background: '#FFFFFF',
                                            border: '1px solid #656565',
                                            borderRadius: '50%',
                                            color: '#505050',
                                            fontSize: '11px',
                                            width: '13px',
                                            height: '13px',
                                            m: 0,
                                            position: 'relative',
                                            top: '-33px',
                                            right: '-81px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                            console.log(eleTwo)
                                            console.log(week)
                                            console.log(counter)
                                            setCounter(counter + 1)
                                            removeTiming(week, eleTwo)
                                        }}
                                    >+</Box>
                                </Box>
                            })}
                        </Box>
                    </Box>
                    <Button className="viewOnMap" variant="contained" onClick={() => navigate(`/merchant/merchant-app/${condo}/products`)}>Next</Button>
                </Box>
            </Paper>
        </>
    )
}
