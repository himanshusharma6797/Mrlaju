import React, { useState } from 'react'
import { Box, Button, Paper } from '@material-ui/core'
import './../grandAdmin/GrandAdmin.css'
import { useNavigate, useParams } from 'react-router-dom';
import addIcon from './../../images/addIcon/icons8-plus.svg'
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import Toolbar from '@mui/material/Toolbar';

const adminArray = [
    {
        id: 1,
        name: 'ABC Restaurent',
    },
    {
        id: 2,
        name: 'SSS Restaurent',
    },
    {
        id: 3,
        name: 'XYZ Restaurent',
    }
]


export default function FoodMerchantList() {
    const { condo } = useParams();
    const navigate = useNavigate();

    const navigateToAnyWhere = (path) => {
        navigate(`${path}`);
    };

    const paper = {
        padding: '1.25rem',
        height: '100vh'
    }
    const textStyle = {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: '21px',
        color: '#767676',
    }

    return (
        <>
            <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>
                <Toolbar className='appBar'>
                    <ArrowBackIosSharpIcon className='backButtonArrow' onClick={() => navigateToAnyWhere(`/admin/operator/${condo}`)} />
                    <h2 className='headingOfPageContent'>Food Merchant List</h2>
                    <Box
                    onClick={() => navigateToAnyWhere(`/admin/operator/${condo}/shop-and-food/add-new-merchant`)}
                    sx={{
                        cursor:'pointer'
                    }}
                    >
                        <img src={addIcon} alt='add Icon' className='addIconImage' onClick={() => 'navigateToAnyWhere(`/admin/grand-admin/create-admin`)'} />
                    </Box>
                </Toolbar>

                <Box>
                    {
                        adminArray.map((ele, ind) => {
                            return <Box className='restourentContainer ' key={ind}>
                                <Box className='restourentName' style={textStyle} onClick={() => 'navigateToAnyWhere(`/admin/grand-admin/create-admin${ele.id}`)'} >{ele.name}</Box>
                                <Button className='activeButton' variant="contained" onClick={() => ``}  >Location</Button>
                            </Box>
                        })
                    }

                </Box>
            </Paper>
        </>
    )
}
