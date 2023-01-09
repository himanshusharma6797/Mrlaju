import React from 'react'
import IconButton from '@mui/material/IconButton';
import { useNavigate, useParams } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import { Paper, Button } from '@mui/material';
import './Location.css'
import { authAxios } from '../../services/auth.service';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Location() {

  const [merchentData, setMerchentData] = useState({})

  const { merchentId } = useParams()

  const getMerchentById = async () => {
    try {
      const { data: { data } } = await authAxios.get(`merchant/${merchentId}`)
      setMerchentData(data)
    } catch (error) {
      console.log("Error : " + error)
    }
  }

  const navigate = useNavigate();
  const navigateToAnyWhere = () => {
    navigate('/runner-registration');
  };
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  const paper = {
    padding: '1.25rem',
    height: '100vh'
  }
  const addressPaper = {
    padding: '1rem',
    height: '5rem'
  }

  useEffect(() => {
    getMerchentById()
  }, [])


  return (
    <>
      <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>
        <Toolbar className='appBar'>
          <ArrowBackIosSharpIcon className='backButtonArrow' onClick={() => navigateToAnyWhere('/runner-registration')} />
          <h2 className='headingOfPageContent'>Location</h2>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            sx={{ visibility: 'hidden' }}
          >
          </IconButton>
        </Toolbar>
        <div className='displayFlexJCSBetween'>
          <div>

            <Paper elevation={3} style={addressPaper}>
              <p className="loginLable">Address</p>
              <p className="loginLable">
                {merchentData?.businessName} , {merchentData?.businessAddress}
              </p>
            </Paper>
          </div>
          <Button className="viewOnMap" variant="contained" onClick={() => openInNewTab('https://www.google.com/maps')}>View On Map</Button>
        </div>
      </Paper>
    </>
  )
}
