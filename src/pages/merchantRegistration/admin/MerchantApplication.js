import React, { useEffect } from 'react'
// import Typography from '@mui/material/Typography';
import { Button } from '@material-ui/core';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState } from "react";
import { Paper } from '@material-ui/core';
// import { useNavigate } from 'react-router-dom';
// import axios from '../../../api/axios';
// import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './../../operatorRegistration/Operator.css'
import './../../operatorRegistration/admin/OperatorAdmin.css'
import Navbar from '../../../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { authAxios } from '../../../services/auth.service';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(operator, submissionDate, key) {
    return { operator, submissionDate, key };
}

const rows = [
    createData('ABC Condo', 'XX-XX-XXXX', 1),
    createData('ABC Condo', 'XX-XX-XXXX', 2),
];

export default function HomeFoodAdmin() {
    const [buttonStyleOne, setButtonStyleOne] = useState(false);
    const [buttonStyleTwo, setButtonStyleTwo] = useState(true);
    const [newMerchants, setNewMerchants] = useState([])
    const [processedMerchants, setProcessedMerchants] = useState([])

    const { condo } = useParams()
    const navigate = useNavigate()

    const buttonStyleHandlerOne = () => {
        setButtonStyleTwo(false)
        setButtonStyleOne(true)
    }
    const buttonStyleHandlerTwo = () => {
        setButtonStyleTwo(true)
        setButtonStyleOne(false)
    }

    const paper = {
        padding: '1.25rem',
        height: '100vh'
    }

    const handleGetNewMerchants = async () => {
        try {
            const { data: { data } } = await authAxios.get("merchant/list/status?status=NEW")
            setNewMerchants(data)
            console.log(data)
        } catch (error) {
            console.log("Error : " + error)
        }
    }

    const handleGetProcessedMerchants = async () => {
        try {
            const { data: { data } } = await authAxios.get("merchant/list/status?status=PROCESSED")
            setProcessedMerchants(data)
            console.log(data)
        } catch (error) {
            console.log("Error : " + error)
        }
    }

    useEffect(() => {
        buttonStyleOne && handleGetNewMerchants()
        buttonStyleTwo && handleGetProcessedMerchants()
    }, [buttonStyleOne, buttonStyleTwo])


    return (
        <>
            <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>

                <Navbar title={'Merchant Application'} backButtonPath={`/admin/operator/${condo}`} />

                <ButtonGroup className="doubleButton" sx={{ marginBottom: '1rem' }}>
                    <Button className={buttonStyleOne ? 'doubleActiveButtonAdminPanel' : 'doubleButtonAdminPanel'} onClick={() => buttonStyleHandlerOne()}>New</Button>
                    <Button className={buttonStyleTwo ? 'doubleActiveButtonAdminPanel' : 'doubleButtonAdminPanel'} onClick={() => buttonStyleHandlerTwo()}>Processed</Button>
                </ButtonGroup>

                {buttonStyleOne ? <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow className='headingTableRow'>
                                <StyledTableCell className='tableHeadingCell'>Business Name</StyledTableCell>
                                <StyledTableCell className='tableHeadingCell' align="right">Date</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {newMerchants?.map((merch, index) => (
                                <StyledTableRow
                                    onClick={() => navigate(`/admin/merchant-registration-new`)}
                                    key={index}
                                    className='bodyTableRow'>
                                    <StyledTableCell scope="row" className='tableBodyCell'>
                                        {merch.businessName}
                                    </StyledTableCell>
                                    <StyledTableCell align="right" className='tableBodyCell'>
                                        {merch.createdOn.slice(0, 10)}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> : null}
                {buttonStyleTwo ? <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow className='headingTableRow'>
                                <StyledTableCell className='tableHeadingCell'>Business Name</StyledTableCell>
                                <StyledTableCell className='tableHeadingCell' align="right">Date</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {processedMerchants?.map((merch, index) => (
                                <StyledTableRow
                                    onClick={() => navigate(`/admin/merchant-registration-processed`)}
                                    key={index}
                                    className='bodyTableRow'>
                                    <StyledTableCell scope="row" className='tableBodyCell'>
                                        {merch.businessName}
                                    </StyledTableCell>
                                    <StyledTableCell align="right" className='tableBodyCell'>
                                        {merch.createdOn.slice(0, 10)}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> : null}
            </Paper>
        </>
    )
}
