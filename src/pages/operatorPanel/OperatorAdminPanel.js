import React from 'react'
import { Paper } from '@material-ui/core';
import Navbar from './../../components/Navbar';
import './OperatorAdminPanel.css'
import { NavLink } from 'react-router-dom';
import { authAxios } from '../../services/auth.service';
import { useEffect } from 'react';
import { useState } from 'react';


export default function OperatorAdminPanel() {

    const [condoList, setCondoList] = useState([])

    const paper = {
        padding: '1.25rem',
        minHeight: '100vh',
        backGroundColor: '#F5F5F5'
    }

    const getCondomaniums = async () => {
        const userId = localStorage.getItem("userId")
        console.log(userId)
        try {
            const { data: { data } } = await authAxios.get(`operator/list/operatorByUserId/${userId}`)
            setCondoList(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCondomaniums()
    }, [])


    const activeOpId = (Id) => {
        localStorage.removeItem("operatorId")
        localStorage.setItem("operatorId", Id)
    }


    return (
        <>
            <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>

                <Navbar title={'Operator Admin Panel'} backButtonPath={'/'} />

                <div className='condoList'>
                    {condoList.map((ele, ind) => {
                        return <NavLink
                            onClick={() => activeOpId(ele.id)}
                            className='condoSingle'
                            key={ind}
                            to={`/admin/operator/${ele.residentGroupName}`}>
                            {ele.residentGroupName}
                        </NavLink>
                    })}
                </div>

            </Paper>
        </>
    )
}
