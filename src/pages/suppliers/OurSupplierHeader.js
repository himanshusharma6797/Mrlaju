import React from 'react'
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import { Button, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './OurSupplierHeader.css'


export default function OurSupplierHeader({ title, backButtonpath }) {

    const navigate = useNavigate()

    const backButtonPath = (path) => {
        navigate(path)
    }

    const navigateToPropose = () => {
        // navigate('/')
    }

    return (
        <>
            <Toolbar className='appBar'>

                <ArrowBackIosSharpIcon className='backButtonArrow' onClick={() => backButtonPath(backButtonpath)} />

                <h2 className='headingOfPageContentSupplier'>{title}</h2>

                <div
                    size="small"
                    edge="start"
                    color="inherit"
                >

                    <Button
                        onClick={navigateToPropose}
                        sx={{
                            borderRadius: 2
                        }}
                        className="proposeButton"
                        label="Propose"
                        type="Submit"
                        variant="contained">
                        <span className="buttonText">Propose</span>
                    </Button>
                </div>

            </Toolbar>
        </>
    )
}
