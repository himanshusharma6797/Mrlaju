import React from 'react'
import { Box, Button } from '@material-ui/core';
import { Typography } from '@mui/material';
import './OperatorRunnerCard.css'
import call from './../images/callWhatsappIcons/call.svg'
import whatsapp from './../images/callWhatsappIcons/whatsapp.svg'

export default function OperatorRunnerCardExisting({ rejectRunner, name, email, resident, phoneNumber, id }) {
    return (
        <>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    p: 1,
                    bgcolor: 'background.paper',
                    width: '100%',
                    border: '1px solid #D1D1D1',
                    borderRadius: '18px',
                    minHeight: '9.875rem',
                }}

                className='runnerCardBox'
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '100%',
                        minHeight: '5.2rem',
                        mb: 1
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}>
                        <Typography
                            sx={{
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                fontWeight: '400',
                                fontSize: '13px',
                                lineHeight: '20px',
                                color: '#505050',
                            }}
                        >Name: {name}</Typography>
                    </Box>
                    <Typography
                        sx={{
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            fontSize: '13px',
                            lineHeight: '20px',
                            color: '#505050',
                        }}
                    >Email: {email}</Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            fontSize: '13px',
                            lineHeight: '20px',
                            color: '#505050',
                        }}
                    >Residence: {resident}</Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        height: '2rem',
                    }}>
                        <Typography
                            sx={{
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                fontWeight: '400',
                                fontSize: '13px',
                                lineHeight: '20px',
                                color: '#505050',
                            }}
                        >Phone: {phoneNumber}</Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '4rem',
                            }}>
                            <a href={`tel: ${phoneNumber}`} >
                                <Box
                                    sx={{
                                        background: '#35498E',
                                        width: '27px',
                                        height: '27px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        borderRadius: '50%'
                                    }}
                                    onClick={() => ''}
                                >
                                    <img src={call} alt='call' width={'11px'} />
                                </Box>
                            </a>

                            <a href={`https://api.whatsapp.com/send?phone=${phoneNumber}`} target="_blank" rel="noreferrer"  >
                                <Box
                                    sx={{
                                        background: '#09D033',
                                        width: '27px',
                                        height: '27px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        borderRadius: '50%'
                                    }}
                                    onClick={() => ''}>
                                    <img src={whatsapp} alt='whatsapp' width={'11px'} />
                                </Box>
                            </a>
                        </Box>
                    </Box>
                </Box>

                <Button
                    onClick={e => rejectRunner(id)}
                    className="removeBtnOperatorRunner fontSize12px"
                    variant="contained">
                    Remove
                </Button>
            </Box>
        </>
    )
}
