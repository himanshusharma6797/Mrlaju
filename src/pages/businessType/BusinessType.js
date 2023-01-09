import React, { useState } from 'react'
import { Box, Button, ButtonGroup, Paper, Typography } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import InfoIcon from '../../images/infoIcon/infoIcon1.svg';
import './BusinessType.css';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function BusinessType() {

    const [businessType, setBusinessType] = useState('food');
    const [store, setStore] = useState(true);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();

    let { condo } = useParams();
    const paper = {
        padding: '1.25rem',
        minHeight: '100vh'
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
        color: '#505050'
    }
    let textStylePopup = {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: '18px',
        color: '#202020',
        textAlign: 'center',
        marginBottom: '.5rem'
    }
    let headingStylePopup = {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '16px',
        lineHeight: '21px',
        color: '#202020',
        textAlign: 'center'
    }
    let topHeadingStylePopup = {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '20px',
        lineHeight: '21px',
        color: '#202020',
        textAlign: 'center',
    }
    let closeBtnPopup = {
        width: '117px',
        height: '32px',
        background: '#35498E',
        border: '1px solid #35498E',
        borderRadius: '15px',
        color: '#FFFFFF',
        textTransform: 'capitalize'
    }
    return (
        <>
            <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>
                <Navbar title={condo} backButtonPath={'/merchant/merchant-app'} />
                {store
                    ?
                    <div className='displayFlexJCSBetween'>
                        <div>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Typography>Business Type</Typography>
                                <div className="containerInfoIconCondo" onClick={handleClickOpen}>
                                    <img src={InfoIcon} alt='Info Icon' className="infoIcon" />
                                </div>
                            </Box>
                            <ButtonGroup className='buttongroupBT' aria-label="outlined button group">
                                <Button className={businessType=='food'?'foodBtn':'shopBtn'} onClick={()=>{
                                    setBusinessType('food')
                                }}>Food</Button>
                                <Button className={businessType=='shop'?'foodBtn':'shopBtn'} onClick={()=>{
                                    setBusinessType('shop')
                                }}>Shop</Button>
                            </ButtonGroup>

                        </div>
                        <Button className="viewOnMap" variant="contained" onClick={() => setStore(false)}>Next</Button>
                    </div>
                    :
                    <div className='displayFlexJCSBetween'>
                        <div>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    border: '1px solid #D1D1D1',
                                    borderRadius: '18px',
                                    p: 2,
                                    mb: 2
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}>
                                    <Typography style={textStyle}>ABC Condo Overriding</Typography>
                                    <Typography style={textStyle}>{`15%`}</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}>
                                    <Typography style={textStyle}>Merchant Partial Delivery Fee</Typography>
                                    <Typography style={textStyle}>{`10%`}</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}>
                                    <Typography style={textStyleBold}>Total</Typography>
                                    <Typography style={textStyleBold}>{`25%`}</Typography>
                                </Box>
                                <Box>
                                    <Typography style={textStyleBold}>Delivery by ABC Condo runners</Typography>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    border: '1px solid #D1D1D1',
                                    borderRadius: '18px',
                                    p: 1
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}>
                                    <Typography style={textStyle}>ABC Condo Overriding</Typography>
                                    <Typography style={textStyle}>{`15%`}</Typography>
                                </Box>
                                <Box>
                                    <Typography style={textStyleBold}>Delivery by ABC Condo runners</Typography>
                                </Box>
                            </Box>
                        </div>
                        <Button className="viewOnMap" variant="contained" onClick={() => navigate(`/merchant/merchant-app/${condo}/runner-details`)}>Next</Button>
                    </div>}

                <Dialog
                    PaperProps={{
                        style: { borderRadius: 24 }
                    }}
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                >
                    <DialogTitle style={topHeadingStylePopup}>{"Business Type"}</DialogTitle>
                    <DialogTitle style={headingStylePopup}>{"Food"}</DialogTitle>

                    <DialogContent>

                        <DialogContentText style={textStylePopup}>
                            Choose food if selling food related product to the community.
                        </DialogContentText>

                    </DialogContent>

                    <DialogTitle style={headingStylePopup}>{"Shop"}</DialogTitle>

                    <DialogContent>

                        <DialogContentText style={textStylePopup}>
                            Shop can be other product or services
                            
                            
                            
                            
                        </DialogContentText>
                        <DialogContentText style={textStylePopup}>
                        -Daycare
                        </DialogContentText>
                        <DialogContentText style={textStylePopup}>
                        - Nanny
                        </DialogContentText>
                        <DialogContentText style={textStylePopup}>
                        - Parcel storage
                        </DialogContentText>
                        <DialogContentText style={textStylePopup}>
                        - Hair cut
                        </DialogContentText>

                    </DialogContent>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '2rem',
                        borderRadius: '24px'
                    }}>

                        <Button onClick={handleClose} style={{ ...headingStylePopup, ...closeBtnPopup }}>Close</Button>

                    </Box>

                </Dialog>

            </Paper>
        </>
    )
}
