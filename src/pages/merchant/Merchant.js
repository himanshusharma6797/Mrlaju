import React from 'react'
import Navbar from '../../components/Navbar'
import { Button, Paper } from '@material-ui/core';
import './Merchant.css'
import { useNavigate } from 'react-router-dom';

export default function Merchant() {

  const navigate = useNavigate();


  const paper = {
    padding: '1.25rem',
    height: '100vh'
  }

  const navigation = ()=>{
    navigate('/merchant/merchant-app')
  } 

  return (
    <>
      <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>

        <div>

          <Button className='setUpButtonOnNavigation' onClick={()=>navigation()}>Set Up</Button>

          <div>
            <Navbar title={'Order Management'} backButtonPath={'/'} />
            
          </div>

        </div>

      </Paper>
    </>
  )
}
