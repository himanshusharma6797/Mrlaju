import React from 'react'
import { Box, Button } from '@material-ui/core';
import { Typography } from '@mui/material';
import './OperatorRunnerCard.css'
import call from './../images/callWhatsappIcons/call.svg'
import whatsapp from './../images/callWhatsappIcons/whatsapp.svg'
import { authAxios } from '../services/auth.service';

export default function OperatorRunnerCardExisting(props) {

    const changeStatusOfRunner = async (runnerId, status) => {
        try {
            const { data } = await authAxios.put(`runner/updateStatus/${runnerId}?status=${status}`)
            console.log(data)
            props.setToggle(pre => !pre)
        } catch (error) {
            console.log("Error : " + error)
        }
    }


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
                    minHeight: '11.875rem',
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
                        >Name: {props.name}</Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: '#09D033',
                                border: '1px solid #09D033',
                                borderRadius: '15px',
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                fontWeight: '400',
                                fontSize: '10px',
                                color: '#FFFFFF',
                                width: '71px'
                            }}>{props.status}</Box>
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
                    >Email: {props.email}</Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            fontSize: '13px',
                            lineHeight: '20px',
                            color: '#505050',
                        }}
                    >Residence: {props.unitAddress}</Typography>
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
                        >Phone: {props.phoneNumber}</Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '4rem',
                            }}>
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
                        </Box>
                    </Box>
                </Box>
                <div className='doubleInputBoxInLine'>

                    <div className='displayFlexColumnOneOR'>
                        <button className="loginInputHalfWidth buttonHalf approveButton fontSize12px">
                            Merchant Selection
                        </button>
                    </div>

                    <div className='displayFlexColumnTwoOR'>
                        <button className="loginInputHalfWidth buttonHalf approveButton fontSize12px">
                            Bank Details
                        </button>
                    </div>

                </div>
                <Button
                    onClick={() => changeStatusOfRunner(props.id, "REJECTED")}
                    className="removeBtnOperatorRunner fontSize12px" variant="contained">Remove</Button>
            </Box>
        </>
    )
}
