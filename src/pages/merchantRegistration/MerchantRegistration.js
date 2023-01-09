import React from 'react'
import './../operatorRegistration/Operator.css'
import { Paper } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import Navbar from '../../components/Navbar';
import { Button } from '@material-ui/core'
import { authAxios } from '../../services/auth.service';
import { useFormik } from 'formik';
import merchantRegValidationSchema from '../../validations/merchantRegValidationSchema';
import {
    useEffect, useState
    // , useRef
} from 'react';
import SearchBar from '../../components/SearchBarOperatorList';
import { useNavigate } from 'react-router-dom';
// import SelectSearch from "react-select-search";
import { toast } from 'react-toastify';
import ToastNotify from '../../Notify/ToastNotify';
import SearchPanal from '../../components/SearchPanal';


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

export default function MerchantRegistraionNew(props) {
    // const searchInput = useRef();
    const [isDisable, setisDisable] = useState(false)
    const [optionData, setOptionData] = useState([])
    const [selectedOptions, setSelectedOptions] = useState({})

    const navigate = useNavigate()

    const paper = {
        padding: '1.25rem',
        minHeight: '100vh'
    }

    const notify = () => toast.info("Submission has been sent. The respective admin will contact you soon.");

    const formik = useFormik({
        enableReinitialize: true,

        initialValues: {
            residentGroupId: selectedOptions?.id ? selectedOptions?.id : 0,
            businessName: '',
            businessAddress: '',
            personInchargeName: '',
            mobileNumber: '',
            countryCodeId: '+60'
        },

        validationSchema: merchantRegValidationSchema,

        onSubmit: (values) => handleSubmit(values)
    });

    const getOperatorList = async () => {

        const userId = localStorage.getItem('userId');
        try {
            const { data: { data } } = await authAxios.get(`operator/list/operatorByUserId/${userId}`)
            setOptionData(data)
            console.log(data)

        } catch (err) {
            console.log(err?.response?.data);
        }
    }

    useEffect(() => {
        getOperatorList()
    }, [])

    const handleSubmit = async (values) => {
        console.log("handleSubmit works");
        console.log('data', values);
        try {
            setisDisable(true)
            const response = await authAxios.post('merchant/register', values)
            notify()
            setTimeout(() => {
                setisDisable(false)
                navigate("/")
            }, 4000)
            console.log(response);
        } catch (err) {
            toast.error(err?.response?.data?.message);
            setisDisable(false)
            console.log(err?.response?.data);
        }
    };


    return (
        <>
            <Paper className="merchantRegistrationNewContainer" elevation={10} style={paper}>

                <Navbar title={'Merchant Registration'} backButtonPath={'/'} />

                <div>
                    <h3 className='merchantregistrationHeading'>Please find a Resident Group to provide service</h3>
                </div>

                <form onSubmit={formik.handleSubmit} className='merchantRegistrationform'>
                    <div>

                        <label className="loginLable" htmlFor="residentGroupName">Choose a resident group</label>

                        {formik.touched.residentGroupId && formik.errors.residentGroupId ? <Alert severity="warning">{formik.errors.residentGroupId}</Alert> : null}


                        {/* <SearchBar placeholder="Search"
                            name="formik.values.residentGroupId"
                            setSearchData={setSearchData} /> */}
                        <SearchPanal
                            className="opListPanal"
                            optionData={optionData}
                            setSelectedOptions={setSelectedOptions} />

                        <label className="loginLable" htmlFor="businessName">Business Name</label>

                        {formik.touched.businessName && formik.errors.businessName ? <Alert severity="warning">{formik.errors.businessName}</Alert> : null}

                        <input id="businessName" className="loginInputs" variant="standard" type={"text"} name="businessName" value={formik.values.businessName} onChange={formik.handleChange} placeholder="File Name" onBlur={formik.handleBlur} />


                        <label className="loginLable" htmlFor="businessAddress">Business Address</label>

                        {formik.touched.businessAddress && formik.errors.businessAddress ? <Alert severity="warning">{formik.errors.businessAddress}</Alert> : null}

                        <input id="businessAddress" className="loginInputs" variant="standard" type={"text"} name="businessAddress"
                            value={formik.values.businessAddress}
                            onChange={formik.handleChange} onBlur={formik.handleBlur} />


                        <label className="loginLable" htmlFor="personInchargeName">Person in Charge (Name)</label>

                        {formik.touched.personInchargeName && formik.errors.personInchargeName ? <Alert severity="warning">{formik.errors.personInchargeName}</Alert> : null}

                        <input id="personInchargeName" className="loginInputs" variant="standard" type={"text"} name="personInchargeName"
                            value={formik.values.personInchargeName}
                            onChange={formik.handleChange} onBlur={formik.handleBlur} />

                        <label className="loginLable" htmlFor="mobileNumber">His Mobile Number</label>

                        {(formik.touched.countryCodeId && formik.errors.countryCodeId) || (formik.touched.mobileNumber && formik.errors.mobileNumber) ? <Alert severity="warning">{formik.errors.mobileNumber} {formik.errors.countryCodeId}</Alert> : null}


                        <div className="loginInputs phoneNumberAndOTPButtonContainer">

                            <select
                                className="selectCountryCode"
                                value={formik.values.countryCodeId}
                                onChange={formik.handleChange}
                                name="countryCodeId"
                                onBlur={formik.handleBlur} >

                                {countriesCode.map((option) => (
                                    <option key={option.id} value={option.code}>{option.code}</option>
                                ))}

                            </select>

                            <input id="mobileNumber" className="phoneNumberInput" placeholder="XXXXXXXXXXXX" variant="standard"
                                type={"tel"} name="mobileNumber" value={formik.values.mobileNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                        </div>
                    </div>

                    <Button
                        disabled={isDisable}
                        style={isDisable ? { opacity: 0.6 } : null}
                        className="submitButtonMerchantRegistration"
                        type="submit"
                        variant="contained">
                        Submit
                    </Button>

                </form>
                <ToastNotify />
            </Paper>
        </>
    )
}
