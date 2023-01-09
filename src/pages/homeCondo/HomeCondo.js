import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Button } from '@material-ui/core';
import './HomeCondo.css'
import food from './../../images/condo/food.svg'
import shop from './../../images/condo/shop.svg'
import runner from './../../images/condo/runner.svg'
import commission from './../../images/condo/commission.svg'
import application from './../../images/condo/application.svg'
import propose from './../../images/condo/propose.svg'
import InfoIcon from '../../images/infoIcon/infoIcon1.svg'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box } from '@mui/system';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function HomeCondo() {

    const [classButton, setClassButton] = useState(true);
    const [open, setOpen] = useState(false);
    let { condo } = useParams();
    const navigate = useNavigate();
    const navigateToAnyWhere = (path) => {
        navigate(`${path}`);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const paper = {
        padding: '1.25rem',
        minHeight: '100vh',
        backGroundColor: '#F5F5F5'
    }
    const availability = () => {
        setClassButton(!classButton);
    }

    let textStyle = {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: '18px',
        color: '#202020',
        textAlign: 'center',
        marginBottom: '.5rem'
    }
    let headingStyle = {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '16px',
        lineHeight: '21px',
        color: '#202020',
        textAlign: 'center'
    }
    let closeBtn = {
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
                <Navbar title={condo} backButtonPath={'/admin/operator'} />

                <div className='displayFlexRow'>
                    <Typography className='deliveryHeading'>
                        Delivery Service Availabilty
                    </Typography>
                    <div className="containerInfoIconCondo" onClick={handleClickOpen}>
                        <img src={InfoIcon} alt='Info Icon' className="infoIcon" />
                    </div>
                </div>

                <ButtonGroup className='doubleButton' sx={{ marginBottom: '1rem' }}>
                    <Button className={classButton ? 'doubleButtonBig' : 'doubleButtonSmall'} onClick={() => availability()}>Online</Button>
                    <Button className={classButton ? 'doubleButtonSmall' : 'doubleButtonBig'} onClick={() => availability()}>Offline</Button>
                </ButtonGroup>


                <Typography className='managePartnersHeading'>
                    Manage Partners
                </Typography>
                <div className='flexManagePartners'>
                    <div className='flexManagePartnersChilds'>
                        <div className='imageManagePartners' onClick={() => navigateToAnyWhere(`/admin/operator/${condo}/shop-and-food`)}>
                            <img src={food} alt="food" />
                        </div>
                        <Typography className='managePartnersSubHeading'>
                            Food
                        </Typography>
                    </div>
                    <div className='flexManagePartnersChilds'>
                        <div className='imageManagePartners' onClick={() => navigateToAnyWhere(`/admin/operator/${condo}/shop-and-food`)}>
                            <img src={shop} alt="shop" />
                        </div>
                        <Typography className='managePartnersSubHeading'>
                            Shops
                        </Typography>
                    </div>
                    <div className='flexManagePartnersChilds'>
                        <div className='imageManagePartners' onClick={() => navigateToAnyWhere(`/admin/operator/${condo}/Runner`)}>
                            <img src={runner} alt="runner" />
                        </div>
                        <Typography className='managePartnersSubHeading'>
                            Runner
                        </Typography>
                    </div>
                    <div className='flexManagePartnersChilds'>
                        <div className='imageManagePartners' onClick={() => navigateToAnyWhere(`/admin/operator/${condo}/Commission`)}>
                            <img src={commission} alt="commission" />
                        </div>
                        <Typography className='managePartnersSubHeading'>
                            Commission
                        </Typography>
                    </div>
                    <div className='flexManagePartnersChilds'>
                        <div className='imageManagePartners' onClick={() => navigateToAnyWhere(`/admin/${condo}/merchant-application`)}>
                            <img src={application} alt="application" />
                        </div>
                        <Typography className='managePartnersSubHeading'>
                            Merchant Application
                        </Typography>
                    </div>
                    <div className='flexManagePartnersChilds'>
                        <div className='imageManagePartners' onClick={() => navigateToAnyWhere(`/admin/operator/${condo}/Propose`)}>
                            <img src={propose} alt="propose" />
                        </div>
                        <Typography className='managePartnersSubHeading'>
                            Propose
                        </Typography>
                    </div>
                </div>
                <Dialog
                    PaperProps={{
                        style: { borderRadius: 24 }
                    }}
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                >
                    <DialogTitle style={headingStyle}>{"Operator"}</DialogTitle>

                    <DialogContent>

                        <DialogContentText style={textStyle}>
                            Sometime there are no runner available
                            within the group, especially during public
                            holidays. Admin can choose to turn service
                            to
                            offline  so group members cannot order
                            any
                            product for delivery to avoid
                            dissappointment...
                        </DialogContentText>

                    </DialogContent>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '2rem',
                        borderRadius: '24px'
                    }}>

                        <Button onClick={handleClose} style={{ ...headingStyle, ...closeBtn }}>Close</Button>

                    </Box>

                </Dialog>
            </Paper>
        </>
    )
}
