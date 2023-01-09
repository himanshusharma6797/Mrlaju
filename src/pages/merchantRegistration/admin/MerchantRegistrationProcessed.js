import React from 'react'
import { useState } from "react";
import './../../operatorRegistration/Operator.css'
import { Paper } from '@material-ui/core';
import {
    Alert,
    // AlertTitle
} from '@material-ui/lab'
// import axios from '../../api/axios';
import { useEffect } from 'react';
import Navbar from '../../../components/Navbar';


// const OPERATOR_REGISTRATION_URL = '/auth/operator-registration/new-account';
const countriesCode = [
    {
        id: 1,
        country: "India",
        code: "+91",
    },
    {
        id: 2,
        country: "Thailand",
        code: "+66",
    },
    {
        id: 3,
        country: "Malaysia",
        code: "+60",
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


export default function MerchantRegistraionProcessed(props) {
    const initialValues = { businessName: "", businessAddress: "", personInChargeName: "", phoneNumber: "", countryCode: "" };

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    //validations
    const [businessNameCheck, setBusinessNameCheck] = useState(false);
    const [businessAddressCheck, setBusinessAddressCheck] = useState(false);
    const [personInChargeNameCheck, setPersonInChargeNameCheck] = useState(false);
    const [countryCodeCheck, setCountryCodeCheck] = useState(false);
    const [phoneNumberCheck, setPhoneNumberCheck] = useState(false);

    const [hide, setHide] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));

        // try {
        //     const response = await axios.post(OPERATOR_REGISTRATION_URL,
        //         {
        //             headers: { 'Content-Type': 'application/json' },
        //             withCredentials: true,
        //             data: { residentGroup: formValues.nameOfYourResidentGroup }
        //         }
        //     );
        //     console.log(JSON.stringify(response?.data));
        //     console.log(JSON.stringify(response));
        //     // get this token from the backend
        //     // const accessToken = response?.data.accessToken;
        //     // const roles = response?.data.roles;
        //     // setAuth({roles, accessToken});
        //     setFormValues(initialValues);
        setIsSubmit(true);
        // } catch (err) {
        //     if (!err?.response) {
        //         console.log('No Server Response');
        //         // setErrMsg('No Server Response');
        //     } else if (err.response?.status === 400) {
        //         console.log('Missing Username or Password');
        //         // setErrMsg('Missing Username or Password');
        //     } else if (err.response?.status === 401) {
        //         console.log('Unauthorized');
        //         // setErrMsg('Unauthorized');
        //     } else {
        //         console.log('Login Failed');
        //         // setErrMsg('Login Failed');
        //     }
        // }
        console.log("onSubmit is working");
        console.log("Business Name: ", formValues.businessName);
        console.log("Business Address: ", formValues.businessAddress);
        console.log("Person in Charge (Name): ", formValues.personInChargeName);
        console.log("His Mobile Number: ", formValues.phoneNumber);
        console.log("Country Code: ", formValues.countryCode);
    }

    useEffect(() => {
        // console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            // console.log(formValues);
        }
    }, [formErrors, formValues, isSubmit]);

    const validate = (value) => {
        const error = {};

        if (!value.businessName) {
            setBusinessNameCheck(true)
            error.businessName = "This field is required!";
        }
        if (!value.businessAddress) {
            setBusinessAddressCheck(true)
            error.businessAddress = "This field is required!";
        }
        if (!value.personInChargeName) {
            setPersonInChargeNameCheck(true)
            error.personInChargeName = "This field is required!";
        }
        if (!value.phoneNumber) {
            setCountryCodeCheck(true)
            error.phoneNumber = "This field is required!";
        }
        if (!value.countryCode) {
            setPhoneNumberCheck(true)
            error.countryCode = "This field is required!";
        }

        setHide(true)
        setTimeout(() => {
            setHide(false)

            setBusinessNameCheck(false);
            setBusinessAddressCheck(false);
            setPersonInChargeNameCheck(false);
            setCountryCodeCheck(false);
            setPhoneNumberCheck(false);

            setIsSubmit(false)
        }, 2000)
        return error
    };

    return (
        <>
            <Paper sx={{ flexGrow: 1 }} className="merchantRegistrationNewContainer" elevation={10} style={{ padding: '1.25rem' }}>

                <Navbar title={'Merchant Registration'} backButtonPath={'/admin/merchant-application'} />

                <div>
                    <h3 className='merchantProcessed'>Processed</h3>
                </div>

                <form onSubmit={handleSubmit}>

                    <label className="loginLable" htmlFor="businessName">Business Name</label>

                    {businessNameCheck ? <Alert severity="warning">{formErrors.businessName}</Alert> : null}

                    <input id="businessName" className="loginInputs" variant="standard" type={"text"} name="businessName" value={formValues.businessName} onChange={handleChange} placeholder="File Name" />


                    <label className="loginLable" htmlFor="businessAddress">Business Address</label>

                    {businessAddressCheck ? <Alert severity="warning">{formErrors.businessAddress}</Alert> : null}

                    <input id="businessAddress" className="loginInputs" variant="standard" type={"text"} name="businessAddress"
                        value={formValues.businessAddress}
                        onChange={handleChange} />


                    <label className="loginLable" htmlFor="personInChargeName">Person in Charge (Name)</label>

                    {personInChargeNameCheck ? <Alert severity="warning">{formErrors.personInChargeName}</Alert> : null}

                    <input id="personInChargeName" className="loginInputs" variant="standard" type={"text"} name="personInChargeName"
                        value={formValues.personInChargeName}
                        onChange={handleChange} />

                    <label className="loginLable" htmlFor="phoneNumber">His Mobile Number</label>

                    {phoneNumberCheck || countryCodeCheck ? <Alert severity="warning">{formErrors.phoneNumber} {formErrors.countryCode}</Alert> : null}

                    {hide ? null : <select className="selectCountryCodeMerchhantRegistrationAdmin" value={formValues.countryCode} onChange={handleChange} name="countryCode">
                        {countriesCode.map((option) => (
                            <option key={option.id} value={option.code}>{option.code}</option>
                        ))}
                    </select>}
                    <input id="phoneNumber" className="loginInputs loginInputPhone" variant="standard"
                        type={"tel"} name="phoneNumber"
                        value={formValues.phoneNumber} placeholder="XXXXXXXXXXXX" onChange={handleChange} />


                    <div className='doubleInputBoxInLine'>

                        <div className='displayFlexColumn'>
                            <button className="loginInputHalfWidth buttonHalf whatsappButton">
                                Whatsapp
                            </button>
                        </div>

                        <div className='displayFlexColumnTwo'>
                            <button className="loginInputHalfWidth buttonHalf callButton">
                                Call
                            </button>
                        </div>



                    </div>

                    <div className='merchantDateContainer'>

                        <h5 className='merchantDatesLable'>Submit date</h5>
                        <p className='inputBlockHeading'>XX-XX-XXXX</p>
                        <h5 className='merchantDatesLable'>Process date</h5>
                        <p className='inputBlockHeading'>XX-XX-XXXX</p>
                    </div>

                </form>

            </Paper>
        </>
    )
}
