import { Box, Paper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useFormik } from 'formik';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from '../../components/Navbar';
import { authAxios } from '../../services/auth.service';
import createAdminValidationSchema from '../../validations/createAdminValidationSchema';
import Typography from '@mui/material/Typography';

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

export default function CreateAdmin() {

    const navigate = useNavigate();
    const [saveAdmin, setSaveAdmin] = useState(false);
    const [deleteAdmin, setDeleteAdmin] = useState(false);
    const [adminData, setAdminData] = useState({});

    const formik = useFormik({
        initialValues: {
            mobileNumber: adminData.mobileNumber ? adminData.mobileNumber : '',
            countryCodeId: adminData.countryCodeId ? adminData.countryCodeId : '',
        },
        validationSchema: createAdminValidationSchema,
        onSubmit: (values) => handleSubmit(values)
    });

    const notify = () => {
        toast.success("Admin Created!", {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    const getAdminData = async () => {
        try {
            const { data: { data } } = await authAxios.get(`admin/admin/{id}`)
            console.log(data);
            setAdminData(data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (values) => {
        console.log('data', values);
        if (saveAdmin) {
            console.log('saveAdmin');
            try {
                const response = await authAxios.post('admin/register/admin', values);
                console.log(response);
                notify();
                setTimeout(() => {
                    navigate("/admin/grand-admin");
                }, 4000)
            } catch (err) {
                toast.error(err?.response?.data?.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                console.log(err?.response?.data);
            }
            setTimeout(() => {
                setSaveAdmin(false);
            }, 1000);
        }
        if (deleteAdmin) {
            console.log('deleteAdmin');
            try {
                const response = await authAxios.delete(`admin/admin/{id}`, values);
                console.log(response);
                notify();
                setTimeout(() => {
                    navigate("/admin/grand-admin");
                }, 4000);
            } catch (err) {
                toast.error(err?.response?.data?.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                console.log(err?.response?.data);
            }
            setTimeout(() => {
                setDeleteAdmin(false);
            }, 1000);
        }
    };

    const paper = {
        padding: '1.25rem',
        minHeight: '100vh',
    };

    useEffect((() => {
        getAdminData()
    }), [])

    return (
        <>
            <Paper elevation={10} style={paper}>
                <Navbar title={'Create Admin'} backButtonPath={'/admin/grand-admin'} />
                <ToastContainer />
                <form onSubmit={formik.handleSubmit}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '86vh',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                border: '1px solid #D1D1D1',
                                borderRadius: '18px',
                                p: 1,
                            }}
                        >
                            <Box>
                                <label className="loginLable" htmlFor="mobileNumber">Mobile</label>

                                {(formik.touched.countryCodeId && formik.errors.countryCodeId) || (formik.touched.mobileNumber && formik.errors.mobileNumber) ? <Alert severity="warning">{formik.errors.mobileNumber} {formik.errors.countryCodeId}</Alert> : null}

                                <div className="loginInputs phoneNumberAndOTPButtonContainer">

                                    <select className="selectCountryCode" value={formik.values.countryCodeId} onChange={formik.handleChange} name="countryCodeId" onBlur={formik.handleBlur} >
                                        {countriesCode.map((option) => (
                                            <option key={option.id} value={option.code}>{option.code}</option>
                                        ))}
                                    </select>

                                    <input id="mobileNumber" className="phoneNumberInput" placeholder="XXXXXXXXXXXX" variant="standard"
                                        type={"tel"} name="mobileNumber" value={formik.values.mobileNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                </div>


                                <Box className="loginLable" htmlFor="name">Name</Box>

                                <Box className="loginInputs">{''}</Box>
                            </Box>
                        </Box>
                        <div className='doubleInputBoxInLine'>

                            <div className='displayFlexColumn'>
                                <button
                                    name='save'
                                    onClick={() => setSaveAdmin(true)}
                                    className="loginInputHalfWidth buttonHalf approveButton" type='submit' >
                                    Save
                                </button>
                            </div>

                            <div className='displayFlexColumnTwo'>
                                <button
                                    name='delete'
                                    onClick={() => setDeleteAdmin(true)}
                                    className="loginInputHalfWidth buttonHalf rejectButton" type='submit' >
                                    Delete
                                </button>
                            </div>

                        </div>
                    </Box>
                </form>
            </Paper>
        </>
    )
}
