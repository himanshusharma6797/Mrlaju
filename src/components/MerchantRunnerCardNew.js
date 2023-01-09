import React from 'react'
import { Box } from '@material-ui/core';
import { Typography } from '@mui/material';
import './OperatorRunnerCard.css'
import call from './../images/callWhatsappIcons/call.svg'
import whatsapp from './../images/callWhatsappIcons/whatsapp.svg'

export default function OperatorRunnerCardNew({ approveRunner, rejectRunner, name, email, resident, phoneNumber, id }) {
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

                <div className='doubleInputBoxInLine'>

                    <div className='displayFlexColumnOneOR'>
                        <button
                            onClick={() => approveRunner(id)}
                            className="loginInputHalfWidth buttonHalf approveBtnGreen fontSize12px">
                            Approve
                        </button>
                    </div>

                    <div className='displayFlexColumnTwoOR'>
                        <button
                            onClick={() => rejectRunner(id)}
                            className="loginInputHalfWidth buttonHalf rejectButton fontSize12px">
                            Remove
                        </button>
                    </div>

                </div>
            </Box >
        </>
    )
}
