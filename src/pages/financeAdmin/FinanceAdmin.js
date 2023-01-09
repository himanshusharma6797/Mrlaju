import React from 'react'
import Navbar from '../../components/Navbar'
import { Paper } from '@material-ui/core';

export default function FinanceAdmin() {
    const paper = {
        padding: '1.25rem',
        height: '100vh'
    }
  return (
    <>
    <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>
    <Navbar title={'Finance Admin'} backButtonPath={'/'} />
    </Paper>
    </>
  )
}
