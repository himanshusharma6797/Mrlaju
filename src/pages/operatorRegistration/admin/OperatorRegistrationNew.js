import React from 'react'
// import Typography from '@mui/material/Typography';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import './../Operator.css'
import { Paper } from '@material-ui/core';
import {
    Alert,
    // AlertTitle
} from '@material-ui/lab'
// import axios from '../../api/axios';
import Navbar from '../../../components/Navbar';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { authAxios } from '../../../services/auth.service';
import { useEffect } from 'react';
import { useState } from 'react';
import operatorRegValidationSchema from '../../../validations/operatorRegValidationSchema';
import { toast } from 'react-toastify';
import ToastNotify from '../../../Notify/ToastNotify';


export default function OperatorRegistration(props) {

    const [operatorData, setOperatorData] = useState({})
    const [statusType, setStatusType] = useState("")
    const [isDisable, setisDisable] = useState(false)

    const navigate = useNavigate()

    const { operatorId } = useParams()

    const notify = (type) => toast.info(`Operator ${type.toLowerCase()}!`);

    const getOperatorData = async () => {
        try {
            const { data: { data } } = await authAxios.get(`operator/${operatorId}?isMigrate=false`)
            console.log(data);
            setOperatorData(data)
        } catch (error) {
            console.log(error)
        }
    }

    const formik = useFormik({

        enableReinitialize: true,

        initialValues: {
            residentGroupName: operatorData?.residentGroupName ? operatorData?.residentGroupName : '',
            email: operatorData?.email ? operatorData?.email : '',
            fileUrl: 'ww.googlsffse.com',
            groupType: operatorData?.groupType ? operatorData?.groupType : '',
            propertyCount: operatorData?.propertyCount ? operatorData?.propertyCount : '',
            isMigrate: false,
            address: {
                unitNumber: operatorData?.address?.unitNumber ? operatorData?.address?.unitNumber : '',
                streetName: operatorData?.address?.streetName ? operatorData?.address?.streetName : '',
                townName: operatorData?.address?.townName ? operatorData?.address?.townName : '',
                postalCode: operatorData?.address?.postalCode ? operatorData?.address?.postalCode : '',
                state: operatorData?.address?.state ? operatorData?.address?.state : '',
            },
            bankDetails: {
                bankName: operatorData?.bankDetails?.bankName ? operatorData?.bankDetails?.bankName : '',
                accountHolderName: operatorData?.bankDetails?.accountHolderName ? operatorData?.bankDetails?.accountHolderName : '',
                accountNumber: operatorData?.bankDetails?.accountNumber ? operatorData?.bankDetails?.accountNumber : '',
            }
        },

        validationSchema: operatorRegValidationSchema,

        onSubmit: (values) => handleSubmit(values)

    })

    const handleSubmit = async (values) => {
        // e.preventDefault();
        console.log(values)
        console.log("handlesubmit works")
        try {

            if (!(operatorData?.status === "APPROVED")) {

                setisDisable(true)
                const { data: { data } } = await authAxios.put(`operator/update/status/${operatorId}?status=${statusType}`)
                notify(statusType)
                console.log(data)

                setTimeout(() => {
                    setisDisable(false)
                    navigate("/admin/mr-laju-admin")
                }, 4000)

            } else {

                notify("Already Approved")
                setisDisable(true)

                setTimeout(() => {
                    navigate("/admin/mr-laju-admin")
                    setisDisable(false)
                }, 3000)

            }

        } catch (error) {

            setisDisable(false)
            toast.error(error?.response?.data?.message);
            console.log("Error : " + error)

        }
    }

    useEffect(() => {
        getOperatorData();
    }, [])

    return (
        <>
            <Paper sx={{ flexGrow: 1 }} className="OperatorRegNew" elevation={10} style={{ padding: '1.25rem' }}>

                <Navbar title={'Operator Registration'} backButtonPath={'/admin/mr-laju-admin'} />

                <div>
                    <h3 className='upperHeadingAdmin'>New Account</h3>
                    <h5 className='loginLable'>Name</h5>
                    <p className='inputBlockHeading'>
                        {operatorData?.user?.name}
                    </p>
                    <h5 className='loginLable'>email</h5>
                    <p className='inputBlockHeading'>
                        {operatorData?.user?.email}
                    </p>
                    <h5 className='loginLable'>
                        Phone
                    </h5>
                    <p className='inputBlockHeading'>
                        {operatorData?.user?.mobileNumber}
                    </p>
                    <div className='doubleInputBoxInLine'>

                        <div className='displayFlexColumn'>
                            <a href={`https://api.whatsapp.com/send?phone=${operatorData?.user?.mobileNumber}`} target="_blank" rel="noreferrer"  >
                                <button className="loginInputHalfWidth buttonHalf whatsappButton">
                                    Whatsapp
                                </button>
                            </a>
                        </div>

                        <div className='displayFlexColumnTwo'>

                            <a href={`tel: ${operatorData?.user?.mobileNumber}`} >
                                <button className="loginInputHalfWidth buttonHalf callButton">
                                    Call
                                </button>
                            </a>
                        </div>

                    </div>
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <label className="loginLable" htmlFor="residentGroupName">Name of your resident group</label>

                    {formik.errors.residentGroupName && formik.touched.residentGroupName && <Alert severity="warning">{formik.errors.residentGroupName}</Alert>}

                    <input
                        id="residentGroupName"
                        className="loginInputs"
                        variant="standard"
                        type={"text"}
                        name="residentGroupName"
                        value={formik.values.residentGroupName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder='ie XXX condominium' />

                    <h3 className="inputBlockHeading">Address</h3>

                    <label className="loginLable" htmlFor="unitNumber">Unit Number</label>

                    {formik.errors.address?.unitNumber && formik.touched.address?.unitNumber && <Alert severity="warning">{formik.errors.address?.unitNumber}</Alert>}

                    <input
                        id="unitNumber"
                        className="loginInputs"
                        variant="standard"
                        type={"text"}
                        name="address.unitNumber"
                        value={formik.values.address?.unitNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />

                    <label className="loginLable" htmlFor="streetName">Street Name</label>

                    {formik.errors.address?.streetName && formik.touched.address?.streetName && <Alert severity="warning">{formik.errors.address?.streetName}</Alert>}

                    <input
                        id="streetName"
                        className="loginInputs"
                        variant="standard"
                        type={"text"}
                        name="address.streetName"
                        value={formik.values.address?.streetName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />

                    <label className="loginLable" htmlFor="townName">Town Name</label>

                    {formik.errors.address?.townName && formik.touched.address?.townName && <Alert severity="warning">{formik.errors.address?.townName}</Alert>}

                    <input
                        id="townName"
                        className="loginInputs"
                        variant="standard"
                        type={"text"}
                        name="address.townName"
                        value={formik.values.address?.townName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />


                    <div className='doubleInputBoxInLine'>

                        <div className='displayFlexColumn'>

                            <label className="loginLable" htmlFor="state">State</label>

                            {formik.errors.address?.state && formik.touched.address?.state && <Alert severity="warning">{formik.errors.address?.state}</Alert>}

                            <input
                                id="state"
                                className="loginInputHalfWidth"
                                variant="standard"
                                type={"text"}
                                name="address.state"
                                value={formik.values.address?.state}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />

                        </div>

                        <div className='displayFlexColumnTwo'>

                            <label className="loginLable" htmlFor="postCard">Postal code</label>

                            {formik.errors.address?.postalCode && formik.touched.address?.postalCode && <Alert severity="warning">{formik.errors.address?.postalCode}</Alert>}

                            <input
                                id="postCard"
                                className="loginInputHalfWidth"
                                variant="standard"
                                type={"text"}
                                name="address.postalCode"
                                value={formik.values.address?.postalCode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />

                        </div>

                    </div>


                    <label className="loginLable" htmlFor="groupType">Resident group type</label>

                    {formik.errors.groupType && formik.touched.groupType && <Alert severity="warning">{formik.errors.groupType}</Alert>}

                    <select
                        id='groupType'
                        name={'groupType'}
                        value={formik.values.groupType}
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


                    <label className="loginLable" htmlFor="email">email for this group</label>

                    {formik.errors.email && formik.touched.email && <Alert severity="warning">{formik.errors.email}</Alert>}

                    <input
                        id="email"
                        className="loginInputs"
                        variant="standard"
                        type={"text"}
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />


                    <label className="loginLable" htmlFor="propertyCount">Number of property demises within your group?</label>

                    {formik.errors.propertyCount && formik.touched.propertyCount && <Alert severity="warning">{formik.errors.propertyCount}</Alert>}

                    <input
                        id="propertyCount"
                        className="loginInputs"
                        variant="standard"
                        type={"text"}
                        name="propertyCount"
                        value={formik.values.propertyCount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />

                    <h3 className="inputBlockHeading">Bank Details for profit sharing</h3>

                    <label className="loginLable" htmlFor="bankName">Bank Name</label>

                    {formik.errors.bankDetails?.bankName && formik.touched.bankDetails?.bankName && <Alert severity="warning">{formik.errors.bankDetails?.bankName}</Alert>}

                    <input
                        id="bankName"
                        className="loginInputs"
                        variant="standard"
                        type={"text"}
                        name="bankDetails.bankName"
                        value={formik.values.bankDetails?.bankName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="ie. MayBank" />


                    <label className="loginLable" htmlFor="accountNumber">Bank Account Number</label>

                    {formik.errors.bankDetails?.accountNumber && formik.touched.bankDetails?.accountNumber && <Alert severity="warning">{formik.errors.bankDetails?.accountNumber}</Alert>}

                    <input
                        id="accountNumber"
                        className="loginInputs"
                        variant="standard"
                        type={"text"}
                        name="bankDetails.accountNumber"
                        value={formik.values.bankDetails?.accountNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="ie. XXXXXXXXXXX" />


                    <label className="loginLable" htmlFor="accountHolderName">Bank Account Name</label>

                    {formik.errors.bankDetails?.accountHolderName && formik.touched.bankDetails?.accountHolderName && <Alert severity="warning">{formik.errors.bankDetails?.accountHolderName}</Alert>}

                    <input
                        id="accountHolderName"
                        className="loginInputs"
                        variant="standard"
                        type={"text"}
                        name="bankDetails.accountHolderName"
                        value={formik.values.bankDetails?.accountHolderName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="ie. XXXXX sdn bhd" />
                    <div className='doubleInputBoxInLine'>

                        <div className='displayFlexColumn'>
                            <button
                                disabled={isDisable}
                                style={isDisable ? { opacity: 0.6 } : null}
                                name='approve'
                                onClick={() => setStatusType("APPROVED")}
                                className="loginInputHalfWidth buttonHalf approveButton"
                                type='submit' >
                                Approve
                            </button>
                        </div>

                        <div className='displayFlexColumnTwo'>
                            <button
                                disabled={isDisable}
                                style={isDisable ? { opacity: 0.6 } : null}
                                name='reject'
                                onClick={() => setStatusType("REJECTED")}
                                className="loginInputHalfWidth buttonHalf rejectButton"
                                type='submit' >
                                Reject
                            </button>
                        </div>

                    </div>

                    {/* <Button className="submitButton" type="Submit" variant="contained">Submit</Button> */}
                </form>

                <ToastNotify />

            </Paper>
        </>
    )
}
