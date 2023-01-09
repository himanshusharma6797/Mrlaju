import React, { useEffect } from 'react'
import { Button } from '@material-ui/core';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState } from "react";
import Navbar from '../../components/Navbar'
import { Paper } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconPlus from './../../images/addIcon/icons8-plus-white.svg'
import './MrLajuAdmin.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { authAxios } from '../../services/auth.service';

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


export default function MrLajuAdmin() {
    const [buttonStyleOne, setButtonStyleOne] = useState(false);
    const [buttonStyleTwo, setButtonStyleTwo] = useState(true);
    const [buttonStyleThree, setButtonStyleThree] = useState(false);
    const [newSubmissionsData, setNewSubmissionsData] = useState([])
    const [rejectedOperators, setrejectedOperators] = useState([])
    const [addedOperators, setAddedOperators] = useState([])

    const navigate = useNavigate()

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

    const getAllNewSubmissions = async () => {
        try {
            const { data: { data } } = await authAxios("operator/list/status?status=NEW")
            console.log(data);
            setNewSubmissionsData(data)
        } catch (error) {
            console.log("Error : " + error);
        }
    }

    const getAllRejectedsOperator = async () => {
        try {
            const { data: { data } } = await authAxios("operator/list/status?status=REJECTED")
            setrejectedOperators(data)
            console.log(data)
        } catch (error) {
            console.log("Error : " + error);
        }
    }

    const getAddedOperators = async () => {
        try {
            const { data: { data } } = await authAxios("operator/list/status?status=APPROVED")
            setAddedOperators(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const showNewOperatorData = (operatorId, migrateStutus) => {
        console.log(operatorId, migrateStutus)
        migrateStutus
            ? navigate(`/admin/operator-registration/migrate-account/${operatorId}`)
            : navigate(`/admin/operator-registration/new-account/${operatorId}`)
    }

    const showRejOperatorData = (operatorId) => {
        navigate(`/admin/operator-registration/migrate-account/rejected/${operatorId}`)
    }

    useEffect(() => {
        buttonStyleOne && getAddedOperators()
        buttonStyleTwo && getAllNewSubmissions()
        buttonStyleThree && getAllRejectedsOperator()
    }, [buttonStyleOne, buttonStyleTwo, buttonStyleThree])


    return (
        <>
            <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>
                <Navbar title={'Mr Laju Admin'} backButtonPath={'/'} />
                <ButtonGroup className="doubleButton" sx={{ marginBottom: '1rem' }}>
                    <Button className={buttonStyleOne ? 'activeButtonAdminPanel' : 'tripleButtonAdminPanel'} onClick={() => buttonStyleHandlerOne()}>Operator Added</Button>
                    <Button className={buttonStyleTwo ? 'activeButtonAdminPanel' : 'tripleButtonAdminPanel'} onClick={() => buttonStyleHandlerTwo()}>New Submission</Button>
                    <Button className={buttonStyleThree ? 'activeButtonAdminPanel' : 'tripleButtonAdminPanel'} onClick={() => buttonStyleHandlerThree()}>Rejected</Button>
                </ButtonGroup>

                {buttonStyleOne ? <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow className='headingTableRow displayFlexRowJCSB'>
                                <StyledTableCell className='tableHeadingCell'>Operator</StyledTableCell>
                                <StyledTableCell className='tableHeadingCell' align="center"></StyledTableCell>
                                <StyledTableCell className='tableHeadingCell' align="right"><img className='operatorAddingIcon' src={IconPlus} alt='Plus Icon' align="right" /></StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {addedOperators.map((operator, index) => (
                                <StyledTableRow key={index} className='bodyTableRow'>
                                    <StyledTableCell onClick={() => showNewOperatorData(operator.id, operator?.isMigrate)} scope="row" className='tableBodyCell'>
                                        {operator.residentGroupName}
                                    </StyledTableCell>
                                    <StyledTableCell onClick={() => showNewOperatorData(operator.id, operator?.isMigrate)} align="center" className='tableBodyCell'>
                                        {operator.status}
                                    </StyledTableCell>
                                    <StyledTableCell align="right" className='tableBodyCell'>
                                        <NavLink to={`/admin/operator/${operator.residentGroupName}`} className='tableBodyCellLink' >View</NavLink>
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
                                <StyledTableCell className='tableHeadingCell'>Operator</StyledTableCell>
                                <StyledTableCell className='tableHeadingCell' align="right">Submission Date</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {newSubmissionsData.map((operator, index) => (
                                <StyledTableRow
                                    onClick={() => showNewOperatorData(operator.id)}
                                    key={index}
                                    className='bodyTableRow'>
                                    <StyledTableCell scope="row" className='tableBodyCell'>
                                        {operator.residentGroupName}
                                    </StyledTableCell>
                                    <StyledTableCell align="right" className='tableBodyCell'>
                                        {operator.createdOn.slice(0, 10)}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> : null}
                {buttonStyleThree ? <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow className='headingTableRow'>
                                <StyledTableCell className='tableHeadingCell'>Operator</StyledTableCell>
                                <StyledTableCell className='tableHeadingCell' align="right">Submission Date</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rejectedOperators.map((operator, index) => (
                                <StyledTableRow
                                    onClick={() => showRejOperatorData(operator.id)}
                                    key={index}
                                    className='bodyTableRow'>
                                    <StyledTableCell scope="row" className='tableBodyCell'>
                                        {operator.residentGroupName}
                                    </StyledTableCell>
                                    <StyledTableCell align="right" className='tableBodyCell'>
                                        {operator.createdOn.slice(0, 10)}
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
