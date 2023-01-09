import React from 'react'
import Navbar from '../../components/Navbar'
import { Paper } from '@material-ui/core';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useState } from "react";
import './../operatorRegistration/Operator.css'
import {
  Alert,
} from '@material-ui/lab'
import { useEffect } from 'react';
import { Button } from '@material-ui/core'

import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '../../images/infoIcon/infoIcon1.svg'
import './RunnerRegistration.css'
import { authAxios } from '../../services/auth.service';
import { useFormik } from 'formik';
import runnerRegistrationValidationSchema from '../../validations/runnerRegistrationValidationSchema';
// import SearchBarMerchantList from '../../components/SearchBarMerchantList';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box } from '@mui/system';
import { toast } from 'react-toastify';
import ToastNotify from '../../Notify/ToastNotify';
import SearchPanal from '../../components/SearchPanal';
import runnerRegMerchBossValSchema from '../../validations/runnerRegMerchBossValSchema';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RunnerRegistration() {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const paper = {
    padding: '1.25rem',
    minHeight: '100vh',
  }

  const [approvedMerchants, setApprovedMerchants] = useState([])
  const [merchantList, setMerchantList] = useState([]);
  const [residentAddressBar, setResidentAddressBar] = useState(false)

  const [selectAllToggle, setSelectAllToggle] = useState(true)

  const [isAcceptTandC, setIsAcceptTandC] = useState(false)

  const [isDisable, setisDisable] = useState(false)

  const [toggle, setToggle] = useState(true);

  const [optionData, setOptionData] = useState([])
  const [selectedOptions, setSelectedOptions] = useState({})

  const notify = () => toast.info("Submission has been sent. The respective admin will contact you soon.");


  const selectAllMerchants = () => {
    const allMerch = [...merchantList]
    allMerch.map(item => item.isSelected = selectAllToggle ? true : false)
    setMerchantList(allMerch)
    selectAllToggle && allMerch.map(item => item = { id: item.id })
    console.log(allMerch)
    setSelectAllToggle(pre => !pre)
  }

  const selectFun = (index) => {
    const array = [...merchantList]
    if (array[index].isSelected) {
      array[index].isSelected = false
    } else {
      array[index].isSelected = true
    }
    setMerchantList(array)
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      runnersBoss: 'Operator',
      isResident: false,
      unitAddress: '',
      operatorId: selectedOptions?.id ? selectedOptions?.id : 0,
      merchantId: selectedOptions?.id ? selectedOptions?.id : '',
      operatorName: '',
      operatorMerchantId: [],

      bankDetails: {
        bankName: '',
        accountHolderName: '',
        accountNumber: ''
      }
    },

    validationSchema: toggle ? runnerRegistrationValidationSchema : runnerRegMerchBossValSchema,

    onSubmit: (values) => {
      console.log(values)
      // const result = operatorList.filter(item => item.residentGroupName === values.operatorName)

      const arr = []
      merchantList?.map(item => item.isSelected && arr.push(item.id))

      console.log(arr)
      toggle
        ? !isAcceptTandC
          ? console.log("Please accept terms and condition!")
          : handleSubmit({ ...values, operatorMerchantId: arr })
        : handleSubmit({ merchantId: values.merchantId, runnersBoss: "Merchant" })
    }
  });

  const navigateToAnyWhere = (path) => {
    navigate(`${path}`);
  };

  const handleSubmit = async (values) => {
    console.log("vals : " + values.runnersBoss + values.merchantId);
    try {

      setisDisable(true)

      const { data } = await authAxios.post('runner/register', values)
      notify()
      console.log(data);

      setTimeout(() => {
        setisDisable(false)
        navigate('/');
      }, 4000);

    } catch (err) {

      toast.error(err?.response?.data?.message);
      setisDisable(false)
      console.log(err?.response?.data);

    }
  }

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

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const lableStyle = {
    backGroundColor: '#FFFFFF',
  }

  console.log(formik.values.runnersBoss)
  useEffect(() => {

    const handleGetMerchentList = async () => {
      console.log("hello operator ", formik.values.operatorId)
      try {

        const { data: { data } } = await authAxios.get(`operator-merchant/allMerchants/${formik.values.operatorId}/?status=NEW`)

        setMerchantList(data)
        console.log(data);

      } catch (error) {

        console.log(error?.response?.data);

      }
    }

    const getApprovedMerchants = async () => {
      console.log("hello operator ", formik.values.merchantId)
      try {

        const { data: { data } } = await authAxios.get(`merchant/list/status?status=NEW`)
        // const { data: { data } } = await authAxios.get(`merchant/list/status?status=APPROVED`)
        //  We will use this line

        setApprovedMerchants(data)
        console.log(data);

      } catch (error) {

        console.log(error?.response?.data);

      }
    }

    !toggle && getApprovedMerchants()
    toggle && getOperatorList();
    toggle && handleGetMerchentList();
  }, [formik.values.operatorId, toggle])

  let textStyle = {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '18px',
    color: '#202020',
    textAlign: 'center',
    marginBottom: '.5rem'
  }
  let headingStyle = {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '21px',
    color: '#202020',
    textAlign: 'center'
  }
  let topHeadingStyle = {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: '21px',
    color: '#202020',
    textAlign: 'center',
  }
  let closeBtn = {
    width: '117px',
    height: '32px',
    background: '#35498E',
    border: '1px solid #35498E',
    borderRadius: '15px',
    color: '#FFFFFF',
    textTransform: 'capitalize'
  }

  return (
    <>
      <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>
        <Navbar title={'Runner Registration'} backButtonPath={'/'} />

        <form onSubmit={formik.handleSubmit} className="displayflexColumn90VH">
          <div>


            <div className='displayFlexRow'>

              <FormLabel htmlFor='runnersBoss' className='headingOfRadioButoonAndLable' >Choose Your Boss</FormLabel>

              <div className="containerInfoIcon" onClick={handleClickOpen}>
                <img src={InfoIcon} alt='Info Icon' className="infoIcon" />
              </div>

            </div>

            {formik.touched.runnersBoss && formik.errors.runnersBoss ? <Alert severity="warning">{formik.errors.runnersBoss}</Alert> : null}

            <RadioGroup
              row
              id='runnersBoss'
              name="runnersBoss"
              style={{ margin: '8px' }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.runnersBoss}
              aria-labelledby="runnerBoss"
              defaultValue="Operator" >

              <FormControlLabel onClick={() => setToggle(true)} value={"Operator"}
                className='radioButtonWithLable' control={<Radio />} label="Operator" labelPlacement="end" />

              <FormControlLabel onClick={() => setToggle(false)} value={"Merchant"} className='radioButtonWithLable' control={<Radio />} label="Merchant" labelPlacement="end" />

            </RadioGroup>

            {toggle
              ?
              <div style={{ marginTop: '10px', marginBottom: '10px' }}><label className="lableOfRunnerRegistration" htmlFor="operatorName">Choose A Operator</label>

                {formik.touched.operatorName && formik.errors.operatorName ? <Alert severity="warning">{formik.errors.operatorName}</Alert> : null}

                <div className='displayFlexRow'>

                  <div className="operatorListBar">
                    <SearchPanal
                      className="operatorListBar"
                      optionData={optionData}
                      setSelectedOptions={setSelectedOptions} />

                  </div>

                  <Button className="locationButton" variant="contained" onClick={() => navigateToAnyWhere('/operator/location')}>Location</Button>

                </div>

                <FormLabel id="isResident" className='headingOfRadioButoonAndLable' >Are you a resident</FormLabel>

                {/* {formik.touched.residentGroupName && formik.errors.residentGroupName ? <Alert severity="warning">{formik.errors.residentGroupName}</Alert> : null} */}

                <RadioGroup
                  row
                  aria-labelledby="isResident"
                  name="isResident"
                  style={{ margin: '8px' }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.isResident}
                >
                  <FormControlLabel onClick={() => setResidentAddressBar(true)} value={true} className='radioButtonWithLable' control={<Radio />} label="Yes" labelPlacement="end" />

                  <FormControlLabel onClick={() => setResidentAddressBar(false)} value={false} className='radioButtonWithLable' control={<Radio />} label="No" labelPlacement="end" />

                </RadioGroup>

                {formik.touched.isResident && formik.errors.isResident ? <Alert severity="warning">{formik.errors.residentGroupName}</Alert> : null}

                {
                  residentAddressBar &&
                  <input
                    id="unitAddress"
                    className="loginInputs"
                    variant="standard"
                    type={"text"}
                    name="unitAddress"
                    placeholder="Enter residential address"
                    value={formik.values.unitAddress}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                }


                <h3 className="inputBlockHeading">Delivery Fee Payout Account</h3>

                <label className="lableOfRunnerRegistration" htmlFor="bankName">Your Bank Name</label>

                {formik.touched.bankDetails?.bankName && formik.errors.bankDetails?.bankName ? <Alert severity="warning">{formik.errors.bankDetails?.bankName}</Alert> : null}

                <input id="bankName" className="loginInputs" variant="standard" type={"text"} name="bankDetails.bankName"
                  placeholder="ie. MayBank"
                  value={formik.values.bankDetails.bankName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />


                <label className="lableOfRunnerRegistration" htmlFor="accountHolderName">Your Account Name</label>

                {formik.touched.bankDetails?.accountHolderName && formik.errors.bankDetails?.accountHolderName ? <Alert severity="warning">{formik.errors.bankDetails?.accountHolderName}</Alert> : null}

                <input id="accountHolderName" className="loginInputs" variant="standard" type={"text"} name="bankDetails.accountHolderName"
                  value={formik.values.bankDetails.accountHolderName}
                  onChange={formik.handleChange} placeholder="ie. XXXXX sdn bhd"
                  onBlur={formik.handleBlur} />


                <label className="lableOfRunnerRegistration" htmlFor="accountNumber">Your Account Number</label>

                {formik.touched.bankDetails?.accountNumber && formik.errors.bankDetails?.accountNumber ? <Alert severity="warning">{formik.errors.bankDetails?.accountNumber}</Alert> : null}

                <input id="accountNumber" className="loginInputs" variant="standard"
                  type={"text"} name="bankDetails.accountNumber"
                  value={formik.values.bankDetails.accountNumber}
                  onChange={formik.handleChange} placeholder="ie. XXXXXXXXXXX"
                  onBlur={formik.handleBlur} />



                <div className='displayFlexRow'>

                  <label className="lableOfRunnerRegistration" htmlFor="residentGroupType">Which merchant to service?</label>

                  <Button
                    style={{
                      marginTop: '10px',
                      marginBottom: '10px',
                      paddingTop: '15px',
                      paddingBottom: '15px',
                    }}
                    onClick={selectAllMerchants}
                    className="selectAllMerchantButton"
                    variant="contained">
                    Select All
                  </Button>

                </div>

                {
                  merchantList?.map((restaurent, index) => <div key={index}
                    onClick={() => selectFun(index)}

                    className={restaurent?.isSelected ? 'restourentContainerSelected' : 'restourentContainer'}
                  >
                    <div className='restourentName'>{restaurent.businessName}</div>

                    <Button className="locationButton" variant="contained"
                      onClick={() => {
                        navigateToAnyWhere(`/operator/location/${restaurent.id}`)
                      }}>Location</Button>

                  </div>)
                }

                <div className='displayFlexRowFlexStart' style={{ marginTop: 10, marginBottom: 10 }} >

                  <Checkbox {...label} style={lableStyle} name="agree" onClick={(e) => setIsAcceptTandC(!isAcceptTandC)} />

                  <label className='checkboxLableRunnerRegistration' style={{ height: 'auto' }}>I understand there is a platform fee of 15% applies to the delivery fee i have earned.</label>

                </div>


              </div>
              :
              <div>
                <label className="lableOfRunnerRegistration" htmlFor="merchantName">Choose A Merchant</label>

                {formik.touched.MerchantId && formik.errors.MerchantId ? <Alert severity="warning">{formik.errors.MerchantId}</Alert> : null}

                {/* <SearchBarMerchantList id='merchantName' value={formik.values.merchantName} name={'merchantName'} placeholder="ABC Restaurent" data={merchantList} onChange={formik.handleChange} onBlur={formik.handleBlur} /> */}

                <SearchPanal listType={"merchant"} name="MerchantId" onBlur={formik.handleBlur} optionData={approvedMerchants} setSelectedOptions={setSelectedOptions} />

                <div className='displayFlexRow'>
                  <Button className="locationButton" style={{ width: '100%' }} variant="contained" onClick={() => navigateToAnyWhere('/op')}>Location</Button>

                </div>
              </div>}
          </div>

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

        <Dialog
          PaperProps={{
            style: { borderRadius: 24 }
          }}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
        >
          <DialogTitle style={topHeadingStyle}>{"Choose Your Boss"}</DialogTitle>
          <DialogTitle style={headingStyle}>{"Operator"}</DialogTitle>

          <DialogContent>

            <DialogContentText style={textStyle}>
              This is a registration form applying to become a runner for an operator who manages a group of residents.
            </DialogContentText>
            <DialogContentText style={textStyle}>
              This option is usually to be chosen by residents who live here. Non-resident can also apply if the operator approves.
            </DialogContentText>
            <DialogContentText style={textStyle}>
              Once a delivery job has been completed, a delivery fee will be awarded.
            </DialogContentText>

          </DialogContent>

          <DialogTitle style={headingStyle}>{"Merchant"}</DialogTitle>

          <DialogContent>

            <DialogContentText style={textStyle}>
              This is a registration form applying to become a merchant runner. The merchant will decide where to deliver.
            </DialogContentText>
            <DialogContentText style={textStyle}> Remuneration packages are entirely between the merchant and the runner negotiated offline.
            </DialogContentText>

          </DialogContent>

          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '2rem',
            borderRadius: '24px'
          }}>

            <Button onClick={handleClose} style={{ ...headingStyle, ...closeBtn }}>Close</Button>

          </Box>

        </Dialog>

      </Paper>
    </>
  )
}
