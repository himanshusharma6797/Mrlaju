import React from 'react'
// import Typography from '@mui/material/Typography';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import { useFormik } from 'formik';
import './../Operator.css'
import { Paper } from '@material-ui/core';
import {
    Alert,
    // AlertTitle
} from '@material-ui/lab'
import { useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import operatorRegMigrateValidationSchema from '../../../validations/operatorRegMigrateValidationSchema';
import { useState } from 'react';
import { authAxios } from '../../../services/auth.service';
import { useParams } from 'react-router-dom';


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


export default function OperatorRegistrationMigrate(props) {

    const [operatorData, setOperatorData] = useState({})
    const [statusType, setStatusType] = useState("")

    const { operatorId } = useParams()

    const getOperatorData = async () => {
        try {
            const { data: { data } } = await authAxios.get(`operator/${operatorId}`)
            setOperatorData(data)
        } catch (error) {
            console.log(error)
        }
    }

    const formik = useFormik({

        enableReinitialize: true,

        initialValues: {
            residentGroupName: operatorData.residentGroupName ? operatorData.residentGroupName : "Joint Management Body",
            unitNumber: operatorData.unitNumber ? operatorData.unitNumber : "Joint Management Body",
            streetNumber: operatorData.streetNumber ? operatorData.streetNumber : "",
            townName: operatorData.townName ? operatorData.townName : "",
            state: operatorData.state ? operatorData.state : "",
            postCode: operatorData.postCode ? operatorData.postCode : "",
            residentGroupType: operatorData.residentGroupType ? operatorData.residentGroupType : "",
            jMBMCRACertyAuthority: operatorData.jMBMCRACertyAuthority ? operatorData.jMBMCRACertyAuthority : "",
            countryCode: operatorData.countryCode ? operatorData.countryCode : "",
            phoneNumber: operatorData.phoneNumber ? operatorData.phoneNumber : "",
            emailOfTheGroup: operatorData.email ? operatorData.email : "",
            numberOfPropertyDemisesWithinGroup: operatorData.numberOfPropertyDemisesWithinGroup ? operatorData.numberOfPropertyDemisesWithinGroup : "",
            bankName: operatorData.bankName ? operatorData.bankName : "",
            bankAccountNumber: operatorData.bankAccountNumber ? operatorData.bankAccountNumber : "",
            bankAccountName: operatorData.bankAccountName ? operatorData.bankAccountName : "",
        },

        validationSchema: operatorRegMigrateValidationSchema,

        onsubmit: (values) => handleSubmit(values)

    })

    const handleSubmit = async (e) => {
        // e.preventDefault();
        console.log(e);
        try {

            const { data: { data } } = await authAxios.put(`operator/update/status/${operatorId}?status=${statusType}`)

        } catch (error) {

            console.log("Error : " + error)

        }
    }

    useEffect(() => {
        getOperatorData()
    }, [])


    return (
        <>
            <Paper sx={{ flexGrow: 1 }} className="OperatorRegNew" elevation={10} style={{ padding: '1.25rem' }}>

                <Navbar title={'Operator Registration'} backButtonPath={'/admin/mr-laju-admin'} />

                <div>
                    <h3 className='upperHeadingAdmin'>Migrate Account</h3>
                    <h5 className='loginLable'>Name</h5>
                    <p className='inputBlockHeading'>
                        {operatorData?.residentGroupName}
                    </p>
                    <h5 className='loginLable'>Email</h5>
                    <p className='inputBlockHeading'>
                        {operatorData?.email}
                    </p>
                    <h5 className='loginLable'>Phone</h5>
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

                    <label
                        className="loginLable" htmlFor="nameOfYourResidentGroup">Name of your resident group</label>

                    {formik.errors.residentGroupName && formik.touched.residentGroupName && <Alert severity="warning">{formik.errors.residentGroupName}</Alert>}

                    <input
                        id="nameOfYourResidentGroup"
                        className="loginInputs" variant="standard"
                        type={"text"}
                        name="residentGroupName"
                        value={formik.values.residentGroupName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder='ie XXX condominium' />

                    <h3 className="inputBlockHeading">Address</h3>

                    <label className="loginLable" htmlFor="unitNumber">Unit Number</label>

                    {formik.errors.unitNumber && formik.touched.unitNumber && <Alert severity="warning">{formik.errors.unitNumber}</Alert>}

                    <input id="unitNumber"
                        className="loginInputs"
                        variant="standard"
                        type={"text"}
                        name="unitNumber"
                        value={formik.values.unitNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />


                    <label className="loginLable" htmlFor="streetNumber">Street Name</label>

                    {formik.errors.streetNumber && formik.touched.streetNumber && <Alert severity="warning">{formik.errors.streetNumber}</Alert>}

                    <input
                        id="streetNumber"
                        className="loginInputs"
                        variant="standard" type={"text"}
                        name="streetNumber"
                        value={formik.values.streetNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />


                    <label className="loginLable" htmlFor="townName">Town Name</label>

                    {formik.errors.townName && formik.touched.townName && <Alert severity="warning">{formik.errors.townName}</Alert>}

                    <input id="townName"
                        className="loginInputs"
                        variant="standard"
                        type={"text"}
                        name="townName"
                        value={formik.values.townName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />


                    <div className='doubleInputBoxInLine'>

                        <div className='displayFlexColumn'>

                            <label className="loginLable" htmlFor="state">State</label>

                            {formik.errors.state && formik.touched.state && <Alert severity="warning">{formik.errors.state}</Alert>}

                            <input
                                id="state"
                                className="loginInputHalfWidth"
                                variant="standard"
                                type={"text"}
                                name="state"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />

                        </div>

                        <div className='displayFlexColumnTwo'>

                            <label className="loginLable" htmlFor="postCard">Postcode</label>

                            {formik.errors.postCode && formik.touched.postCode && <Alert severity="warning">{formik.errors.postCode}</Alert>}

                            <input
                                id="postCard"
                                className="loginInputHalfWidth"
                                variant="standard" type={"text"}
                                name="postCode"
                                value={formik.values.postCode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                        </div>

                    </div>


                    <label className="loginLable" htmlFor="residentGroupType">Resident group type</label>

                    {formik.errors.residentGroupType && formik.touched.residentGroupType && <Alert severity="warning">{formik.errors.residentGroupType}</Alert>}

                    <select
                        id='residentGroupType'
                        name="residentGroupType"
                        value={formik.values.residentGroupType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="slectedInputs"
                    >
                        <option value={7}>Select</option>
                        <option value={7}>Ten</option>
                        <option value={7}>Twenty</option>
                        <option value={7}>Thirty</option>
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


                    <label className="loginLable" htmlFor="phoneNumber">Previous Person In Charge Number</label>

                    {(formik.errors.phoneNumber && formik.touched.phoneNumber) || (formik.errors.countryCode && formik.touched.countryCode
                        &&
                        <Alert severity="warning">
                            {formik.errors.phoneNumber && formik.errors.phoneNumber}
                            {formik.errors.countryCode && formik.errors.countryCode}
                        </Alert>)}

                    <select
                        className="selectCountryCodeMigrateAdmin"
                        name="countryCode"
                        value={formik.values.countryCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}>
                        {countriesCode.map((option) => (
                            <option key={option.id} value={option.code}>{option.code}</option>
                        ))}
                    </select>

                    <input
                        id="phoneNumber"
                        className="loginInputs loginInputPhone"
                        variant="standard"
                        name="phoneNumber"
                        type={"tel"}
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="XXXXXXXXXXXX" />

                    <label className="loginLable" htmlFor="emailOfTheGroup">Email for this group</label>

                    {formik.errors.emailOfTheGroup && formik.touched.emailOfTheGroup && <Alert severity="warning">{formik.errors.emailOfTheGroup}</Alert>}

                    <input
                        id="emailOfTheGroup"
                        className="loginInputs"
                        variant="standard"
                        type={"text"}
                        name="emailOfTheGroup"
                        value={formik.values.emailOfTheGroup}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />


                    <label className="loginLable" htmlFor="numberOfPropertyDemisesWithinGroup">Number of property demises within your group?</label>

                    {formik.errors.numberOfPropertyDemisesWithinGroup && formik.touched.numberOfPropertyDemisesWithinGroup && <Alert severity="warning">{formik.errors.numberOfPropertyDemisesWithinGroup}</Alert>}

                    <input
                        id="numberOfPropertyDemisesWithinGroup"
                        className="loginInputs"
                        variant="standard"
                        type={"text"}
                        name="numberOfPropertyDemisesWithinGroup"
                        value={formik.values.numberOfPropertyDemisesWithinGroup}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />

                    <h3 className="inputBlockHeading">Previous Data (in our DB)</h3>

                    <label className="loginLable">Name</label>

                    <div className="loginInputs dataFromDb">
                        {`XXXXXXXXXXXX`}
                    </div>

                    <label className="loginLable">Phone</label>


                    <div className=" phoneNumberAndOTPButtonContainer loginInputs dataFromDb">

                        <div className="selectCountryCode dataFromDb">
                            {`+33  `}
                        </div>

                        <div className="phoneNumberInput" style={{ marginLeft: '.5rem' }}>
                            {`XXXXXXXXXXXX`}
                        </div>
                    </div>

                    <label className="loginLable">Email</label>

                    <div className="loginInputs dataFromDb">
                        {`XXXXXXXXXXXX`}
                    </div>

                    <h3 className="inputBlockHeading">Bank Details for profit sharing</h3>

                    <label className="loginLable" htmlFor="bankName">Bank Name</label>

                    {formik.errors.bankName && formik.touched.bankName && <Alert severity="warning">{formik.errors.bankName}</Alert>}

                    <input
                        id="bankName"
                        className="loginInputs"
                        variant="standard"
                        type={"text"}
                        name="bankName"
                        value={formik.values.bankName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="ie. MayBank" />

                    <label className="loginLable" htmlFor="bankAccountNumber">Bank Account Number</label>

                    {formik.errors.bankAccountNumber && formik.touched.bankAccountNumber && <Alert severity="warning">{formik.errors.bankAccountNumber}</Alert>}

                    <input
                        id="bankAccountNumber"
                        className="loginInputs"
                        variant="standard"
                        type={"text"}
                        name="bankAccountNumber"
                        value={formik.values.bankAccountNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="ie. XXXXXXXXXXX" />

                    <label className="loginLable" htmlFor="bankAccountName">Bank Account Name</label>

                    {formik.errors.bankAccountName && formik.touched.bankAccountName && <Alert severity="warning">{formik.errors.bankAccountName}</Alert>}

                    <input
                        id="bankAccountName"
                        className="loginInputs"
                        variant="standard"
                        type={"text"}
                        name="bankAccountName"
                        value={formik.values.bankAccountName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="ie. XXXXX sdn bhd" />

                    <div className='doubleInputBoxInLine'>

                        <div className='displayFlexColumn'>
                            <button
                                onClick={() => setStatusType("APPROVED")}
                                type='submit'
                                className="loginInputHalfWidth buttonHalf approveButton">
                                Approve
                            </button>
                        </div>

                        <div className='displayFlexColumnTwo'>
                            <button
                                onClick={() => setStatusType("REJECTED")}
                                type='submit'
                                className="loginInputHalfWidth buttonHalf rejectButton">
                                Reject
                            </button>
                        </div>

                    </div>
                    {/* <Button className="submitButton" type="Submit" variant="contained">Submit</Button> */}
                </form>

            </Paper>
        </>
    )
}
