import React, { useState } from 'react'
import { Button, Paper } from '@material-ui/core'
import Navbar from '../../components/Navbar'
import './GrandAdmin.css'
import { useNavigate } from 'react-router-dom';
import addIcon from './../../images/addIcon/icons8-plus.svg'

const adminArray = [
  {
    id: 1,
    name: 'MrLaju Lee',
    status: 'Deactivated'
  },
  {
    id: 2,
    name: 'MrLaju Pee',
    status: 'Activated'
  },
  {
    id: 3,
    name: 'MrLaju Nee',
    status: 'Activated'
  },
  {
    id: 56,
    name: 'MrLaju See',
    status: 'Activated'
  },
  {
    id: 76,
    name: 'MrLaju Dee',
    status: 'Deactivated'
  },
  {
    id: 88,
    name: 'MrLaju Kee',
    status: 'Activated'
  }
]
const adminFinanceArray = [
  {
    id: 1,
    name: 'MrLaju Ree',
    status: 'Activated'
  },
  {
    id: 2,
    name: 'MrLaju Gee',
    status: 'Activated'
  },
  {
    id: 3,
    name: 'MrLaju Mee',
    status: 'Activated'
  },
  {
    id: 4,
    name: 'MrLaju Cee',
    status: 'Activated'
  },
  {
    id: 14,
    name: 'MrLaju Hee',
    status: 'Deactivated'
  },
  {
    id: 20,
    name: 'MrLaju Jee',
    status: 'Deactivated'
  },
  {
    id: 21,
    name: 'MrLaju Fee',
    status: 'Activated'
  },
  {
    id: 22,
    name: 'MrLaju Qee',
    status: 'Activated'
  },
  {
    id: 30,
    name: 'MrLaju Yee',
    status: 'Deactivated'
  },
]

export default function GrandAdmin() {
  const [isActive, setIsActive] = useState(true);

  const navigate = useNavigate();

  const navigateToAnyWhere = (path) => {
    navigate(`${path}`);
  };

  const paper = {
    padding: '1.25rem',
    height: '100vh'
  }
  const handleClick = () => {
    setIsActive(!isActive);
  };

  const showAdminData = (id) => {
    navigate(`admin/admin/${id}`);
  }
  const showFinanceAdminData = (id) => {
    navigate(`admin/finance-admin/${id}`);
  }
  return (
    <>
      <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>
        <Navbar title={'Grand Admin'} backButtonPath={'/'} />
        <div className='twoButtonWithGropWithThird'>
          <div className='twoButtonGroup'>
            <Button className={isActive ? 'doubleButtonInActive' : 'doubleButtonActiveGA'} onClick={handleClick}>Admin</Button>
            <Button className={isActive ? 'doubleButtonActiveGA' : 'doubleButtonInActive'} onClick={handleClick}>Finance</Button>
          </div>
          <div className='singleButtonRunner'>
            <Button className='runnerButton'>Country & Tax</Button>
          </div>
        </div>

        {isActive ?
          <div>

            <div className='displayFlexRow'>
              <h3 className='mrLajuFoodHeading'>MrLaju Food Admin</h3>
              <img src={addIcon} alt='add Icon' className='addIconImage' onClick={() => navigateToAnyWhere('/admin/grand-admin/create-admin')} />
            </div>

            {
              adminFinanceArray.map((ele, ind) => {
                return <div className='restourentContainer ' key={ind}>
                  <div className='restourentName' onClick={() => navigateToAnyWhere(`/admin/grand-admin/create-admin${ele.id}`)}>{ind + 1}. {ele.name}</div>
                  <Button className={ele.status == 'Activated' ? 'activeButton' : 'deactivatedButton'} variant="contained" onClick={() => ``} >{ele.status == 'Activated' ? 'Activated' : 'Deactivated'}</Button>
                </div>
              })
            }

          </div>
          : 
          <div>

            <div className='displayFlexRow'>
              <h3 className='mrLajuFoodHeading'>MrLaju Food Admin</h3>
              <img src={addIcon} alt='add Icon' className='addIconImage' onClick={() => navigateToAnyWhere('/admin/grand-admin/create-admin')} />
            </div>

            {
              adminArray.map((ele, ind) => {
                return <div className='restourentContainer ' key={ind}>
                  <div className='restourentName' onClick={() => navigateToAnyWhere(`/admin/grand-admin/create-admin${ele.id}`)} >{ind + 1}. {ele.name}</div>
                  <Button className={ele.status == 'Activated' ? 'activeButton' : 'deactivatedButton'} variant="contained" onClick={() => ``}  >{ele.status == 'Activated' ? 'Activated' : 'Deactivated'}</Button>
                </div>
              })
            }

          </div>}
      </Paper>
    </>
  )
}