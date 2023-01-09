import React from 'react'
import { Paper } from '@material-ui/core'
import Navbar from '../../../components/Navbar'
import './../MerchantApp/MerchantApp.css'
// import { useNavigate } from 'react-router-dom';

export default function DuplicateGroup() {
    // const [isActive, setIsActive] = useState(true);

    // const navigate = useNavigate();

    // const navigateToAnyWhere = (path) => {
    //     navigate(`${path}`);
    // };

    const paper = {
        padding: '1.25rem',
        minHeight: '100vh'
    }
    // const handleClick = event => {
    //     setIsActive(current => !current);
    // };

  return (
    <>
    <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>
        <Navbar title={'Duplicate Group'} backButtonPath={'/merchant/merchant-app'} />
        <h3 className='groupSelectionHeading'>Group Selection</h3>
        <select
                            id='residentGroupType'
                            defaultValue={'10'}
                            // value={7}
                            name={'residentGroupType'}
                            // onChange={}
                            // inputProps={{ 'aria-label': 'Without label' }}
                            className="slectedInputs selectInputMerchantApp"
                        >
                            <option>Select</option>
                            <option value={7}>Ten</option>
                            <option value={7}>Twenty</option>
                            <option value={7}>Thirty</option>
                        </select>
    </Paper>
</>
  )
}
