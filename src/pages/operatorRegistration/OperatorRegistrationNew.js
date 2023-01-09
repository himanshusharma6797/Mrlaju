import React from 'react'
import { Box, Button } from '@material-ui/core';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import './Operator.css'
import { Paper } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import { Alert } from '@material-ui/lab'
import Navbar from '../../components/Navbar';
// import { authAxios } from '../../api/axios';
import { authAxios } from '../../services/auth.service';
import { useFormik } from 'formik';
import operatorRegValidationSchema from '../../validations/operatorRegValidationSchema';
import { toast } from 'react-toastify';
import ToastNotify from '../../Notify/ToastNotify';
import { useState } from 'react';

export default function OperatorRegistration(props) {

    const [isDisable, setisDisable] = useState(false)

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            residentGroupName: '',
            email: '',
            fileUrl: 'ww.googlsffse.com',
            groupType: '',
            propertyCount: '',
            isMigrate: false,
            address: {
                unitNumber: '',
                streetName: '',
                townName: '',
                postalCode: '',
                state: ''
            },
            bankDetails: {
                bankName: '',
                accountHolderName: '',
                accountNumber: ''
            }
        },
        validationSchema: operatorRegValidationSchema,
        onSubmit: (values) => handleSubmit(values)
    });

    const notify = () => toast.info("Submission has been sent. The respective admin will contact you soon.");

    const handleSubmit = async (values) => {
        console.log('data', values);
        try {
            setisDisable(true)
            const response = await authAxios.post('operator/register', values)
            console.log(response);
            notify();
            setTimeout(() => {
                setisDisable(false)
                navigate("/")
            }, 4000)
        } catch (err) {
            setisDisable(false)
            toast.error(err?.response?.data?.message);
            console.log(err?.response?.data);
        }
    }

    const navigateToAnyWhere = (path) => {
        navigate(`${path}`);
    };


    return (
        <>
            <Paper sx={{ flexGrow: 1 }} className="OperatorRegNew" elevation={10} style={{ padding: '1.25rem' }}>

                <Navbar backButtonPath={'/'} title={'Operator Registration'} />

                <ButtonGroup className="doubleButton" sx={{ marginBottom: '1rem', alignItems:'center' }}>
                    <Button className='doubleButtonBig' onClick={() => navigateToAnyWhere('/operator-registration/new-account')}>New Account</Button>
                    <Button className='doubleButtonSmall' onClick={() => navigateToAnyWhere('/operator-registration/migrate-account')}>Migrated Account</Button>
                </ButtonGroup>
                <form onSubmit={formik.handleSubmit}>
                    
                    <div style={{display:'flex', justifyContent:'space-between'}}>

                    <label className="loginLable" htmlFor="residentGroupName">Name of your resident group</label>
                    <InfoSharpIcon className='infoButtonOperator' onClick={() => navigateToAnyWhere('/about-operator')} />
                    </div>

                    {formik.touched.residentGroupName && formik.errors.residentGroupName ? <Alert severity="warning">{formik.errors.residentGroupName}</Alert> : null}

                    <input id="residentGroupName" className="loginInputs" variant="standard" type={"text"} name="residentGroupName"
                        value={formik.values.residentGroupName}
                        placeholder='ie XXX condominium' onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />

                    <h3 className="inputBlockHeading">Address</h3>

                    <label className="loginLable" htmlFor="unitNumber">Unit Number</label>

                    {formik.touched.address?.unitNumber && formik.errors.address?.unitNumber ? <Alert severity="warning">{formik.errors.address?.unitNumber}</Alert> : null}

                    <input id="unitNumber" className="loginInputs" variant="standard"
                        type={"text"}
                        name="address.unitNumber"
                        value={formik.values.address?.unitNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />

                    <label className="loginLable" htmlFor="streetName">Street Name</label>

                    {formik.touched.address?.streetName && formik.errors.address?.streetName ? <Alert severity="warning">{formik.errors.address?.streetName}</Alert> : null}

                    <input id="streetName" className="loginInputs" variant="standard" type={"text"} name="address.streetName"
                        value={formik.values.address.streetName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />


                    <label className="loginLable" htmlFor="townName">Town Name</label>

                    {formik.touched.address?.townName && formik.errors.address?.townName ? <Alert severity="warning">{formik.errors.address?.townName}</Alert> : null}

                    <input id="townName" className="loginInputs" variant="standard" type={"text"} name="address.townName"
                        value={formik.values.address.townName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />


                    <div className='doubleInputBoxInLine'>

                        <div className='displayFlexColumn'>

                            <label className="loginLable" htmlFor="state">State</label>

                            {formik.touched.address?.state && formik.errors.address?.state ? <Alert severity="warning">{formik.errors.address?.state}</Alert> : null}

                            <input id="state" className="loginInputHalfWidth" variant="standard" type={"text"} name="address.state"
                                value={formik.values.address.state}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />

                        </div>

                        <div className='displayFlexColumnTwo'>

                            <label className="loginLable" htmlFor="postalCode">Postcode</label>

                            {formik.touched.address?.postalCode && formik.errors.address?.postalCode ? <Alert severity="warning">{formik.errors.address?.postalCode}</Alert> : null}

                            <input id="postalCode" className="loginInputHalfWidth" variant="standard"
                                type={"text"} name="address.postalCode"
                                value={formik.values.address.postalCode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />

                        </div>

                    </div>


                    <label className="loginLable" htmlFor="groupType">Resident group type</label>

                    {formik.touched.groupType && formik.errors.groupType ? <Alert severity="warning">{formik.errors.groupType}</Alert> : null}

                    <select
                        id='groupType'
                        value={formik.values.groupType}
                        name={'groupType'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // inputProps={{ 'aria-label': 'Without label' }}
                        className="slectedInputs"
                    >
                        <option value={""}>Select</option>
                        <option value={"JOINT MANAGEMENT BODY"}>JOINT MANAGEMENT BODY</option>
                        <option value={"MANAGEMENT CORPORATION"}>MANAGEMENT CORPORATION</option>
                        <option value={"RESIDENT ASSOCIATION"}>RESIDENT ASSOCIATION</option>
                        <option value={"DEVELOPER"}>DEVELOPER</option>
                        <option value={"OTHERS"}>OTHERS</option>
                    </select>

                    <label className="loginLable" htmlFor="fileUrl">JMB / MC / RA certification by authority</label>

                    {formik.touched.fileUrl && formik.errors.fileUrl ? <Alert severity="warning">{formik.errors.fileUrl}</Alert> : null}

                    <div className="loginInputs phoneNumberAndOTPButtonContainer">

                        <input id="fileUrl" className="phoneNumberInput" variant="standard"
                            type="file"
                            name="fileUrl"
                            style={{ opacity: 0 }}
                            // value={formik.values.fileUrl}
                            onChange={(event) => {
                                let reader = new FileReader();
                                reader.onload = () => {
                                    // 0 means empty
                                    // 1 means loading
                                    // 2 means done
                                    if (reader.readyState === 2) {
                                        formik.setFieldValue('fileUrl', reader.result);
                                        // formate is blob (binary large object) encrypted
                                    }
                                }
                                reader.readAsDataURL(event.target.files[0])
                            }} placeholder="File Name"
                            onBlur={formik.handleBlur} />

                        <button className="uploadCertificate" disabled>
                            <AddSharpIcon />
                        </button>

                        <button className="deleteCertificate" disabled>
                            <ClearSharpIcon />
                        </button>
                    </div>


                    <label className="loginLable" htmlFor="email">Email for this group</label>

                    {formik.touched.email && formik.errors.email ? <Alert severity="warning">{formik.errors.email}</Alert> : null}

                    <input id="email" className="loginInputs" variant="standard" type={"text"} name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />

                    <label className="loginLable" htmlFor="propertyCount">Number of property demises within your group?</label>

                    {formik.touched.propertyCount && formik.errors.propertyCount ? <Alert severity="warning">{formik.errors.propertyCount}</Alert> : null}

                    <input id="propertyCount" className="loginInputs"
                        variant="standard"
                        type={"text"} name="propertyCount"
                        value={formik.values.propertyCount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />


                    <h3 className="inputBlockHeading">Bank Details for profit sharing</h3>

                    <label className="loginLable" htmlFor="bankName">Bank Name</label>

                    {formik.touched.bankDetails?.bankName && formik.errors.bankDetails?.bankName ? <Alert severity="warning">{formik.errors.bankDetails?.bankName}</Alert> : null}

                    <input id="bankName" className="loginInputs" variant="standard" type={"text"} name="bankDetails.bankName"
                        value={formik.values.bankDetails.bankName}
                        onChange={formik.handleChange} placeholder="ie. MayBank"
                        onBlur={formik.handleBlur} />


                    <label className="loginLable" htmlFor="accountNumber">Bank Account Number</label>

                    {formik.touched.bankDetails?.accountNumber && formik.errors.bankDetails?.accountNumber ? <Alert severity="warning">{formik.errors.bankDetails?.accountNumber}</Alert> : null}

                    <input id="accountNumber" className="loginInputs" variant="standard"
                        type={"text"} name="bankDetails.accountNumber"
                        value={formik.values.bankDetails.accountNumber}
                        onChange={formik.handleChange} placeholder="ie. XXXXXXXXXXX"
                        onBlur={formik.handleBlur} />


                    <label className="loginLable" htmlFor="accountHolderName">Bank Account Name</label>

                    {formik.touched.bankDetails?.accountHolderName && formik.errors.bankDetails?.accountHolderName ? <Alert severity="warning">{formik.errors.bankDetails?.accountHolderName}</Alert> : null}

                    <input id="accountHolderName" className="loginInputs" variant="standard" type={"text"} name="bankDetails.accountHolderName"
                        value={formik.values.bankDetails.accountHolderName}
                        onChange={formik.handleChange} placeholder="ie. XXXXX sdn bhd"
                        onBlur={formik.handleBlur} />

                    <Button
                        disabled={isDisable}
                        style={isDisable ? { opacity: 0.6 } : null}
                        className="submitButton"
                        type="Submit"
                        variant="contained">
                        Submit
                    </Button>
                </form>
                <ToastNotify />
            </Paper>
        </>
    )
}
