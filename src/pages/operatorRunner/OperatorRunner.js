import React from 'react'
import { Button } from '@material-ui/core';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState } from "react";
import Navbar from '../../components/Navbar'
import { Paper } from '@material-ui/core';
import './../mrLajuAdmin/MrLajuAdmin.css'
import './OperatorRunner.css'
import OperatorRunnerCardExisting from '../../components/OperatorRunnerCardExisting';
import OperatorRunnerCardNew from '../../components/OperatorRunnerCardNew';
import OperatorRunnerCardRemoved from '../../components/OperatorRunnerCardRemoved';
import { authAxios } from '../../services/auth.service';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function createData(name, email, resident, phoneNumber, etc, statusIs) {
    return { name, email, resident, phoneNumber, etc, statusIs };
}

const existing = [
    createData('XXXXXX', 'XXXXXX', 'Unit XXXXXX / Non resident', 'XXXXXXXXXXX', {}, 'Online'),
    createData('YYYYYY', 'YYYYYY', 'Unit YYYYYY / Non resident', 'YYYYYYYYYYY', {}, 'Offline'),
];
const applicant = [
    createData('XXXXXX', 'XXXXXX', 'Unit XXXXXX / Non resident', 'XXXXXXXXXXX', {}),
];
const removed = [
    createData('XXXXXX', 'XXXXXX', 'Unit XXXXXX / Non resident', 'XXXXXXXXXXX', {}),
    createData('YYYYYY', 'YYYYYY', 'Unit YYYYYY / Non resident', 'YYYYYYYYYYY', {}),
];

export default function OperatorRunner() {
    const [buttonStyleOne, setButtonStyleOne] = useState(false);
    const [buttonStyleTwo, setButtonStyleTwo] = useState(true);
    const [buttonStyleThree, setButtonStyleThree] = useState(false);

    const [existingRunners, setExistingRunners] = useState([])
    const [newRunnerApplications, setNewRunnerApplications] = useState([])
    const [rejectedRunners, setRejectedRunners] = useState([])

    const [toggle, setToggle] = useState(false);
    const { condo } = useParams();

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

    const paper = {
        padding: '1.25rem',
        minHeight: '100vh'
    }

    const operatorId = localStorage.getItem("operatorId")

    const getExistingRunnner = async () => {
        try {
            const { data: { data } } = await authAxios.get(`runner/operator/${operatorId}?status=APPROVED`)
            setExistingRunners(data)
            console.log(data)
        } catch (error) {
            console.log("Error : " + error)
        }
    }

    const getRunnerApplications = async () => {
        try {
            console.log("first", operatorId)
            const { data: { data } } = await authAxios.get(`runner/operator/${operatorId}?status=NEW`)
            setNewRunnerApplications(data)
            console.log(data)
        } catch (error) {
            console.log("Error : " + error)
        }
    }

    const getRejectedRunners = async () => {
        try {
            const { data: { data } } = await authAxios.get(`runner/operator/${operatorId}?status=REJECTED`)
            setRejectedRunners(data)
            console.log(data)
        } catch (error) {
            console.log("Error : " + error)
        }
    }

    useEffect(() => {
        buttonStyleOne && getExistingRunnner()
        buttonStyleTwo && getRunnerApplications()
        buttonStyleThree && getRejectedRunners()
    }, [buttonStyleOne, buttonStyleTwo, buttonStyleThree, toggle])


    return (
        <>
            <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>
                <Navbar title={'Operator Runner'} backButtonPath={`/admin/operator/${condo}`} />                <ButtonGroup className="doubleButton" sx={{ marginBottom: '1rem' }}>
                    <Button className={buttonStyleOne ? 'activeButtonAdminPanel' : 'tripleButtonAdminPanel'} onClick={() => buttonStyleHandlerOne()}>Existing</Button>
                    <Button className={buttonStyleTwo ? 'activeButtonAdminPanel' : 'tripleButtonAdminPanel'} onClick={() => buttonStyleHandlerTwo()}>Applicant</Button>
                    <Button className={buttonStyleThree ? 'activeButtonAdminPanel' : 'tripleButtonAdminPanel'} onClick={() => buttonStyleHandlerThree()}>Removed</Button>
                </ButtonGroup>

                {buttonStyleOne
                    ? <div>
                        {existingRunners?.map((ele, key) => {
                            return <OperatorRunnerCardExisting setToggle={setToggle} id={ele.id} unitAddress={ele.unitAddress} key={key} name={ele.name} email={ele.email} resident={ele.resident} phoneNumber={ele.phoneNumber} etc={ele.etc} status={ele.statusIs} />
                        })}
                    </div>
                    : null}
                {buttonStyleTwo
                    ?
                    <div>
                        {newRunnerApplications?.map((ele, key) => {
                            return <OperatorRunnerCardNew setToggle={setToggle} unitAddress={ele.unitAddress} key={key} id={ele.id} name={ele.user.name} email={ele.user.email} resident={ele.resident} phoneNumber={ele.user.mobileNumber} etc={ele.etc} />
                        })}
                        <p className='bankWarning'>
                            Bank details must be filled up to approve
                        </p>
                    </div>
                    : null}
                {buttonStyleThree
                    ? <div>
                        {rejectedRunners?.map((ele, key) => {
                            return <OperatorRunnerCardRemoved setToggle={setToggle} id={ele.id} key={key} name={ele.name} email={ele.email} resident={ele.resident} phoneNumber={ele.phoneNumber} etc={ele.etc} />
                        })}
                    </div>
                    : null}
            </Paper>
        </>
    )
}