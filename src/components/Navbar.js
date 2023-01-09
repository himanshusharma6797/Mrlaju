import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import FinanceAdmin from './../images/navIcons/Finance Admin.svg'
import GroupAdmin from './../images/navIcons/Group Admin.svg'
import Logout from './../images/navIcons/Logout.svg'
import MerchantRegistration from './../images/navIcons/Merchant Registration.svg'
import MerchantRunner from './../images/navIcons/Merchant Runner.svg'
import Merchant from './../images/navIcons/Merchant.svg'
import MrLajuAdmin from './../images/navIcons/Mr Laju Admin.svg'
import OperatorAdmin from './../images/navIcons/Operator Admin.svg'
import OperatorRegistration from './../images/navIcons/Operator Registration.svg'
import Profile from './../images/navIcons/Profile.svg'
import RunnerRegistration from './../images/navIcons/Runner Registration.svg'
import TermsOfUse from './../images/navIcons/Terms of Use.svg'
import User from './../images/navIcons/User.svg'
import CloseIcon from '@mui/icons-material/Close';
import './Navbar.css'
import Logo from './../images/logo1.svg'
import signing from './../images/navIcons/signing.svg'
// import { useDispatch, useSelector } from 'react-redux';
// import { logout, selectUser } from './../features/userSlice';
import { logout } from '../Redux/actions/auth';
import { useDispatch } from "react-redux";



const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'spaceBetween',
    paddingTop: '2rem',
    paddingLeft: '.6rem',
    paddingBottom: '1rem',
    paddingRight: '1rem',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    width: '17rem',
}));

const navbarButtonData = [
    {
        heading: 'Operator Registration',
        path: '/operator-registration/new-account',
        iconName: OperatorRegistration
    },
    {
        heading: 'Merchant Registration',
        path: '/merchant-registration',
        iconName: MerchantRegistration
    },
    {
        heading: 'Runner Registration',
        path: '/runner-registration',
        iconName: RunnerRegistration
    },
    {
        heading: 'Grand Admin',
        path: '/admin/grand-admin',
        iconName: GroupAdmin
    },
    {
        heading: 'Finance Admin',
        path: '/admin/finance-admin',
        iconName: FinanceAdmin
    },
    {
        heading: 'Mr Laju Admin',
        path: '/admin/mr-laju-admin',
        iconName: MrLajuAdmin
    },
    {
        heading: 'Operator Admin',
        path: '/admin/operator',
        iconName: OperatorAdmin
    },
    {
        heading: 'Merchant',
        path: '/merchant',
        iconName: Merchant
    },
    {
        heading: 'Merchant Runner',
        path: '/merchant-runner',
        iconName: MerchantRunner
    },
    {
        heading: 'User',
        path: '/user',
        iconName: User
    },
    {
        heading: 'Terms of Use',
        path: '/terms-of-use',
        iconName: TermsOfUse
    },
    {
        heading: 'Profile',
        path: '/profile',
        iconName: Profile
    },
    {
        heading: 'Logout',
        path: '/',
        iconName: Logout
    },
]


export default function Navbar({ title, backButtonPath }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, setLoginIcon] = useState(false)

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const navigateToAnyWhere = (path) => {
        navigate(`${path}`);
    };

    const handleLogout = () => {
        dispatch(logout());
        window.location.reload();
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setLoginIcon(true)
        }
    },[])

    // const user = useSelector(selectUser)

    // const dispatch = useDispatch();
    // const handleLogout = (e) => {
    //     e.preventDefault();
    //     dispatch(logout())
    // }

    return (
        <>
            <Toolbar className='appBar'>
                <ArrowBackIosSharpIcon className='backButtonArrow' onClick={() => navigateToAnyWhere(backButtonPath)} />
                <h2 className='headingOfPageContent'>{title}</h2>
                {login
                ?
                    <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    onClick={handleDrawerOpen}
                    sx={{ ...(open && { display: 'none' }) }}
                    >
                    {title=='Error 404'?null:<MenuIcon className='navIcon' />}
                </IconButton>
                :
                <img src={signing} style={{cursor:'pointer'}} alt="" onClick={()=>navigate(`/login`)}/>
                }
            </Toolbar>
            <Drawer
                variant="persistent"
                anchor="center"
                // ["bottom","left","right","top"] only these are valid
                open={open}
            >
                <DrawerHeader className='logoCloseIconContainer'>
                    <div className='divContainerLogoAndMenu'>
                        <img className="svgLogoNavbar" src={Logo} alt="" onClick={()=>navigate(`/`)}/>
                        <h2 className='navHeading'>Menu</h2>
                    </div>
                    <IconButton onClick={handleDrawerClose} className='closeNavbarIcon'>
                        <CloseIcon className='closeNavbarIconCross' />
                    </IconButton>
                </DrawerHeader>
                <List className='navbarList'>
                    {navbarButtonData.map((ele) => (
                        (ele.heading === 'Logout')
                            ?
                            <button className='navItemButton' key={ele.heading} onClick={(e) => handleLogout(e)} >
                                <img src={ele.iconName} alt="" className='navItemIcon' />
                                {ele.heading}
                            </button>
                            :
                            <NavLink className={"navItemButton"} key={ele.heading} style={({ isActive }) => { return { backgroundColor: isActive ? "#EAECFF" : "#FFFFF" } }} to={ele.path}><img src={ele.iconName} alt="" className='navItemIcon' />{ele.heading}</NavLink>
                    ))}
                </List>
            </Drawer>
        </>
    );
}
