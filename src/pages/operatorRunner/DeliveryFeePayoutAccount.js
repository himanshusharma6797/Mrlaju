import React from 'react'
import Navbar from '../../components/Navbar'
import { Paper } from '@material-ui/core';

export default function DeliveryFeePayoutAccount() {
    const paper = {
        padding: '1.25rem',
        height: '100vh'
    }
    return (
        <>
            <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>
                <Navbar title={'Delivery Fee Payout Account'} backButtonPath={'/admin/operator/:condo/Runner'} />


                <label className="loginLable">Bank Name</label>

                <div className="loginInputs dataFromDb">
                    {`File Name`}
                </div>

                <label className="loginLable">Account Name</label>

                <div className="loginInputs dataFromDb">
                    {``}
                </div>

                <label className="loginLable">Account Number</label>

                <div className="loginInputs dataFromDb">
                    {``}
                </div>
            </Paper>
        </>
    )
}
