import React from 'react'
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import './OurSupplier.css'
import OurSupplierHeader from './OurSupplierHeader';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';


export default function OurSupplier() {

    // const [restaurentName, setrestaurentName] = useState()

    const navigate = useNavigate()

    const paper = {
        padding: '1.25rem',
        height: '133vh',
        minHeight: '-webkit-fill-available'
    }

    const navigateRestaurentMenu = (id) => {
        navigate(`/restaurent-menu/${id}`)
    }

    const restaurentsData = [

        {
            name: "ABC Restu",
            thumbnail: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        },

        {
            name: "ABC Restu",
            thumbnail: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        },

        {
            name: "ABC Restu",
            thumbnail: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        },

        {
            name: "ABC Restu",
            thumbnail: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        },

        {
            name: "ABC Restu",
            thumbnail: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        },

        {
            name: "ABC Restu",
            thumbnail: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        },

        {
            name: "ABC Restu",
            thumbnail: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        },

        {
            name: "ABC Restu",
            thumbnail: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        },

        {
            name: "ABC Restu",
            thumbnail: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        },

        {
            name: "ABC Restu",
            thumbnail: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        },

        {
            name: "ABC Restu",
            thumbnail: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        },

        {
            name: "ABC Restu",
            thumbnail: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        },

    ]

    const styles = {
        height: 100,
        width: 110,
        borderRadius: 8
    }

    return (
        <>
            <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>

                <OurSupplierHeader title={"Our Supplier"} backButtonpath={"/"} />

                <div className='ourSupplierContainer'>

                    <Box
                        sx={{
                            borderRadius: "16px",
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '& > :not(style)': {
                                m: 1,
                                width: 105,
                                height: 100,
                                marginBottom: 5,
                            },
                        }}
                    >

                        {
                            restaurentsData.map((restaurent, index) => {
                                return <div key={index} onClick={() => navigateRestaurentMenu(restaurent.id)}>
                                    <Box
                                        sx={{
                                            boxShadow: 2,
                                            borderRadius: '16px',
                                            width: 110,
                                            height: 100,
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}>
                                        <img
                                            elevation={24}
                                            src={restaurent.thumbnail}
                                            alt={restaurent.thumbnail}
                                            style={styles} />

                                    </Box>
                                    <span className='restaurentName'>
                                        {restaurent.name}
                                    </span>
                                </div>
                            })
                        }

                    </Box>

                </div>
            </Paper >
        </>
    )
}
