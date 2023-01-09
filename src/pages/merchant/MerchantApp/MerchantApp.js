import React, { useState } from 'react'
import { Button, Paper } from '@material-ui/core'
import Navbar from '../../../components/Navbar'
import './MerchantApp.css'
import { NavLink, useNavigate } from 'react-router-dom';

export default function MerchantApp() {
    const [isActive, setIsActive] = useState(true);

    const navigate = useNavigate();

    const navigateToAnyWhere = (path) => {
        navigate(`${path}`);
    };
    // let { condo } = useParams();

    const paper = {
        padding: '1.25rem',
        minHeight: '100vh'
    }
    const handleClick = event => {
        setIsActive(current => !current);
    };
    return (
        <>
            <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>
                <Navbar title={'Merchant App'} backButtonPath={'/merchant'} />
                <div className='twoButtonWithGropWithThird'>
                    <div className='twoButtonGroup'>
                        <Button className={isActive ? 'doubleButtonInActive' : 'doubleButtonActiveOnline'} onClick={handleClick}>Online</Button>
                        <Button className={isActive ? 'doubleButtonActive' : 'doubleButtonInActive'} onClick={handleClick}>Offline</Button>
                    </div>
                    <div className='singleButtonRunner'>
                        <Button className='runnerButton' onClick={() => navigateToAnyWhere('/merchant-runner')}>Runner</Button>
                    </div>
                </div>

                <h3 className='customerBaseHeading'>Customer Base</h3>


                <NavLink className='restourentContainer restourentName restourentNameHover' to={`/merchant/merchant-app/ABC Condo`}>{`1. ABC Condo`}</NavLink>
                <div className='restourentContainer'>
                    <NavLink className='restourentName restourentNameHover' style={{width:'70%'}} to={`/merchant/merchant-app/DDD Condo`}>{`2. DDD Condo`} </NavLink>
                    <Button className="locationButton" variant="contained" onClick={() => navigateToAnyWhere('/merchant/duplicate')} >Duplicate</Button>
                </div>
            </Paper>
        </>
    )
}
