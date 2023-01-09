import React, { useState } from 'react'
import { Button, Paper } from '@material-ui/core'
import Navbar from '../../components/Navbar';
import ButtonGroup from '@mui/material/ButtonGroup';
import './MerchantRunner.css'
import MerchantRunnerCardExisting from '../../components/MerchantRunnerCardExisting';
import MerchantRunnerCardNew from '../../components/MerchantRunnerCardNew';
import MerchantRunnerCardRemoved from '../../components/MerchantRunnerCardRemoved';
import { authAxios } from '../../services/auth.service';
import { useEffect } from 'react';


export default function MerchantRunner() {

  const [isActive, setIsActive] = useState(true);
  const [buttonStyleOne, setButtonStyleOne] = useState(false);
  const [buttonStyleTwo, setButtonStyleTwo] = useState(true);
  const [buttonStyleThree, setButtonStyleThree] = useState(false);

  const [existingMerchants, setExistingMerchants] = useState([])
  const [newMerchantApplication, setNewMerchantApplication] = useState([])
  const [rejectedMerchants, setRejectedMerchants] = useState([])
  const [toggle, setToggle] = useState(false)

  const buttonStyleHandlerOne = () => {
    setButtonStyleTwo(false)
    setButtonStyleOne(true)
    setButtonStyleThree(false)
  }
  const buttonStyleHandlerTwo = () => {
    setButtonStyleTwo(true)
    setButtonStyleOne(false)
    setButtonStyleThree(false)
  }
  const buttonStyleHandlerThree = () => {
    setButtonStyleTwo(false)
    setButtonStyleOne(false)
    setButtonStyleThree(true)
  }

  // const userId = localStorage.getItem("userId")

  const paper = {
    padding: '1.25rem',
    minHeight: '100vh'
  }
  const handleClick = event => {
    setIsActive(current => !current);
  };

  const getExistingMerchants = async () => {
    try {
      const { data: { data } } = await authAxios.get("runner/getAllRunnerByStatus?status=APPROVED")
      // const { data: { data } } = await authAxios.get(`runner/merchant/${userId}?status=APPROVED`)
      setExistingMerchants(data)
      console.log(data)
    } catch (error) {
      console.log("Error : " + error)
    }
  }


  const getNewMerchantApplication = async () => {
    try {
      const { data: { data } } = await authAxios.get("runner/getAllRunnerByStatus?status=NEW")
      // const { data: { data } } = await authAxios.get(`runner/merchant/${userId}?status=NEW`)
      setNewMerchantApplication(data)
      console.log(data)
    } catch (error) {
      console.log("Error : " + error)
    }
  }

  const getRejectedMerchantApplicatios = async () => {
    try {
      const { data: { data } } = await authAxios.get("runner/getAllRunnerByStatus?status=REJECTED")
      // const { data: { data } } = await authAxios.get(`runner/merchant/${userId}?status=REJECTED`)
      setRejectedMerchants(data)
      console.log(data)
    } catch (error) {
      console.log("Error : " + error)
    }
  }

  const approveRunner = async (runnerId) => {
    try {
      const { data: { data } } = await authAxios.put(`runner/updateStatus/${runnerId}?status=APPROVED`)
      setToggle(!toggle)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const rejectRunner = async (runnerId) => {
    try {
      const { data: { data } } = await authAxios.put(`runner/updateStatus/${runnerId}?status=REJECTED`)
      setToggle(!toggle)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    buttonStyleOne && getExistingMerchants()
    buttonStyleTwo && getNewMerchantApplication()
    buttonStyleThree && getRejectedMerchantApplicatios()
  }, [buttonStyleOne, buttonStyleTwo, buttonStyleThree, toggle])


  return (
    <>
      <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>
        <Navbar title={'Merchant Runner'} backButtonPath={'/merchant/merchant-app'} />
        <div className='twoButtonWithGropWithThird twoButtonGroupFull'>
          <Button className={isActive ? 'doubleButtonInActive' : 'doubleButtonActiveOnline'} onClick={handleClick}>Online</Button>
          <Button className={isActive ? 'doubleButtonActive' : 'doubleButtonInActive'} onClick={handleClick}>Offline</Button>
        </div>
        <ButtonGroup className="doubleButton" sx={{ marginBottom: '1rem' }}>
          <Button className={buttonStyleOne ? 'activeButtonAdminPanel' : 'tripleButtonAdminPanel'} onClick={() => buttonStyleHandlerOne()}>Existing</Button>
          <Button className={buttonStyleTwo ? 'activeButtonAdminPanel' : 'tripleButtonAdminPanel'} onClick={() => buttonStyleHandlerTwo()}>Applicant</Button>
          <Button className={buttonStyleThree ? 'activeButtonAdminPanel' : 'tripleButtonAdminPanel'} onClick={() => buttonStyleHandlerThree()}>Removed</Button>
        </ButtonGroup>

        {buttonStyleOne
          ? <div>
            {existingMerchants.map((runner, key) => {
              return <MerchantRunnerCardExisting rejectRunner={rejectRunner} key={key} name={runner?.user?.name} email={runner?.user?.email} resident={runner.unitAddress} phoneNumber={runner?.user?.mobileNumber} id={runner.id} status={runner.statusIs} />
            })}
          </div>
          : null}
        {buttonStyleTwo
          ?
          <div>
            {newMerchantApplication.map((runner, key) => {
              return <MerchantRunnerCardNew approveRunner={approveRunner} rejectRunner={rejectRunner} key={key} name={runner?.user?.name} email={runner?.user?.email} resident={runner.unitAddress} phoneNumber={runner?.user?.mobileNumber} id={runner.id} />
            })}
          </div>
          : null}
        {buttonStyleThree
          ? <div>
            {rejectedMerchants.map((runner, key) => {
              return <MerchantRunnerCardRemoved approveRunner={approveRunner} key={key} name={runner?.user?.name} email={runner?.user?.email} resident={runner.unitAddress} phoneNumber={runner?.user?.mobileNumber} id={runner.id} />
            })}
          </div>
          : null}
      </Paper>
    </>
  )
}