import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircularProgress from '@mui/material/CircularProgress';
import { useFormik } from 'formik';
import logo from '../../images/logo1.svg'
import SplashOne from "../splash/SplashOne";
import SplashTwo from "../splash/SplashTwo";
import SplashThree from "../splash/SplashThree";
import { login } from "../../Redux/actions/auth";
import loginValidationSchema from '../../validations/loginValidationSchema';
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import './Login.css';


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

export default function Login(props) {
    const [loadingSplashOne, setLoadingSplashOne] = useState(false);
    const [loadingSplashTwo, setLoadingSplashTwo] = useState(false);
    const [loadingSplashThree, setLoadingSplashThree] = useState(false);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            countryCodeId: '+60',
            mobileNumber: '',
            password: '',
            // userID: ''
        },
        validationSchema: loginValidationSchema,
        onSubmit: (values) => handleSubmit(values)
    });


    const { isLoggedIn } = useSelector(state => state.auth);    // at last
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    useEffect(() => {
        // setLoadingSplashOne(true);
        setLoadingSplashOne(false);
        setTimeout(() => {
            setLoadingSplashOne(false);
            // setLoadingSplashTwo(true);
            setLoadingSplashTwo(false);
            setTimeout(() => {
                setLoadingSplashTwo(false);
                // setLoadingSplashThree(true);
                setLoadingSplashThree(false);
            }, 3000);
        }, 3000);
    }, []);


    const handleSubmit = async () => {
        setLoading(true);

        if (formik.errors.userID === undefined && formik.errors.countryCodeId === undefined && formik.errors.password === undefined && formik.errors.phoneNumber === undefined) {
            dispatch(login(formik.values.userID, formik.values.password, formik.values.countryCodeId, formik.values.mobileNumber))
                .then(() => {
                    navigate("/");
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
        console.log("Login Values", formik.values);
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

    const disableSplashThree = () => {
        setLoadingSplashThree(false)
    }

    return (<>
        {loadingSplashOne
            ?
            <SplashOne />
            :
            loadingSplashTwo
                ?
                <SplashTwo />
                :
                loadingSplashThree
                    ?
                    <SplashThree setTime={disableSplashThree} />
                    :
                    <Grid>
                        <Box sx={{ p: 2, pt: 3 }}>
                            <ArrowBackIosSharpIcon className='backButtonArrowLRF' onClick={() => navigate(`/`)} />
                        </Box>

                        <Grid align='center' className="headingLoginPages">
                            {loading ? (
                                <CircularProgress />
                            ) : <img className="svgLogo" src={logo} alt="logo" />}
                            <h1 className="mainHeading">MrLaju</h1>
                            <h3 className="loginHeading">Login</h3>
                        </Grid>

                        <Paper elevation={10} className="formContainer">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="lableInputBox">
                                    {message && (
                                        <Alert className="positionCenterAbsolute" severity="error">{message}!</Alert>
                                    )}

                                    {/* <label className="loginLable" htmlFor="userID">User ID</label>

                                    {formik.touched.userID && formik.errors.userID ? <Alert severity="warning">{formik.errors.userID}</Alert> : null}

                                    <input id="userID" className="loginInputs" variant="standard" type={"text"} name="userID" value={formik.values.userID} onChange={formik.handleChange} onBlur={formik.handleBlur} /> */}


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


                                    <label className="loginLable" htmlFor="password">Your Password</label>

                                    {formik.touched.password && formik.errors.password ? <Alert severity="warning">{formik.errors.password}</Alert> : null}

                                    <input id="password" className="loginInputs" variant="standard" type={"password"} name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="************" onBlur={formik.handleBlur} />

                                </div>
                                <Button className="submitButton" type="Submit" variant="contained" color="primary" disabled={loading}>Login</Button>
                                <div className="bottomLinks">
                                    <Typography>
                                        <Link className="bottomLinks" to={"/register"}>Signup</Link>
                                    </Typography>

                                    <Typography>
                                        <Link className="bottomLinks" to={"/forgot-password"}>Forgot Password</Link>
                                    </Typography>
                                </div>

                            </form>
                        </Paper>

                    </Grid>
        }
    </>
    )
}
