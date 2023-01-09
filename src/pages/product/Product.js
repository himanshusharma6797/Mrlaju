import { Box, Button, Paper } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import RedCross from './../../components/RedCross'
import plusBig from './../../images/addIcon/plusBig.svg'

let products = ['Noodle', 'Rice', 'Alaca', 'Drink', 'Western', 'Pizza'];

export default function Product() {
    const [addOns, setAddOns] = useState([
        {
            name: '',
            price: '',
            preparationTime: '',
            img: ''
        }
    ]);

    const handleRemoveItem = (name) => {
        setAddOns(addOns.filter(item => item.name !== name))
    }

    const [navHeading, setNavHeading] = useState('Product');
    const [expanded, setExpanded] = useState(false);
    const [productScreen, setProductScreen] = useState(true);
    const [isActive, setIsActive] = useState(true);

    const navigate = useNavigate();
    let { condo } = useParams();

    // const addon = (name, price, preparationTime, img) => {
    //     this.name = name;
    //     this.price = price;
    //     this.preparationTime = preparationTime;
    //     this.img = img;
    // }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const paper = {
        padding: '1.25rem',
        minHeight: '100vh',
    };
    const produnctText = {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '13px',
        lineHeight: '20px',
        color: '#505050'
    };
    const dataContainer = {
        background: '#FFFFFF',
        border: '1px solid #5F5F5F',
        borderRadius: '15px',
        height: '38px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pl: 1,
        pr: 0.1,
        mb: 1
    };
    const textContainer = {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: '21px',
        color: '#555555'
    }
    const myfunc = (name) => {
        setNavHeading(name);
        setProductScreen(!productScreen);
    }
    const handleClick = event => {
        setIsActive(current => !current);
    };
    const navigateToAnyWhere = (path) => {
        navigate(`${path}`);
    };

    return (
        <>
            <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>

                <Navbar title={navHeading} backButtonPath={`/merchant/merchant-app/${condo}/store-setup`} />

                {
                    productScreen
                        ?
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                minHeight: '87vh'
                            }}
                        >
                            <Box>

                                {products.map((element, index) => {
                                    return <Accordion key={index} expanded={expanded === `panel${index}`} sx={{ outline: 'none' }} onChange={handleChange(`panel${index}`)}>
                                        <AccordionSummary
                                            sx={{ outline: 'none' }}
                                            expandIcon={<Box
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
                                                    if (navHeading === 'Product') {
                                                        myfunc(element);
                                                    } else {
                                                        myfunc('Product');
                                                    }
                                                }}
                                            >+</Box>}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography sx={produnctText}>
                                                {element}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box sx={dataContainer}>
                                                <Typography sx={textContainer}>USA fried {element}</Typography>
                                                <Typography sx={textContainer}>RM10.00</Typography>
                                                <RedCross />
                                            </Box>

                                            <Box sx={dataContainer}>
                                                <Typography sx={textContainer}>Add on prawn</Typography>
                                                <Typography sx={textContainer}>RM10.00</Typography>
                                                <RedCross />
                                            </Box>

                                            <Box sx={dataContainer}>
                                                <Typography sx={textContainer}>Add on meat</Typography>
                                                <Typography sx={textContainer}>RM10.00</Typography>
                                                <RedCross />
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                })}
                            </Box>
                            <Button className="submitButton" variant="contained" color="primary"
                                style={{
                                    marginTop: '1rem'
                                }}
                                onClick={() => {
                                    navigateToAnyWhere('/merchant/merchant-app')
                                }}
                            >Save</Button>
                        </Box>
                        :
                        <Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    minHeight: '80vh'
                                }}
                            >
                                <Box>
                                    <Box className='twoButtonWithGropWithThird'>
                                        <Box className='twoButtonGroup'>
                                            <Button className={isActive ? 'doubleButtonInActive' : 'doubleButtonActiveOnline'} onClick={handleClick}>Online</Button>
                                            <Button className={isActive ? 'doubleButtonActive' : 'doubleButtonInActive'} onClick={handleClick}>Offline</Button>
                                        </Box>
                                        <Box className='singleButtonRunner'>
                                            <Button className='runnerButton' onClick={() => navigateToAnyWhere('/screen-81')}>Advance Setting</Button>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            border: '1px solid #D1D1D1',
                                            borderRadius: '18px',
                                            p: 1,
                                            mt: 2
                                        }}
                                    >
                                        <Box>
                                            <label className="loginLable" htmlFor="name">Name of the product</label>

                                            {/* {formik.touched.name && formik.errors.name ? <Alert severity="warning">{formik.errors.name}</Alert> : null} */}

                                            <input id="name" className="loginInputs" variant="standard" type={"text"} name="name"
                                            // value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} 
                                            />
                                            <label className="loginLable" htmlFor="name">Price</label>

                                            {/* {formik.touched.name && formik.errors.name ? <Alert severity="warning">{formik.errors.name}</Alert> : null} */}

                                            <input id="name" className="loginInputs" variant="standard" type={"text"} name="name" placeholder='RM'
                                            // value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} 
                                            />
                                            <label className="loginLable" htmlFor="name">Preparation Time</label>

                                            {/* {formik.touched.name && formik.errors.name ? <Alert severity="warning">{formik.errors.name}</Alert> : null} */}

                                            <input id="name" className="loginInputs" variant="standard" type={"text"} name="name" placeholder='Minutes'
                                            // value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} 
                                            />

                                            <Box sx={{
                                                height: '145px',
                                                background: '#FFFFFF',
                                                border: '1px solid #B1B1B1',
                                                borderRadius: '15px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                cursor: 'pointer'
                                            }}>
                                                <img src={plusBig} alt='' />
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        m: 1
                                    }}>
                                        <Typography sx={produnctText}>
                                            Add on
                                        </Typography>

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
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => {
                                                setAddOns([...addOns, {
                                                    name: '',
                                                    price: '',
                                                    preparationTime: '',
                                                    img: ''
                                                }])
                                            }}
                                        >+</Box>
                                    </Box>
                                </Box>
                                {addOns.map((ele, ind) => {
                                    return <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            border: '1px solid #D1D1D1',
                                            borderRadius: '18px',
                                            p: 1,
                                            mt: 2
                                        }}
                                        key={ind}
                                    >
                                        <Box>
                                            <label className="loginLable" htmlFor="name">Name of the product</label>

                                            {/* {formik.touched.name && formik.errors.name ? <Alert severity="warning">{formik.errors.name}</Alert> : null} */}

                                            <input id="name" className="loginInputs" variant="standard" type={"text"} name="name"
                                            // value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} 
                                            />
                                            <label className="loginLable" htmlFor="name">Price</label>

                                            {/* {formik.touched.name && formik.errors.name ? <Alert severity="warning">{formik.errors.name}</Alert> : null} */}

                                            <input id="name" className="loginInputs" variant="standard" type={"text"} name="name" placeholder='RM'
                                            // value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} 
                                            />
                                            <label className="loginLable" htmlFor="name">Preparation Time</label>

                                            {/* {formik.touched.name && formik.errors.name ? <Alert severity="warning">{formik.errors.name}</Alert> : null} */}

                                            <input id="name" className="loginInputs" variant="standard" type={"text"} name="name" placeholder='Minutes'
                                            // value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} 
                                            />

                                            <Box sx={{
                                                height: '145px',
                                                background: '#FFFFFF',
                                                border: '1px solid #B1B1B1',
                                                borderRadius: '15px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                mb: 2
                                            }}>
                                                <img src={plusBig} alt='' />
                                            </Box>

                                            <Button
                                                className="removeBtnOperatorRunner fontSize12px" variant="contained"
                                                onClick={() => {
                                                    handleRemoveItem(ele.name)
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    </Box>
                                })}
                            </Box>
                            <Button className="submitButton" variant="contained" color="primary"
                                style={{
                                    marginTop: '1rem'
                                }}
                                onClick={() => {
                                    if (navHeading !== 'Product') {
                                        myfunc('Product');
                                    }
                                }}
                            >Save</Button>
                        </Box>
                }
            </Paper>
        </>
    )
}
