import { useState, useRef } from "react";
import React from 'react'
import logo from '../../images/logo1.svg'
import { Box, Button, Grid, Paper } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import forgotPasswordValidationSchema from '../../validations/forgotPasswordValidationSchema';
import { useFormik } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';
import { forgotPassword } from "../../Redux/actions/auth";
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';


// const FORGOT_PASSWORD_URL = 'auth/forgetPassword';

const countriesCode = [
    {
        id: 1,
        country: "Malaysia",
        code: "+60",
    },
    {
        id: 2,
        country: "Thailand",
        code: "+66",
    },
    {
        id: 3,
        country: "India",
        code: "+91",
    },
    {
        id: 4,
        country: "United States",
        code: "+01",
    },
    {
        id: 5,
        country: "Iran",
        code: "+96",
    }
]


export default function ForgotPassword() {

    const form = useRef();

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            mobileNumber: '',
            otp: '',
            password: '',
            countryCodeId: ''
        },
        validationSchema: forgotPasswordValidationSchema,
        onSubmit: (values) => handleSubmit(values)
    });

    const { isLoggedIn } = useSelector(state => state.auth);    // at last
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const handleSubmit = async () => {
        setLoading(true);

        if (formik.errors.mobileNumber === undefined && formik.errors.countryCodeId === undefined && formik.errors.password === undefined && formik.errors.otp === undefined) {

            dispatch(forgotPassword(formik.values.password, formik.values.countryCodeId, formik.values.mobileNumber, formik.values.otp))
                .then(() => {
                    navigate("/login");
                    // window.location.reload();
                    console.log('success');
                })
                .catch(() => {
                    setLoading(false);
                    console.log('fail');
                });
        } else {
            setLoading(false);
        }
        console.log("Values", formik.values);
    };

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }


    const getOTP = (e) => {
        let digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }

    return (<>
        <Grid>
            <Box sx={{ p: 2, pt: 3 }}>
                <ArrowBackIosSharpIcon className='backButtonArrowLRF' onClick={() => navigate(`/login`)} />
            </Box>
            <Grid align='center' className="headingLoginPages">
                {loading
                    ?
                    (<CircularProgress />)
                    :
                    <img className="svgLogo" src={logo} alt="logo" />}
                <h1 className="mainHeading">MrLaju</h1>
                <h3 className="loginHeading">Forgot Password</h3>
            </Grid>

            <Paper elevation={10} className="formContainer">
                <form onSubmit={formik.handleSubmit} ref={form}>
                    <div className="lableInputBox">
                        {message && (
                            <Alert className="positionCenterAbsolute" severity="error">{message}!</Alert>
                        )}

                        <label className="loginLable" htmlFor="mobileNumber">Phone Number</label>

                        {(formik.touched.countryCodeId && formik.errors.countryCodeId) || (formik.touched.mobileNumber && formik.errors.mobileNumber) ? <Alert severity="warning">{formik.errors.mobileNumber} {formik.errors.countryCodeId}</Alert> : null}


                        <div className="loginInputs phoneNumberAndOTPButtonContainer">

                            <select className="selectCountryCode" value={formik.values.countryCodeId} onChange={formik.handleChange} name="countryCodeId" onBlur={formik.handleBlur} >
                                {countriesCode.map((option) => (
                                    <option key={option.id} value={option.code}>{option.code}</option>
                                ))}
                            </select>

                            <input id="mobileNumber" className="phoneNumberInput" placeholder="XXXXXXXXXXXX" variant="standard"
                                type={"tel"} name="mobileNumber" value={formik.values.mobileNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            <button onClick={() => getOTP()} disabled className="getOTPButtonRegister">
                                <ArrowForwardIosIcon className="arrowForwardIosIcon" />
                            </button>
                        </div>



                        <label className="loginLable" htmlFor="otp">Enter OTP</label>

                        {formik.touched.otp && formik.errors.otp ? <Alert severity="warning">{formik.errors.otp}</Alert> : null}

                        <input id="otp" className="loginInputs" variant="standard"
                            type={"tel"} name="otp" value={formik.values.otp} onChange={formik.handleChange} onBlur={formik.handleBlur} />


                        <label className="loginLable" htmlFor="password">Your Password</label>

                        {formik.touched.password && formik.errors.password ? <Alert severity="warning">{formik.errors.password}</Alert> : null}

                        <input id="password" className="loginInputs" variant="standard" type={"password"} name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="************" onBlur={formik.handleBlur} />

                    </div>

                    <Button className="submitButton" type="Submit" variant="contained" color="primary">Save</Button>

                </form>
            </Paper>
        </Grid>
    </>
    )
}
