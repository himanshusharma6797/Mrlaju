import React, {useState} from 'react'
import { Paper, Grid } from '@material-ui/core';
import logo from '../../images/logoSplash3.svg';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';


export default function SplashThree({setTime}) {

    const [disabled, setDisabled] = useState(true);

    const submitHandle = () => {
        // console.log('submitted');
        setTime(true)
    }

    const lableStyle = {
        backGroundColor: '#FFFFFF',
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo'} };

    const paper = {
        padding: '1.25rem',
        height: '100vh',
    }

    return (
        <>
            <Paper sx={{ flexGrow: 1 }} align='center' className='paperContainerSplashThree' elevation={10} style={paper}>
                <Grid className="GridContainerSplashThree">
                    <div></div>
                    <img className="svgLogoSplashThree" src={logo} alt="logo" />

                    <div className='checkboxContainerS3'>

                        <Checkbox {...label} style={lableStyle} name="agree" onClick={(e) => setDisabled(!disabled)}/>

                        <label className='checkboxLableSplashThree'>I agree to the <Link>Terms of use</Link> and <Link>Privacy</Link>
                            policy of mrlaju.com</label>
                    </div>

                    <Button disabled={disabled} onClick={submitHandle} className="submitButtonSplashThree" type="Submit" variant="contained" color="primary">Next</Button>
                </Grid>
            </Paper>
        </>
    )
}
